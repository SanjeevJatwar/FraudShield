"""
FraudShield Backend - AI Model API
----------------------------------
Description: Flask-based API for handling fraud prediction requests using a pre-trained XGBoost model.
Author: FraudShield Team
File: src/app.py
"""

from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Vite default; adjust if needed

try:
    model = joblib.load('xgb_fraud_model1.pkl')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Model load error: {e}")
    model = None

@app.route('/api/predict', methods=['POST'])
def predict_fraud():
    if not model:
        return jsonify({'error': 'Model not loaded', 'success': False}), 500

    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided', 'success': False}), 400

        # Required features (exact match to your notebook)
        required_features = [
            'amount', 'oldbalanceOrg', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest',
            'type_encoded', 'time_period_encoded', 'origin_balance_change', 'dest_balance_change', 'isFlaggedFraud'
        ]
        missing = [f for f in required_features if f not in data]
        if missing:
            return jsonify({'error': f'Missing features: {missing}', 'success': False}), 400

        def to_list(val):
            return val if isinstance(val, list) else [val]

        # Build DF with only required features (ignore extras like failedLoginAttempts)
        features_df = pd.DataFrame({
            'amount': to_list(data['amount']),
            'oldbalanceOrg': to_list(data['oldbalanceOrg']),
            'newbalanceOrig': to_list(data['newbalanceOrig']),
            'oldbalanceDest': to_list(data['oldbalanceDest']),
            'newbalanceDest': to_list(data['newbalanceDest']),
            'type_encoded': to_list(data['type_encoded']),
            'time_period_encoded': to_list(data['time_period_encoded']),
            'origin_balance_change': to_list(data['origin_balance_change']),
            'dest_balance_change': to_list(data['dest_balance_change']),
            'isFlaggedFraud': to_list(data['isFlaggedFraud'])
        })

        # Predict
        prediction = model.predict(features_df)[0]
        probability = model.predict_proba(features_df)[0][1] if len(model.classes_) == 2 else float(prediction)

        return jsonify({
            'label': 'Fraud' if prediction == 1 else 'Not Fraud',
            'probability': float(probability),
            'success': True
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'error': str(e), 'success': False}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')  # Allow external access for testing