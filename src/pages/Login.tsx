import { Lock, Mail, Shield, CheckCircle, ArrowRight, Eye, EyeOff, Fingerprint, Smartphone } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Login functionality will be connected to your backend authentication system!');
  };

  const securityFeatures = [
    { icon: Shield, label: 'End-to-end encryption' },
    { icon: Fingerprint, label: 'Biometric authentication' },
    { icon: Smartphone, label: 'Multi-factor authentication' },
    { icon: CheckCircle, label: 'Advanced fraud protection' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 neural-network"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-security-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Info */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-5xl font-black mb-6">
                Access Your{' '}
                <span className="text-gradient-cyber">Fraud Detection</span> System
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Sign in to access the fraud detection dashboard powered by machine learning 
                algorithms trained on transaction data for real-time fraud analysis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-dark-800/30 rounded-xl border border-white/5 hover:border-primary-400/30 transition-all group">
                  <div className="p-2 rounded-lg bg-primary-500/20 group-hover:bg-primary-500/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-primary-500/10 to-security-500/10 border-primary-500/20">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-primary-500/20">
                  <Shield className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-400 mb-2">
                    Enterprise Security Standards
                  </h3>
                  <p className="text-sm text-gray-300">
                    This is a demo authentication interface for the fraud detection system. 
                    In production, this would connect to your secure authentication backend 
                    with proper encryption and validation.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-security-500"></div>
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-security-500 rounded-2xl mb-4 shadow-glow-blue">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                  <p className="text-gray-400">Access your fraud detection dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-9 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-2 border-gray-600 bg-dark-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors"
                      />
                      <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
                        Keep me signed in
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth 
                    disabled={isLoading}
                    className="group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign in to Dashboard</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                  <span className="px-4 text-sm text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>

                {/* Alternative Auth Methods */}
                <div className="space-y-3">
                  <Button 
                    variant="ghost" 
                    fullWidth 
                    className="border-white/10 hover:border-primary-400/30"
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Use Biometric Login
                  </Button>
                  <Button 
                    variant="ghost" 
                    fullWidth 
                    className="border-white/10 hover:border-security-400/30"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Send Mobile Code
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-400 mb-2">
                    Want to test the system?
                  </p>
                  <button className="text-primary-400 hover:text-primary-300 font-semibold transition-colors text-sm">
                    Try Interactive Demo →
                  </button>
                </div>
              </div>
            </Card>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Systems Operational</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <span>99.9% Uptime SLA</span>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
