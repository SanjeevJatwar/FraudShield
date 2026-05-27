import { 
  Code, ChevronDown, ChevronUp, Shield, AlertTriangle, CheckCircle, 
  Target, TrendingUp, Brain, Lock, Eye, Zap, 
  BookOpen, Lightbulb, Users, Settings
} from 'lucide-react';
import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function RiskGuide() {
  const [showPayload, setShowPayload] = useState(false);
  const [activeTab, setActiveTab] = useState('process');

  const processSteps = [
    {
      number: 1,
      title: 'Transaction Input',
      description: 'User provides essential transaction details while system captures contextual information.',
      icon: Target,
      details: [
        'Transfer amount (₹)',
        'Failed login attempts (last 24h)',
        'Auto-captured timestamp',
        'User behavioral context'
      ],
      riskFactors: ['High amounts', 'Multiple failed logins', 'Unusual timing']
    },
    {
      number: 2,
      title: 'Feature Engineering',
      description: 'Advanced algorithms transform raw data into meaningful fraud indicators.',
      icon: Brain,
      details: [
        'Balance change calculations',
        'Transaction pattern analysis',
        'Temporal encoding (time-based features)',
        'Behavioral scoring algorithms'
      ],
      riskFactors: ['Unusual balance patterns', 'Velocity anomalies', 'Time-based risks']
    },
    {
      number: 3,
      title: 'AI Risk Assessment',
      description: 'Machine learning models analyze patterns and calculate fraud probability.',
      icon: Zap,
      details: [
        'Multi-model ensemble scoring',
        'Real-time pattern matching',
        'Confidence interval calculation',
        'Risk threshold evaluation'
      ],
      riskFactors: ['Pattern deviations', 'Anomaly detection', 'Historical comparisons']
    },
    {
      number: 4,
      title: 'Decision & Action',
      description: 'System makes intelligent decisions and provides clear recommendations.',
      icon: Shield,
      details: [
        'Risk level categorization',
        'Action recommendations',
        'Audit trail logging',
        'Real-time alerts'
      ],
      riskFactors: ['High risk scores', 'Policy violations', 'Compliance requirements']
    }
  ];

  const bestPractices = [
    {
      category: 'Prevention',
      icon: Shield,
      color: 'text-primary-400',
      practices: [
        'Implement multi-factor authentication',
        'Regular security awareness training',
        'Continuous transaction monitoring',
        'Real-time risk scoring',
        'Behavioral analytics implementation'
      ]
    },
    {
      category: 'Detection',
      icon: Eye,
      color: 'text-security-400',
      practices: [
        'Machine learning anomaly detection',
        'Pattern recognition algorithms',
        'Cross-channel monitoring',
        'Velocity checks and limits',
        'Device fingerprinting'
      ]
    },
    {
      category: 'Response',
      icon: AlertTriangle,
      color: 'text-fraud-400',
      practices: [
        'Automated blocking mechanisms',
        'Step-up authentication protocols',
        'Incident response procedures',
        'Customer communication strategies',
        'Regulatory reporting compliance'
      ]
    },
    {
      category: 'Recovery',
      icon: TrendingUp,
      color: 'text-green-400',
      practices: [
        'Fraud loss mitigation strategies',
        'Customer impact assessment',
        'System security hardening',
        'Process improvement analysis',
        'Lessons learned documentation'
      ]
    }
  ];

  const riskLevels = [
    {
      level: 'Very Low',
      range: '0-20%',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      action: 'Allow transaction',
      description: 'Normal transaction pattern with no risk indicators'
    },
    {
      level: 'Low',
      range: '21-40%',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      action: 'Monitor closely',
      description: 'Minor anomalies detected, continue monitoring'
    },
    {
      level: 'Medium',
      range: '41-60%',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      action: 'Additional verification',
      description: 'Moderate risk factors present, verify identity'
    },
    {
      level: 'High',
      range: '61-80%',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
      action: 'Step-up authentication',
      description: 'Significant risk indicators, require enhanced security'
    },
    {
      level: 'Critical',
      range: '81-100%',
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      action: 'Block & investigate',
      description: 'High probability of fraud, immediate intervention required'
    }
  ];

  const tabs = [
    { id: 'process', label: 'Evaluation Process', icon: Target },
    { id: 'practices', label: 'Best Practices', icon: BookOpen },
    { id: 'levels', label: 'Risk Levels', icon: TrendingUp },
    { id: 'integration', label: 'Integration Guide', icon: Code }
  ];

  const examplePayload = `{
  "amount": [250000],
  "oldbalanceOrg": [450000],
  "newbalanceOrig": [200000],
  "oldbalanceDest": [20000],
  "newbalanceDest": [270000],
  "isFlaggedFraud": [0],
  "type_encoded": [0],
  "origin_balance_change": [-250000],
  "dest_balance_change": [250000],
  "time_period_encoded": [12],
  "failedLoginAttempts": [2],
  "velocityScore": [0.75],
  "behavioralRisk": [0.23]
}`;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-security-500/20 border border-primary-500/30 backdrop-blur-sm mb-6">
            <BookOpen className="w-4 h-4 text-primary-400 mr-2" />
            <span className="text-sm font-medium text-primary-300">Comprehensive Risk Management</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Risk Management <span className="text-gradient-cyber">Guide</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master fraud detection with our comprehensive guide covering evaluation processes, 
            best practices, risk levels, and implementation strategies.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-security-500 text-white shadow-glow-blue'
                  : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700/50 border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'process' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Fraud Detection Process</h2>
              <p className="text-lg text-gray-400">Step-by-step breakdown of our fraud evaluation methodology</p>
            </div>

            <div className="grid gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-security-500"></div>
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start space-x-4 lg:w-1/2">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-security-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-glow-blue">
                          {step.number}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-3">
                            <step.icon className="w-6 h-6 text-primary-400" />
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                          </div>
                          <p className="text-gray-300 mb-4">{step.description}</p>
                          
                          <div>
                            <h4 className="font-semibold text-primary-400 mb-2">Process Details:</h4>
                            <ul className="space-y-1">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-primary-400 mt-1 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-1/2">
                        <h4 className="font-semibold text-fraud-400 mb-3 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Key Risk Factors:
                        </h4>
                        <div className="grid gap-2">
                          {step.riskFactors.map((factor, idx) => (
                            <div key={idx} className="fraud-card p-3 bg-fraud-500/5 border-l-2 border-l-fraud-400">
                              <span className="text-sm text-gray-300">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practices' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Fraud Prevention Best Practices</h2>
              <p className="text-lg text-gray-400">Comprehensive strategies for effective fraud management</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {bestPractices.map((category, index) => (
                <Card key={index} hover className="group">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 ${category.color}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold">{category.category}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {category.practices.map((practice, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-dark-800/30 rounded-lg group-hover:bg-dark-700/30 transition-colors">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${category.color}`} />
                          <span className="text-sm text-gray-300">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'levels' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Risk Level Classification</h2>
              <p className="text-lg text-gray-400">Understanding fraud probability ranges and recommended actions</p>
            </div>

            <div className="space-y-4">
              {riskLevels.map((risk, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className={`md:w-1/4 p-6 ${risk.bg} border-r border-white/10`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${risk.color} mb-2`}>{risk.level}</div>
                        <div className="text-sm text-gray-400">{risk.range}</div>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <h4 className={`font-semibold ${risk.color} mb-2`}>
                            Recommended Action: {risk.action}
                          </h4>
                          <p className="text-gray-300 text-sm">{risk.description}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <Button 
                            variant="ghost" 
                            className={`text-xs border ${risk.color.replace('text-', 'border-')} hover:${risk.bg.replace('bg-', 'bg-')}`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'integration' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">System Architecture</h2>
              <Card className="p-8 relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-20"></div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-primary-500 rounded-lg font-semibold text-center flex-1">
                      Frontend Interface
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary-500 to-security-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-security-500 rounded-lg font-semibold text-center flex-1">
                      Feature Engineering
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-security-500 to-fraud-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-fraud-500 rounded-lg font-semibold text-center flex-1">
                      ML Model (API)
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-fraud-500 to-primary-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-primary-500 rounded-lg font-semibold text-center flex-1">
                      Response Handler
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <button
                  onClick={() => setShowPayload(!showPayload)}
                  className="w-full flex items-center justify-between hover:text-primary-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="text-primary-400" />
                    <span className="font-semibold">Sample API Payload</span>
                  </div>
                  {showPayload ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showPayload && (
                  <div className="mt-6 space-y-4">
                    <div className="fraud-card">
                      <div className="text-sm font-semibold text-primary-400 mb-3">POST /api/v1/fraud/predict</div>
                      <pre className="p-4 bg-dark-900/50 rounded-lg overflow-x-auto text-xs border border-white/5">
                        <code className="text-gray-300">{examplePayload}</code>
                      </pre>
                    </div>
                    <div className="text-xs text-gray-400 p-3 bg-dark-800/30 rounded-lg">
                      <div className="font-semibold mb-1">Expected Response:</div>
                      <code className="text-primary-400">{'{ "label": "Fraud"|"Not Fraud", "probability": 0.0-1.0, "confidence": 0.0-1.0 }'}</code>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Implementation Guide</h2>
              
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-primary-400 mb-4 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Quick Setup
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-dark-800/30 rounded-lg">
                      <div className="font-medium text-gray-200 mb-1">1. Install Dependencies</div>
                      <code className="text-xs text-gray-400">npm install axios react-query</code>
                    </div>
                    <div className="p-3 bg-dark-800/30 rounded-lg">
                      <div className="font-medium text-gray-200 mb-1">2. Configure API Endpoint</div>
                      <code className="text-xs text-gray-400">const API_BASE = "https://your-api.com/v1"</code>
                    </div>
                    <div className="p-3 bg-dark-800/30 rounded-lg">
                      <div className="font-medium text-gray-200 mb-1">3. Implement Prediction</div>
                      <code className="text-xs text-gray-400">POST {'{API_BASE}'}/fraud/predict</code>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-primary-500/10 to-security-500/10 border-primary-500/20">
                <div className="p-6">
                  <h3 className="font-semibold text-primary-400 mb-4 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Integration Tips
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Implement timeout handling for API calls (recommended: 5s)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Add retry logic for failed requests with exponential backoff</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Cache recent predictions to improve user experience</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Implement rate limiting to prevent API abuse</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-fraud-400 mb-4 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Production Considerations
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="p-3 bg-dark-800/30 rounded-lg border-l-2 border-l-fraud-400">
                      <strong>Security:</strong> Use HTTPS and API keys for all requests
                    </div>
                    <div className="p-3 bg-dark-800/30 rounded-lg border-l-2 border-l-primary-400">
                      <strong>Monitoring:</strong> Log all predictions for audit and compliance
                    </div>
                    <div className="p-3 bg-dark-800/30 rounded-lg border-l-2 border-l-security-400">
                      <strong>Fallback:</strong> Implement graceful degradation when API is unavailable
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
