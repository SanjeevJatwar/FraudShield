/**
 * FraudShield Prediction Logic & Feature Engineering
 * --------------------------------------------------
 * Description: Contains logic for preparing transaction features and handling API calls to the ML backend.
 * Author: FraudShield Team
 * File: src/utils/predictionLogic.ts
 */

export interface PredictionInput {
  amount: number;
  failedLoginAttempts: number;
  timestamp: Date;
}

export interface PredictionFeatures {
  amount: number[];
  oldbalanceOrg: number[];
  newbalanceOrig: number[];
  oldbalanceDest: number[];
  newbalanceDest: number[];
  isFlaggedFraud: number[];
  type_encoded: number[];
  origin_balance_change: number[];
  dest_balance_change: number[];
  time_period_encoded: number[];
}

export interface PredictionResult {
  label: 'Fraud' | 'Not Fraud';
  probability: number;
  timestamp: Date;
  amount: number;
  failedLogins: number;
}

export function buildFeatures(input: PredictionInput): PredictionFeatures {
  const { amount, failedLoginAttempts, timestamp } = input;

  // Input validation
  if (amount < 0 || failedLoginAttempts < 0) {
    throw new Error('Invalid input: Amount and failed logins must be non-negative');
  }

  // PaySim-like balances: More conservative simulation
  const assumedOldBalanceOrg = Math.max(0, amount * (0.5 + Math.random() * 3)); // 0.5x to 3.5x amount
  const newBalanceOrig = Math.max(0, assumedOldBalanceOrg - amount);
  const oldbalanceDest = Math.max(0, amount * (0.05 + Math.random() * 0.2)); // Small dest balances
  const newbalanceDest = oldbalanceDest + amount;

  // Time encoding (unchanged, matches notebook)
  const timeHour = timestamp.getHours();
  let time_period_encoded = 0;
  if (timeHour >= 5 && timeHour < 12) time_period_encoded = 1;
  else if (timeHour >= 12 && timeHour < 17) time_period_encoded = 2;
  else if (timeHour >= 17 && timeHour < 21) time_period_encoded = 3;

  // Fix: isFlaggedFraud based on PaySim (large CASH_OUT)
  const type_encoded = 0; // Still default CASH_OUT
  const isFlaggedFraud = (type_encoded === 0 && amount >= 200000) ? 1 : 0;

  const origin_balance_change = assumedOldBalanceOrg - newBalanceOrig; // Should ≈ amount
  const dest_balance_change = newbalanceDest - oldbalanceDest; // Should = amount

  return {
    amount: [amount],
    oldbalanceOrg: [assumedOldBalanceOrg],
    newbalanceOrig: [newBalanceOrig],
    oldbalanceDest: [oldbalanceDest],
    newbalanceDest: [newbalanceDest],
    isFlaggedFraud: [isFlaggedFraud],
    type_encoded: [type_encoded],
    origin_balance_change: [origin_balance_change],
    dest_balance_change: [dest_balance_change],
    time_period_encoded: [time_period_encoded],
    // Bonus: Add failed logins as extra (for simulation; retrain model to use it)
    failedLoginAttempts: [failedLoginAttempts]
  };
}

// 🎯 SIMULATION FUNCTION - Replace with your actual model
function simulatedPrediction(input: PredictionInput): PredictionResult {
  const features = buildFeatures(input); // Reuse fixed features
  let riskScore = 0;

  // Align with PaySim/model: Amount is key driver
  if (input.amount >= 200000) riskScore += 40; // Flagged threshold
  else if (input.amount >= 100000) riskScore += 25;
  else if (input.amount >= 50000) riskScore += 15;

  // Failed logins (new behavioral signal)
  if (input.failedLoginAttempts >= 5) riskScore += 35;
  else if (input.failedLoginAttempts >= 3) riskScore += 25;
  else if (input.failedLoginAttempts >= 1) riskScore += 15;

  // Time (matches notebook)
  const hour = input.timestamp.getHours();
  if (hour < 6 || hour > 22) riskScore += 20; // Night risk

  // Balance anomaly (if change != amount, suspicious)
  if (Math.abs(features.origin_balance_change[0] - input.amount) > 1) riskScore += 10;

  // No randomness; cap at 100
  const probability = Math.min(riskScore / 100, 1);
  const label: 'Fraud' | 'Not Fraud' = probability > 0.5 ? 'Fraud' : 'Not Fraud';

  return { label, probability, timestamp: input.timestamp, amount: input.amount, failedLogins: input.failedLoginAttempts };
}

// 🚀 MAIN PREDICTION FUNCTION - Ready for your model integration
// export function predictFraud(input: PredictionInput): PredictionResult {
//   // 🔄 TODO: Replace this with actual API call to your trained model
//   // For now, using simulation based on your notebook patterns
//   return simulatedPrediction(input);

//   /* 🚀 UNCOMMENT THIS WHEN YOU HAVE YOUR BACKEND READY:

//   const features = buildFeatures(input);

//   try {
//     const response = await fetch('/api/predict', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(features)
//     });

//     if (!response.ok) throw new Error('API request failed');

//     const result = await response.json();

//     return {
//       label: result.prediction === 1 ? 'Fraud' : 'Not Fraud',
//       probability: result.probability,
//       timestamp: input.timestamp,
//       amount: input.amount,
//       failedLogins: input.failedLoginAttempts
//     };
//   } catch (error) {
//     console.error('Model API error:', error);
//     // Fallback to simulation
//     return simulatedPrediction(input);
//   }
//   */
// }

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
        return simulatedPrediction(input);
    }
}
