/**
 * Home Page Component
 * -------------------
 * Description: The landing page for FraudShield, featuring 3D animations and key value propositions.
 * File: src/pages/Home.tsx
 */

import { TrendingUp, Shield, Target, Brain, Zap, Lock, Eye, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import HeroAnimation from '../components/HeroAnimation';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const metrics = [
    { value: '10', label: 'Key features analyzed', icon: Target, color: 'text-primary-400' },
    { value: 'PaySim', label: 'Training dataset used', icon: Shield, color: 'text-security-400' },
    { value: 'ML', label: 'Algorithm approach', icon: TrendingUp, color: 'text-fraud-400' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Model',
      description: 'Trained on PaySim dataset with transaction patterns to classify fraudulent vs legitimate transactions using supervised learning.',
      color: 'text-primary-400'
    },
    {
      icon: Zap,
      title: 'Feature Engineering',
      description: 'Analyzes transaction amount, failed login attempts, timestamp patterns, and balance changes to detect anomalies.',
      color: 'text-security-400'
    },
    {
      icon: Lock,
      title: 'Risk Assessment',
      description: 'Provides fraud probability scores with confidence levels and recommended actions based on risk thresholds.',
      color: 'text-fraud-400'
    },
    {
      icon: Eye,
      title: 'Interactive Dashboard',
      description: 'Real-time visualization of fraud detection results with trend analysis and transaction history tracking.',
      color: 'text-primary-400'
    }
  ];



  const benefits = [
    'Machine learning-based detection',
    'Real-time transaction analysis',
    'Interactive fraud risk assessment',
    'PaySim dataset training',
    'Advanced pattern recognition',
    'User-friendly dashboard'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="absolute inset-0 neural-network"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-security-500/20 border border-primary-500/30 backdrop-blur-sm">
                <CheckCircle className="w-4 h-4 text-primary-400 mr-2" />
                <span className="text-sm font-medium text-primary-300">Next-Generation Fraud Detection</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                AI-Powered{' '}
                <span className="text-gradient-cyber">Fraud Detection</span>{' '}
                System
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Experience our machine learning model trained on the PaySim dataset to identify 
                fraudulent transaction patterns using advanced algorithms and real-time analysis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" onClick={() => onNavigate('demo')} className="group">
                  Try Interactive Demo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost" onClick={() => onNavigate('solutions')}>
                  Explore Solutions
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">Real-time</div>
                  <div className="text-sm text-gray-400">Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">Interactive</div>
                  <div className="text-sm text-gray-400">Demo</div>
                </div>
              </div>
            </div>

            <div className="h-[500px] lg:h-[600px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-security-500/10 to-fraud-500/10 rounded-3xl blur-3xl animate-pulse-slow"></div>
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Proven Results</h2>
          <p className="text-xl text-gray-400">Delivering measurable impact across organizations worldwide</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <Card key={index} hover glow={index === 0 ? 'blue' : index === 1 ? 'magenta' : 'none'}>
              <div className="flex flex-col items-center text-center space-y-6 p-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 ${metric.color}`}>
                  <metric.icon size={32} />
                </div>
                <div className="text-5xl font-black text-gradient">{metric.value}</div>
                <div className="text-lg font-medium text-gray-300">{metric.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Advanced Capabilities</h2>
          <p className="text-xl text-gray-400">Comprehensive fraud detection powered by cutting-edge technology</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="group">
              <div className="p-6 space-y-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 w-fit group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">
              About Our{' '}
              <span className="text-gradient">Fraud Detection Model</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our fraud detection system uses machine learning algorithms trained on historical 
              procurement data and bank transaction logs to identify suspicious patterns.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-primary-400 group-hover:text-security-400 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" onClick={() => onNavigate('solutions')} className="group">
              Learn More About Our Solutions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className="fraud-card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Model Performance</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Ready</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-dark-900/50 rounded-xl">
                  <span className="text-gray-300">Training Dataset</span>
                  <span className="font-bold text-gradient">PaySim</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-dark-900/50 rounded-xl">
                  <span className="text-gray-300">Model Type</span>
                  <span className="font-bold text-gradient-danger">ML Classifier</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-dark-900/50 rounded-xl">
                  <span className="text-gray-300">Features Used</span>
                  <span className="font-bold text-gradient-success">10 Key Indicators</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="fraud-card text-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-security-500/10 to-fraud-500/10"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold">
              Ready to Test Our{' '}
              <span className="text-gradient">Fraud Detection System</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience our AI-powered fraud detection model trained on real transaction data 
              to identify suspicious patterns and prevent fraudulent activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => onNavigate('demo')} className="group">
                Start Free Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('login')}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
