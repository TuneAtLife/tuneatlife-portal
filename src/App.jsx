import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LandingPage from './components/LandingPage.jsx';
import AuthCallback from './components/AuthCallback.jsx';
import Footer from './components/Footer.jsx';
import BuildVersion from './components/BuildVersion.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={
              <>
                <LandingPage />
                <Footer />
                <BuildVersion />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
