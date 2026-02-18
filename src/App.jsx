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

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isAuthenticated) {
    return <Dashboard user={user} onLogout={handleLogout} />;
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
