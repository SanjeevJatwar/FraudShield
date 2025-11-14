import { Shield, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Newsletter subscription coming soon!');
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1233] border-t border-[rgba(255,255,255,0.10)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={32} className="text-[#247BFF]" />
              <span className="text-xl font-bold text-gradient">FraudShield</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered fraud detection and risk management solutions for modern enterprises.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-[#0A0C23] border border-[rgba(255,255,255,0.10)] rounded-lg text-[#F4F6FF] placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#247BFF]"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#247BFF] hover:bg-[#1a66e0] text-white rounded-lg transition-colors"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>

          <div>
            <h3 className="font-semibold text-[#F4F6FF] mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Fraud Detection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Entity Risk</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Compliance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">AML/KYC</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#F4F6FF] mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#F4F6FF] mb-4">Industries</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Banking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">E-commerce</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Fintech</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#247BFF] transition-colors">Insurance</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.10)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} FraudShield Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#247BFF] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#247BFF] transition-colors">Security & Compliance</a>
            <a href="#" className="hover:text-[#247BFF] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
