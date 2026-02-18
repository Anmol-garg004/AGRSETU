import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import KeyFeatures from './components/KeyFeatures';
import ForBanks from './components/ForBanks';
import Impact from './components/Impact';
import TechTrust from './components/TechTrust';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <KeyFeatures />
      <ForBanks />
      <Impact />
      <TechTrust />
      <Footer />
    </div>
  );
}

export default App;
