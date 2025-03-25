import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import yegLogo from '../assets/yeg.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Resetting error messages
    setEmailError('');
    setPasswordError('');
    setError('');

    if (!email || !password) {
      setEmailError('Please enter a valid email');
      setPasswordError('Please enter a valid password');
      return;
    }

    try {
      const response = await fetch('https://paxful-backend-6.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.shouldNavigate) {
          navigate('/Verification'); // Navigate to Verification page on successful login
        }
      } else {
        setEmailError('Invalid email/password');
        setPasswordError('Invalid email/password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  const languages = ['English', 'Spanish', 'French', 'German'];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-[#0D6E52]'} flex flex-col items-center justify-center p-6`}>
      {/* Logo */}
      <div className="mb--2">
        <img 
          src={yegLogo} 
          alt="YEG Logo" 
          className="w-32 h-32 object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 relative">
        <div className="text-start mt-10">
          <h1 className="text-3xl font-bold text-[#0D6E52] mb-4">Log in</h1>
          <p className="text-gray-600 mb-6">Access your NoOnes account</p>

          {/* Social Login Buttons */}
          <div className="flex justify-between space-x-4 mb-8">
            <button className="flex-1 bg-[#0D6E52] rounded-lg p-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="bg-white rounded p-1">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.75c-.99.67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.86-2.59 3.29-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="flex-1 bg-[#0D6E52] rounded-lg p-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="bg-white rounded p-1">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="flex-1 bg-[#0D6E52] rounded-lg p-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="bg-white rounded p-1">
                <path fill="#000000" d="M12 0C8.09 0 5.28 1.67 4 4.5 1.78 8.05 0 12 0 12s1.78 3.95 4 7.5C5.28 22.33 8.09 24 12 24c3.54 0 6.18-1.67 7.62-4.5C22 16 24 12 24 12s-2-4-4.38-7.5C17.18 1.67 15.54 0 12 0zm0 2c2.16 0 3.54 1.01 4.28 2.5C17.28 6.46 18.74 9.23 19.38 12c-.64 2.77-2.1 5.54-3.1 7.5-.74 1.49-2.12 2.5-4.28 2.5s-3.54-1.01-4.28-2.5C6.72 17.54 5.26 14.77 4.62 12c.64-2.77 2.1-5.54 3.1-7.5C8.46 3.01 9.84 2 12 2z"/>
              </svg>
            </button>
          </div>

          <div className="text-center text-sm mb-8">
            <p>Don't have an account? <a href="https://noones.com/id/register" className="text-[#0D6E52] font-semibold">Join us</a></p>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label htmlFor="email" className="block text-left text-gray-700 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full p-3 border rounded-lg text-gray-700 placeholder-gray-400"
                required
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-left text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg text-gray-700 placeholder-gray-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <a href="https://noones.com/id/reset-password" className="text-[#0D6E52] block text-right mb-2">Forgot password?</a>
            <button 
              type="submit" 
              className="w-full bg-[#0D6E52] text-white p-3 rounded-lg hover:bg-gray-700 transition"
            >
              Continue
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center text-sm">
            <a href="https://noones.com/id/login" className="text-[#0D6E52] block">Log in with your phone number</a>
          </div>
        </div>
      </div>

      {/* Bottom Toggle */}
      <div className="w-full max-w-md flex justify-between p-6 bg-[#0D6E52] text-white rounded-b-lg">
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-white">☀️</button>
          <div 
            className={`w-12 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full relative`}
            onClick={toggleDarkMode}
          >
            <div 
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                isDarkMode ? 'right-0.5' : 'left-0.5'
              }`}
            ></div>
          </div>
          <button onClick={toggleDarkMode} className="text-white">🌙</button>
        </div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="text-white bg-[#0D6E52] rounded-lg p-1"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LoginPage;





