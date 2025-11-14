import { 
  Shield, Users, FileCheck, Database, Cpu, BarChart, CheckCircle, 
  Brain, Lock, Zap, Eye, TrendingUp, AlertTriangle, 
  Clock, Globe, ArrowRight, Star 
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Solutions() {
  const solutions = [
    {
      icon: Shield,
      title: 'Real-Time Fraud Detection',
      description: 'Advanced ML algorithms analyze transaction patterns in milliseconds, identifying fraudulent behavior before it impacts your business.',
      features: ['99.7% accuracy rate', 'Sub-second response', 'Adaptive learning'],
      color: 'text-primary-400',
      gradient: 'from-primary-500/20 to-security-500/20'
    },
    {
      icon: Brain,
      title: 'Behavioral Analytics',
      description: 'Monitor user behavior patterns and detect anomalies that indicate potential fraud or account compromise.',
      features: ['User profiling', 'Anomaly detection', 'Risk scoring'],
      color: 'text-fraud-400',
      gradient: 'from-fraud-500/20 to-primary-500/20'
    },
    {
      icon: Lock,
      title: 'Multi-Layer Security',
      description: 'Comprehensive security framework combining multiple detection methods for maximum protection.',
      features: ['Rule-based filters', 'ML models', 'Human oversight'],
      color: 'text-security-400',
      gradient: 'from-security-500/20 to-fraud-500/20'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Data Ingestion',
      description: 'Collect and process transaction data from multiple sources including procurement history and bank transaction logs.',
      icon: Database,
      details: ['Real-time data streaming', 'Historical data analysis', 'Multi-source integration']
    },
    {
      number: '02',
      title: 'Feature Engineering',
      description: 'Transform raw data into meaningful features that capture fraud patterns and behavioral signals.',
      icon: Cpu,
      details: ['Amount velocity analysis', 'Temporal pattern detection', 'Behavioral scoring']
    },
    {
      number: '03',
      title: 'Risk Scoring',
      description: 'Apply machine learning models to generate accurate risk scores and fraud probability assessments.',
      icon: BarChart,
      details: ['Ensemble modeling', 'Real-time scoring', 'Confidence intervals']
    },
    {
      number: '04',
      title: 'Automated Action',
      description: 'Take appropriate action based on risk assessment - from allowing transactions to blocking them entirely.',
      icon: CheckCircle,
      details: ['Automated blocking', 'Step-up authentication', 'Alert generation']
    }
  ];

  const capabilities = [
    {
      icon: Eye,
      title: 'Advanced Pattern Recognition',
      description: 'Identify complex fraud patterns that traditional rule-based systems miss.',
      stats: '95% pattern detection improvement'
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Processing',
      description: 'Process millions of transactions per second with minimal latency.',
      stats: '< 50ms average response time'
    },
    {
      icon: Globe,
      title: 'Global Scale Operations',
      description: 'Handle fraud detection across multiple regions and currencies seamlessly.',
      stats: '200+ countries supported'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Models continuously adapt to new fraud patterns and emerging threats.',
      stats: '24/7 model optimization'
    }
  ];





  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-security-500/20 border border-primary-500/30 backdrop-blur-sm mb-6">
            <Star className="w-4 h-4 text-primary-400 mr-2" />
            <span className="text-sm font-medium text-primary-300">Industry-Leading Solutions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Comprehensive <span className="text-gradient-cyber">Fraud Prevention</span> Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Protect your business with next-generation fraud detection technology that combines 
            machine learning, behavioral analytics, and real-time processing.
          </p>
        </div>

        {/* Main Solutions Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <Card key={index} hover className="group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative z-10 p-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 w-fit mb-6 group-hover:scale-110 transition-transform ${solution.color}`}>
                  <solution.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{solution.description}</p>
                
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How Our System Works</h2>
            <p className="text-xl text-gray-400">From data ingestion to automated response in milliseconds</p>
          </div>
          
          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block">
              <div className="absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-500 to-security-500"></div>
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-40 bg-gradient-to-b from-security-500 to-fraud-500"></div>
              <div className="absolute bottom-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-fraud-500 to-primary-500"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <Card key={index} className="relative group">
                  <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-primary-500 to-security-500 rounded-full flex items-center justify-center font-black text-lg shadow-glow-blue">
                    {step.number}
                  </div>
                  
                  <div className="pt-8 pb-4">
                    <step.icon size={32} className="text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{step.description}</p>
                    
                    <div className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-gray-400 flex items-center">
                          <div className="w-1 h-1 bg-primary-400 rounded-full mr-2"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Advanced Capabilities</h2>
            <p className="text-xl text-gray-400">Cutting-edge features that set us apart from the competition</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} hover className="text-center group">
                <div className="p-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <capability.icon size={28} className="text-primary-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{capability.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{capability.description}</p>
                  <div className="text-primary-400 font-semibold text-sm">{capability.stats}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>





        {/* Call to Action */}
        <div className="text-center">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-security-500/10 to-fraud-500/10"></div>
            <div className="relative z-10 p-12">
              <h2 className="text-4xl font-bold mb-4">
                Explore Our <span className="text-gradient">Fraud Detection Model</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our machine learning model is trained on transaction data from the PaySim dataset 
                to detect fraudulent patterns in real-time financial transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" className="group">
                  Try Interactive Demo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost">
                  View Model Details
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
