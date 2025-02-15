import { useState } from 'react';
import PropTypes from 'prop-types';
import './MTCNVerificationForm.css';

const MTCNVerificationForm = ({ onSuccessfulVerification }) => {
  const [mtcnCode, setMtcnCode] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const VERIFICATION_CODE = '25923'; // Fixed verification code

  const handleChange = (e) => {
    const input = e.target.value;
    // Only allow digits and limit to 5 characters
    if (/^\d*$/.test(input) && input.length <= 5) {
      setMtcnCode(input);
      setError('');
      setIsValid(input.length === 5);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mtcnCode.length !== 5) {
      setError('Please enter a 5-digit code');
      return;
    }
    
    if (mtcnCode === VERIFICATION_CODE) {
      // Successful verification
      console.log('Verification successful');
      if (onSuccessfulVerification) {
        onSuccessfulVerification(); // Will redirect to the login page
      }
    } else {
      setError('Invalid verification code. Please try again.');
      setMtcnCode('');
      setIsValid(false);
    }
  };

  return (
    <div className="mtcn-container">
      <h1 className="mtcn-title">MTCN VERIFICATION</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="mtcnCode">MTCN CODE</label>
          <div className="input-container">
            <input 
              id="mtcnCode"
              className={`mtcn-input ${error ? 'input-error' : ''}`}
              type="text"
              placeholder="XXXXX"
              value={mtcnCode}
              onChange={handleChange}
            />
            <div className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button 
          className="verify-button" 
          type="submit"
          disabled={!isValid}
        >
          VERIFY CODE
        </button>
      </form>
      
      <div className="gradient-line"></div>
    </div>
  );
};

MTCNVerificationForm.propTypes = {
  onSuccessfulVerification: PropTypes.func.isRequired,
};

export default MTCNVerificationForm;
