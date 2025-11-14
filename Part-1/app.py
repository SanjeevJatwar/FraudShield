from flask import Flask, render_template, request, redirect, url_for
import joblib
import pandas as pd
from datetime import datetime
import random
import string

app = Flask(__name__)

try:
    import xgboost as xgb
    model = joblib.load('xgb_fraud_model.pkl')
except Exception as e:
    print(f"Warning: Could not load model - {e}. Ensure model file exists and is compatible.")
    model = None  # Fallback to avoid crashes

time_mapping = {'Night': 0, 'Morning': 1, 'Afternoon': 2, 'Evening': 3}
type_mapping = {"CASH_OUT": 0, "PAYMENT": 1, "CASH_IN": 2, "TRANSFER": 3, "DEBIT": 4}

def get_time_period_encoded():
    hour = datetime.now().hour
    if 0 <= hour < 6:
        return time_mapping['Night']
    elif 6 <= hour < 12:
        return time_mapping['Morning']
    elif 12 <= hour < 18:
        return time_mapping['Afternoon']
    else:
        return time_mapping['Evening']

def random_user_id():
    return "U" + ''.join(random.choices(string.digits, k=8))

@app.route('/')
def home():
    uid = random_user_id()
    default_balance = random.randint(50_000, 1_000_000)
    return render_template('index.html', user_id=uid, default_balance=default_balance)

@app.route('/predict', methods=['POST'])
def predict():
    error_msg = None
    result = {}
    try:
        if model is None:
            raise ValueError("Model not loaded. Please check xgb_fraud_model.pkl file.")

        user_id = request.form.get('user_id') or random_user_id()
        amount = float(request.form['amount'])
        failed_txn = int(request.form.get('failed_transactions', 0))
        txn_type = request.form['type']
        
        # Safely handle old_balance (hidden, but validate)
        old_bal_str = request.form.get('old_balance')
        if old_bal_str and old_bal_str.strip():
            oldbalanceOrg = float(old_bal_str)
        else:
            oldbalanceOrg = random.randint(50_000, 1_000_000)
        
        # Safely handle dest_old_balance (optional, blank -> default)
        dest_old_str = request.form.get('dest_old_balance')
        if dest_old_str and dest_old_str.strip():
            oldbalanceDest = float(dest_old_str)
        else:
            oldbalanceDest = random.randint(0, 50_000)

        newbalanceOrig = max(oldbalanceOrg - amount, 0)
        newbalanceDest = oldbalanceDest + amount

        origin_balance_change = oldbalanceOrg - newbalanceOrig
        dest_balance_change = newbalanceDest - oldbalanceDest
        time_period_encoded = get_time_period_encoded()
        type_encoded = type_mapping.get(txn_type, 3)

        custom_df = pd.DataFrame({
            'amount': [amount],
            'oldbalanceOrg': [oldbalanceOrg],
            'newbalanceOrig': [newbalanceOrig],
            'oldbalanceDest': [oldbalanceDest],
            'newbalanceDest': [newbalanceDest],
            'isFlaggedFraud': [0],
            'type_encoded': [type_encoded],
            'origin_balance_change': [origin_balance_change],
            'dest_balance_change': [dest_balance_change],
            'time_period_encoded': [time_period_encoded]
        })

        prediction = int(model.predict(custom_df)[0])
        probability = float(model.predict_proba(custom_df)[:, 1][0])

        # Enhanced: Format amounts with commas for better readability in template
        def format_currency(value):
            return "{:,.2f}".format(value).replace(',00', '')

        result = {
            "user_id": user_id,
            "fraud_label": "⚠️ Fraud Detected" if prediction == 1 else "✅ Transaction Approved",
            "fraud_score_pct": round(probability * 100, 2),
            "amount": amount,
            "formatted_amount": format_currency(amount),
            "txn_type": txn_type,
            "failed_txn": failed_txn,
            "time_period": {v: k for k, v in time_mapping.items()}[time_period_encoded],
            "oldbalanceOrg": oldbalanceOrg,
            "formatted_oldbalanceOrg": format_currency(oldbalanceOrg),
            "newbalanceOrig": newbalanceOrig,
            "formatted_newbalanceOrig": format_currency(newbalanceOrig),
            "oldbalanceDest": oldbalanceDest,
            "formatted_oldbalanceDest": format_currency(oldbalanceDest),
            "newbalanceDest": newbalanceDest,
            "formatted_newbalanceDest": format_currency(newbalanceDest),
            "origin_balance_change": origin_balance_change,
            "dest_balance_change": dest_balance_change,
            "prediction": prediction,
            "error": None 
        }

    except Exception as e:
        error_msg = str(e)
        result = {
            "fraud_label": "❌ Prediction Error",
            "error": error_msg,
            "user_id": random_user_id()  # Fallback
        }

    return render_template('result.html', result=result)


@app.route('/confirm', methods=['POST'])
def confirm_transaction():
    """Handles user confirmation for fraudulent transaction."""
    decision = request.form.get("decision")
    user_id = request.form.get("user_id")

    if decision == "cancel":
        return render_template("confirm.html", status="cancelled", user_id=user_id)
    elif decision == "proceed":
        # Enhanced: Log or simulate transaction completion (placeholder for real integration)
        print(f"Transaction proceeded for user {user_id} despite fraud alert.")
        return render_template("confirm.html", status="completed", user_id=user_id)
    else:
        return redirect(url_for("home"))


if __name__ == '__main__':
    app.run(debug=True)