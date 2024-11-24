'use client';

import { useState } from 'react';

export default function RegistrationForm() {
  // Add state for username and usernameErrorText
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // Add state for password and passwordErrortext
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Add state for confirmPassword and confirmPasswordErrorText
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Extra - add state for email and emailErrorText
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Add state for isFormValid
  const [isFormValid, setIsFormValid] = useState(false);

  // Add state to set formData
  const [formData, setFormData] = useState(null); // For storing and displaying results

  // Add function to validate username
  const validateUsername = (value) => {
    if (value.length === 0) {
      setUsernameError('Username is required');
    } else if (value.length > 0 && value.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
    } else {
      setUsernameError('');
    }
    validateForm();
  };

  // Add function to validate password
  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
    validateForm();
  };

  // Add function to validate confirm password
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords must match');
    } else {
      setConfirmPasswordError('');
    }
    validateForm();
  };

  // Extra add function to validate email
  const validateEmail = (value) => {
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
    validateForm();
  };

  // Add function to validateForm
  const validateForm = () => {
    if (
      !usernameError &&
      username.length >= 3 &&
      !passwordError &&
      password.length >= 8 &&
      !confirmPasswordError &&
      confirmPassword === password &&
      (!email || !emailError)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    console.log({
      usernameError,
      passwordError,
      confirmPasswordError,
      username,
      password,
      confirmPassword,
      email,
      emailError,
    });
  };

  // Add function to handle username change
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  // Add function to handle password change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    // immediately verify confirm password
    // validateConfirmPassword(confirmPassword);
  };

  // Add function to handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    console.log('Password:', password, 'Confirm Password:', value);
    validateConfirmPassword(value);
  };

  // // watch for changes to password or confirm password
  // useEffect(() => {
  //   if (confirmPassword) {
  //     validateConfirmPassword();
  //   }
  // }, [password, confirmPassword]);

  // Extra - Add function to handle email value change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  // Create a handleSubmitFunction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setFormData({ username, email });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-wrap lg:flex-nowrap gap-8 w-full justify-center">
        {/* Form Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">
            Registration Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-semibold mb-2">
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                id="username"
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              {usernameError && (
                <p className="text-red-500 text-sm mt-2">{usernameError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-semibold mb-2"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-2">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-2">
                Email (Optional):
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded bg-gray-600 text-slate-50 hover:bg-blue-500 hover:font-semibold ${
                !isFormValid ? 'cursor-not-allowed' : ''
              }`}
            >
              Register
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-blue-500 mb-4">
            Registration Results
          </h2>
          {formData ? (
            <div>
              <p className="mb-2">
                <span className="font-semibold">Username: </span>
                {formData.username}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {formData.email || 'N/A'}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No registration details to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
