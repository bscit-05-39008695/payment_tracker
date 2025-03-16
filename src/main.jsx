import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import PaymentTracking from './components/PaymentTracking.jsx';
import LoginPage from './components/LoginPage.jsx';
import VerificationInput from './components/VerificationInput.jsx';
import MTCNVerification from './components/MTCNVerification.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment-tracker" element={<PaymentTracking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationInput />} />
        
        {/* Default route for MTCN verification page */}
        <Route path="/" element={<MTCNVerification />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
export default App;