/**
 * Navbar Component
 * ----------------
 * Description: Global navigation bar providing access to different sections of the platform.
 * File: src/components/Navbar.tsx
 */

import { Menu, X, Shield, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from './Button';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'Risk Guide', id: 'risk-guide' },
    { name: 'Login', id: 'login' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav 
      className={`
        sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl
        ${scrolled 
          ? 'bg-dark-900/95 shadow-2xl shadow-primary-500/10 border-b border-white/10' 
          : 'bg-dark-900/80'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105" 
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-security-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow-blue transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-security-400 rounded-xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-gradient-cyber tracking-tight">FraudShield</span>
              <div className="text-xs text-gray-400 -mt-1">AI Security Platform</div>
            </div>
            <span className="sm:hidden text-lg font-black text-gradient-cyber">FS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group
                  ${currentPage === item.id 
                    ? 'text-primary-400 bg-primary-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="relative z-10">{item.name}</span>
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-security-500/20 rounded-lg"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-security-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('demo')}
              className="hidden lg:inline-flex"
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Demo
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onNavigate('login')}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative p-2 text-gray-300 hover:text-white transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 z-40
          ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`
          fixed top-16 lg:top-20 left-0 right-0 bg-dark-900/98 backdrop-blur-xl border-b border-white/10 md:hidden transition-all duration-300 z-50 transform
          ${mobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
          }
        `}
      >
        <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`
                block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative overflow-hidden
                ${currentPage === item.id
                  ? 'bg-gradient-to-r from-primary-500/20 to-security-500/20 text-primary-400 border border-primary-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10">{item.name}</span>
              {currentPage === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary-500 to-security-500 rounded-r"></div>
              )}
            </button>
          ))}
          
          <div className="pt-4 space-y-3 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={() => {
                onNavigate('demo');
                setMobileMenuOpen(false);
              }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Interactive Demo
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                onNavigate('login');
                setMobileMenuOpen(false);
              }}
            >
              Login to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
