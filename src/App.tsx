/**
 * FraudShield Frontend - Main Application Component
 * -----------------------------------------------
 * Description: Core component handling routing and global layout for the FraudShield platform.
 * Author: FraudShield Team
 * File: src/App.tsx
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import RiskGuide from './pages/RiskGuide';
import Login from './pages/Login';
import Demo from './pages/Demo';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);


  const handlePageChange = (newPage: string) => {
    if (newPage === currentPage) return;

    setIsTransitioning(true);

    // Smooth page transition
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 150);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handlePageChange} />;
      case 'solutions':
        return <Solutions />;
      case 'risk-guide':
        return <RiskGuide />;
      case 'login':
        return <Login />;
      case 'demo':
        return <Demo />;
      default:
        return <Home onNavigate={handlePageChange} />;
    }
  };

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-security-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-fraud-500/3 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <Navbar onNavigate={handlePageChange} currentPage={currentPage} />

      {/* Main Content with Page Transition */}
      <main
        className={`
          relative z-10 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out
          ${isTransitioning
            ? 'opacity-0 transform scale-95'
            : 'opacity-100 transform scale-100'
          }
        `}
      >
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Loading Indicator for Page Transitions */}
      {isTransitioning && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary-500 via-security-500 to-fraud-500 animate-pulse"></div>
      )}
    </div>
  );
}

export default App;
