import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import KeyFeatures from './components/KeyFeatures';
import ForBanks from './components/ForBanks';
import Impact from './components/Impact';
import TechTrust from './components/TechTrust';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  useEffect(() => {
    const storedUser = localStorage.getItem('agrsetu_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem('agrsetu_user');
      }
    }
  }, []);

  const handleLogin = (userData, rememberMe) => {
    setIsAuthenticated(true);
    setUser(userData);
    if (rememberMe) {
      localStorage.setItem('agrsetu_user', JSON.stringify(userData));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('agrsetu_user');
  };

  if (isAuthenticated) {
    return (
      <>
        <Dashboard user={user} onLogout={handleLogout} />
        <VoiceAssistant />
      </>
    );
  }

  return (
    <div className="App">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      <Hero onLoginClick={() => setIsLoginOpen(true)} />
      <Problem />
      <Solution />
      <KeyFeatures />
      <ForBanks />
      <Impact />
      <TechTrust />
      <Footer />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
