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

        <Route path="/payment-tracking" element={<PaymentTracking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationInput />} />
         {/* Default route for MTCN verification page */}
         <Route path="/" element={<MTCNVerification />} />
        

        {/* Default route for main page */}
        <Route path="/"element={
            <>
              {/* Render Navbar and Footer on all routes except /login and /verification */}
              <MTCNVerification/> 
              <PaymentTracking /> 
            </>
          }
        />
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

