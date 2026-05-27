/**
 * Demo Page Component
 * -------------------
 * Description: Interactive dashboard where users can simulate transactions and view AI-powered fraud risk assessments.
 * File: src/pages/Demo.tsx
 */

import { useState, useEffect } from 'react';
import { Code, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Clock, DollarSign, UserX, Activity, Zap, Shield, Target } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import RiskGauge from '../components/charts/RiskGauge';
import TrendChart from '../components/charts/TrendChart';
import { predictFraud, buildFeatures, PredictionResult } from '../utils/predictionLogic';

export default function Demo() {
  const [amount, setAmount] = useState<string>('250000');
  const [failedLogins, setFailedLogins] = useState<string>('2');
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString());
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [showPayload, setShowPayload] = useState(false);
  const [lastPrediction, setLastPrediction] = useState<PredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePredict = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const timestamp = new Date();
    try {
      const result = await predictFraud({ amount: parseFloat(amount), failedLoginAttempts: parseInt(failedLogins), timestamp });
      console.log('Prediction result:', result); // Debug
      setLastPrediction(result);
      setPredictions((prev) => [...prev.slice(-11), result]);
    } catch (error) {
      console.error('Prediction failed:', error); // Will log API issues
      // Optionally: alert('Using simulation due to API error');
    }
    setIsProcessing(false);
  };

  const features = buildFeatures({
    amount: parseFloat(amount) || 0,
    failedLoginAttempts: parseInt(failedLogins) || 0,
    timestamp: new Date()
  });

  const examplePayload = JSON.stringify(features, null, 2);

  const trendData = predictions.map((p) => ({
    timestamp: p.timestamp,
    probability: p.probability
  }));

  const getRiskLevel = (probability: number) => {
    if (probability >= 0.8) return { level: 'Critical', color: 'text-red-400', bg: 'bg-red-400/10' };
    if (probability >= 0.6) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-400/10' };
    if (probability >= 0.4) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
    if (probability >= 0.2) return { level: 'Low', color: 'text-blue-400', bg: 'bg-blue-400/10' };
    return { level: 'Very Low', color: 'text-green-400', bg: 'bg-green-400/10' };
  };

  const getRecommendation = (probability: number) => {
    if (probability > 0.8) return {
      action: 'BLOCK TRANSACTION',
      description: 'High fraud risk detected. Block transaction immediately and flag account for review.',
      icon: AlertTriangle,
      color: 'text-red-400'
    };
    if (probability > 0.6) return {
      action: 'REQUIRE AUTHENTICATION',
      description: 'Elevated risk detected. Require additional authentication before processing.',
      icon: Shield,
      color: 'text-orange-400'
    };
    if (probability > 0.4) return {
      action: 'MONITOR CLOSELY',
      description: 'Moderate risk detected. Allow transaction but monitor account activity.',
      icon: Target,
      color: 'text-yellow-400'
    };
    return {
      action: 'ALLOW TRANSACTION',
      description: 'Low fraud risk. Transaction can proceed normally.',
      icon: CheckCircle,
      color: 'text-green-400'
    };
  };

  const quickTestCases = [
    { amount: '50000', failedLogins: '0', label: 'Normal Transaction' },
    { amount: '500000', failedLogins: '3', label: 'Suspicious Activity' },
    { amount: '1000000', failedLogins: '5', label: 'High Risk' },
    { amount: '25000', failedLogins: '1', label: 'Low Risk' },
    { amount: '0', failedLogins: '10', label: 'Edge: Zero Amount + High Fails' }, // Test validation
    { amount: '150000', failedLogins: '0', label: 'Medium Amount, No Fails' }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-security-500/20 border border-primary-500/30 backdrop-blur-sm mb-6">
            <Activity className="w-4 h-4 text-primary-400 mr-2" />
            <span className="text-sm font-medium text-primary-300">Real-Time Fraud Detection Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Interactive <span className="text-gradient-cyber">Fraud Detection</span> Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience our AI-powered fraud detection system. Input transaction details and see how our
            machine learning model analyzes patterns to identify fraudulent behavior in real-time.
          </p>
        </div>

        {/* Quick Test Cases */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Test Cases</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {quickTestCases.map((testCase, index) => (
              <button
                key={index}
                onClick={() => {
                  setAmount(testCase.amount);
                  setFailedLogins(testCase.failedLogins);
                }}
                className="px-4 py-2 bg-dark-800/50 hover:bg-dark-700/50 border border-white/10 hover:border-primary-400/30 rounded-lg text-sm transition-all group"
              >
                <span className="text-gray-300 group-hover:text-white">{testCase.label}</span>
                <div className="text-xs text-gray-500 mt-1">₹{parseInt(testCase.amount).toLocaleString()}, {testCase.failedLogins} failed logins</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Controls */}
          <div className="space-y-6">
            {/* Transaction Inputs */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-security-500"></div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-primary-500/20">
                  <DollarSign className="w-5 h-5 text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold">Transaction Details</h2>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    type="number"
                    label="Amount to Transfer (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="250000"
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-9 text-gray-400 text-sm">INR</div>
                </div>

                <div className="relative">
                  <Input
                    type="number"
                    label="Failed Login Attempts (Last 24h)"
                    value={failedLogins}
                    onChange={(e) => setFailedLogins(e.target.value)}
                    placeholder="2"
                  />
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400">
                    <UserX className="w-3 h-3" />
                    <span>Number of unsuccessful login attempts</span>
                  </div>
                </div>

                <div className="relative">
                  <Input
                    label="Transaction Timestamp"
                    value={currentTime}
                    readOnly
                    className="bg-dark-800/30 cursor-not-allowed"
                  />
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>Automatically captured system time</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={handlePredict}
                  disabled={isProcessing}
                  className="group relative overflow-hidden"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing Transaction...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Analyze Fraud Risk</span>
                    </div>
                  )}
                </Button>
              </div>
            </Card>

            {/* Prediction Result */}
            {lastPrediction && (
              <Card glow={lastPrediction.label === 'Fraud' ? 'magenta' : 'blue'} className="animate-slide-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${lastPrediction.label === 'Fraud' ? 'bg-fraud-500/20' : 'bg-security-500/20'}`}>
                    {lastPrediction.label === 'Fraud' ?
                      <AlertTriangle className="w-5 h-5 text-fraud-400" /> :
                      <CheckCircle className="w-5 h-5 text-security-400" />
                    }
                  </div>
                  <h2 className="text-2xl font-bold">Analysis Results</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="fraud-card p-4">
                      <div className="text-sm text-gray-400 mb-1">Prediction</div>
                      <div className={`text-xl font-bold ${lastPrediction.label === 'Fraud' ? 'text-fraud-400' : 'text-security-400'
                        }`}>
                        {lastPrediction.label}
                      </div>
                    </div>
                    <div className="fraud-card p-4">
                      <div className="text-sm text-gray-400 mb-1">Confidence</div>
                      <div className="text-xl font-bold text-gradient">
                        {(lastPrediction.probability * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="fraud-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Risk Level</span>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskLevel(lastPrediction.probability).bg} ${getRiskLevel(lastPrediction.probability).color}`}>
                        {getRiskLevel(lastPrediction.probability).level}
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="fraud-card p-4 border-l-4 border-l-primary-400">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getRecommendation(lastPrediction.probability).color.replace('text-', 'bg-').replace('400', '400/20')}`}>
                        {(() => {
                          const IconComponent = getRecommendation(lastPrediction.probability).icon;
                          return <IconComponent className={`w-4 h-4 ${getRecommendation(lastPrediction.probability).color}`} />;
                        })()}
                      </div>
                      <div>
                        <div className={`font-semibold ${getRecommendation(lastPrediction.probability).color}`}>
                          {getRecommendation(lastPrediction.probability).action}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {getRecommendation(lastPrediction.probability).description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* API Payload */}
            <Card>
              <button
                onClick={() => setShowPayload(!showPayload)}
                className="w-full flex items-center justify-between hover:text-primary-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Code className="text-primary-400" />
                  <span className="font-semibold">Model Features & API Payload</span>
                </div>
                {showPayload ? <ChevronUp /> : <ChevronDown />}
              </button>

              {showPayload && (
                <div className="mt-6 space-y-4">
                  <div className="fraud-card">
                    <div className="text-sm font-semibold text-primary-400 mb-3">Processed Features</div>
                    <pre className="p-4 bg-dark-900/50 rounded-lg overflow-x-auto text-xs border border-white/5">
                      <code className="text-gray-300">{examplePayload}</code>
                    </pre>
                  </div>
                  <div className="text-xs text-gray-400 p-3 bg-dark-800/30 rounded-lg">
                    <div className="font-semibold mb-1 flex items-center">
                      <span className="mr-2">🤖</span> Model Integration Status:
                    </div>
                    <div>Currently using simulation based on your notebook patterns</div>
                    <div className="mt-2 text-primary-300">
                      📋 See <code className="text-primary-400">MODEL_INTEGRATION_GUIDE.md</code> to connect your trained model
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Visualizations */}
          <div className="space-y-6">
            {/* Risk Gauge */}
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-fraud-500/20">
                  <Target className="w-5 h-5 text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold">Risk Assessment</h2>
              </div>
              <RiskGauge value={(lastPrediction?.probability || 0) * 100} />
              {lastPrediction && (
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-400">Risk Score</div>
                  <div className="text-2xl font-bold text-gradient">
                    {Math.round((lastPrediction.probability || 0) * 100)}/100
                  </div>
                </div>
              )}
            </Card>

            {/* Trend Chart */}
            {predictions.length > 1 && (
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-security-500/20 to-primary-500/20">
                    <Activity className="w-5 h-5 text-security-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Risk Trend Analysis</h2>
                </div>
                <TrendChart data={trendData} />
              </Card>
            )}

            {/* Recent Predictions Table */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Transaction History</h2>
                <div className="text-sm text-gray-400">{predictions.length} predictions</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-2 text-gray-400 font-semibold">Time</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-semibold">Amount</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-semibold">Failed</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-semibold">Risk %</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.slice(-8).reverse().map((pred, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/5 hover:bg-dark-800/30 transition-colors"
                      >
                        <td className="py-3 px-2 text-gray-300">
                          {pred.timestamp
                            ? new Date(pred.timestamp).toLocaleTimeString()
                            : '—'}
                        </td>

                        <td className="py-3 px-2 text-right text-gray-300 font-mono">
                          ₹{pred.amount !== undefined ? pred.amount.toLocaleString() : '—'}
                        </td>

                        <td className="py-3 px-2 text-right text-gray-300">
                          {pred.failedLogins ?? '—'}
                        </td>

                        <td className="py-3 px-2 text-right font-semibold">
                          <span
                            className={`${pred.probability > 0.6
                              ? 'text-fraud-400'
                              : pred.probability > 0.3
                                ? 'text-warning-orange'
                                : 'text-security-400'
                              }`}
                          >
                            {pred.probability !== undefined
                              ? (pred.probability * 100).toFixed(1) + '%'
                              : '—'}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${pred.label === 'Fraud'
                              ? 'bg-fraud-400/20 text-fraud-400 border border-fraud-400/30'
                              : 'bg-security-400/20 text-security-400 border border-security-400/30'
                              }`}
                          >
                            {pred.label ?? '—'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
                {predictions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">No predictions yet</div>
                    <div className="text-sm text-gray-500">Try analyzing a transaction above to see results</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
