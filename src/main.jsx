import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import PaymentTracking from './components/PaymentTracking.jsx';
import LoginPage from './components/LoginPage.jsx';
import VerificationInput from './components/VerificationInput.jsx';
import MTCNVerification from './components/MTCNVerification.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MTCNVerification onSuccessfulVerification={() => window.location.href = '/payment-tracking'} />} />
        <Route path="/payment-tracking" element={<PaymentTracking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationInput />} />
        
        
        {/* Add other routes if needed */}
      </Routes>
    </Router>
  </StrictMode>
);
