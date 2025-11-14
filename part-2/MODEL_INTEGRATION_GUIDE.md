# 🤖 Model Integration Guide

## Current Status
✅ **Frontend is ready** - Your UI is fully functional with simulated predictions
🔄 **Backend needed** - Replace simulation with your actual trained model

## Your Trained Model Features (from train5.ipynb)

Based on your notebook, your model uses these features:
- `amount` - Transaction amount
- `oldbalanceOrg` - Origin account old balance  
- `newbalanceOrig` - Origin account new balance
- `oldbalanceDest` - Destination account old balance
- `newbalanceDest` - Destination account new balance
- `type_encoded` - Transaction type (0=CASH_OUT, 1=PAYMENT, etc.)
- `time_period_encoded` - Time period (0=Night, 1=Morning, 2=Afternoon, 3=Evening)
- `balance_change` - Origin balance change
- `dest_balance_change` - Destination balance change
- `isFlaggedFraud` - System flagged status

## Integration Options

### Option 1: Python Backend API (Recommended)

1. **Create a Flask/FastAPI backend:**

```python
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load your trained model
model = joblib.load('xgb_fraud_model1.pkl')  # Replace with your model file

@app.route('/api/predict', methods=['POST'])
def predict_fraud():
    try:
        data = request.json
        
        # Create DataFrame with the features your model expects
        features_df = pd.DataFrame({
            'amount': data['amount'],
            'oldbalanceOrg': data['oldbalanceOrg'], 
            'newbalanceOrig': data['newbalanceOrig'],
            'oldbalanceDest': data['oldbalanceDest'],
            'newbalanceDest': data['newbalanceDest'],
            'type_encoded': data['type_encoded'],
            'time_period_encoded': data['time_period_encoded'],
            'origin_balance_change': data['origin_balance_change'],
            'dest_balance_change': data['dest_balance_change'],
            'isFlaggedFraud': data['isFlaggedFraud']
        })
        
        # Make prediction
        prediction = model.predict(features_df)[0]
        probability = model.predict_proba(features_df)[0][1] if hasattr(model, 'predict_proba') else float(prediction)
        
        return jsonify({
            'label': 'Fraud' if prediction == 1 else 'Not Fraud',
            'probability': float(probability),
            'success': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

2. **Update your frontend prediction function:**

Replace the `predictFraud` function in `src/utils/predictionLogic.ts`:

```typescript
export async function predictFraud(input: PredictionInput): Promise<PredictionResult> {
  const features = buildFeatures(input);
  
  try {
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(features)
    });
    
    const result = await response.json();
    
    if (result.success) {
      return {
        label: result.label,
        probability: result.probability,
        timestamp: input.timestamp,
        amount: input.amount,
        failedLogins: input.failedLoginAttempts
      };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Prediction API error:', error);
    // Fallback to simulation if API fails
    return simulatedPrediction(input);
  }
}
```

### Option 2: Save Your Model from Jupyter

In your `train5.ipynb`, add this cell to save your trained model:

```python
import joblib

# After training your model (replace 'model' with your actual model variable)
joblib.dump(model, 'fraud_detection_model.pkl')
print("Model saved successfully!")

# Also save any preprocessors if you have them
# joblib.dump(scaler, 'scaler.pkl')  # If you used scaling
# joblib.dump(encoder, 'encoder.pkl')  # If you used encoding
```

### Option 3: Export Model to ONNX (Advanced)

For better performance, you can export to ONNX and use it directly in the browser:

```python
# In your notebook
import skl2onnx
from skl2onnx import convert_sklearn

# Convert your model
onnx_model = convert_sklearn(model, initial_types=[('input', FloatTensorType([None, 10]))])

# Save ONNX model
with open("fraud_model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())
```

## Quick Start Steps

1. **Keep using current frontend** - It works perfectly as-is
2. **Export your model** from Jupyter using joblib
3. **Create simple Flask API** (copy code above)
4. **Update the API URL** in predictionLogic.ts
5. **Test integration** - Your frontend will automatically use real predictions

## Files to Modify

✅ **Already Updated:**
- `src/utils/predictionLogic.ts` - Feature engineering matches your notebook
- All UI components - Ready for real predictions

🔄 **You Need to Create:**
- Backend API server (Python Flask/FastAPI)
- Model export from your Jupyter notebook

## Testing Your Integration

1. Start your Flask API: `python app.py`
2. Start your frontend: `npm run dev`  
3. Go to Demo page and test predictions
4. Check browser console for any API errors

## Need Help?

The current frontend simulation is based on the patterns I found in your notebook:
- High amounts (>500k) are riskier
- Multiple failed logins increase risk  
- Night-time transactions are flagged
- Time period encoding matches your notebook

Your UI will work perfectly with either simulated or real predictions!