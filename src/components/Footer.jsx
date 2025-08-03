import React from 'react';

// Official Legal Document URLs - Production Constants
const TERMS_OF_SERVICE_URL = 'https://www.notion.so/Terms-of-Service-244ef2c40b1f810aac97c04360dd6341';
const PRIVACY_POLICY_URL = 'https://www.notion.so/Privacy-Policy-244ef2c40b1f81f29aadd5d4b3771fe2';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl mr-2">🎯</span>
            <span className="text-lg font-semibold text-gray-900">TuneAtLife</span>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6 text-sm text-gray-600">
            <a 
              href={TERMS_OF_SERVICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition-colors underline"
            >
              Terms of Service
            </a>
            <a 
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition-colors underline"
            >
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 mt-4 md:mt-0">
            © 2024 SIX ELEMENTS ALTIORA LTD
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

