import React from 'react';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/Footer.jsx';
import BuildVersion from './components/BuildVersion.jsx';
import './App.css';

function App() {
  return (
    <div className="min-h-screen">
      <LandingPage />
      
      {/* Footer with Legal Links */}
      <Footer />
      
      {/* Build Version Display */}
      <BuildVersion />
    </div>
  );
}

export default App;
