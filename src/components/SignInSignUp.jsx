import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, provider, auth } from '../firebase';
import stockImage from './img/posterImage.jpg'; 

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setError(''); 
    setIsSignUp(prev => !prev);
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem('user', JSON.stringify(auth.currentUser));
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear error message before submission
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem('user', JSON.stringify(auth.currentUser));
      navigate('/');
    } catch (error) {
      console.error('Error during authentication:', error);
      if (isSignUp) {
        setError('Failed to sign up. Please check your email and password and try again.');
      } else {
        setError('Failed to sign in. Please check your email and password and try again.');
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <input type="checkbox" name="" id="" />
      <img
        src={stockImage}
        alt="Stock Market"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      
      {/* Overlay container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg text-center w-full max-w-sm transform transition-all duration-500 ease-in-out hover:scale-105">
          <h1 className="text-2xl font-bold mb-4 text-white">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          {error && <div className="text-red-600 p-2 rounded-md mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <button
            onClick={handleToggle}
            className="mt-4 text-blue-400 hover:underline transition duration-300"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
          </button>
          <div className="mt-4">
            <p className="text-gray-400">Or</p>
            <button
              onClick={handleSignInWithGoogle}
              className="text-red-500 px-4 py-2 rounded-md shadow-md hover:bg-red-500 hover:text-white hover:shadow-lg transition duration-300 mt-2"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInSignUp;
