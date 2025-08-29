import React, { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { UserIcon, LockIcon, EyeIcon, EyeSlashIcon } from '../components/Icons';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Step 1: Send the username and password to our running backend server.
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Step 2: Check if the server responded with an error (e.g., 401 Unauthorized).
      if (!response.ok) {
        // If there's an error, we expect the server to send back JSON with a 'message' property.
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred during login.');
      }

      // Step 3: If the response was successful, call the onLoginSuccess function.
      onLoginSuccess();

    } catch (err) {
      if (err instanceof Error) {
        // Handle network errors (e.g., backend is not running) or errors from the server.
        if (err.message.includes('Failed to fetch')) {
             setError('Cannot connect to the server. Please ensure the backend is running.');
        } else {
            setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300"
    >
      <div className="absolute inset-0 w-full h-full">
        <AnimatedBackground />
      </div>
      <div 
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[var(--card)]/70 dark:bg-[var(--card)]/70 backdrop-blur-md border border-[var(--border)] rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tighter valuecent-brand-font mb-2">
            VALUECENT
          </h1>
          <p className="text-[var(--fg-muted)] mb-8">Intelligent Learning Platform</p>
          
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--card-fg)]">Username</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-[var(--fg-subtle)]" />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--card)]/50 border-[var(--border)] text-[var(--card-fg)] placeholder-[var(--fg-subtle)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-[var(--card-fg)]">Password</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-[var(--fg-subtle)]" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('');
                  }}
                  className="w-full pl-10 pr-10 py-2 bg-[var(--card)]/50 border-[var(--border)] text-[var(--card-fg)] placeholder-[var(--fg-subtle)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={isLoading}
                >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-red-600 text-center font-medium bg-red-100 p-3 rounded-lg border border-red-200">{error}</p>
            )}

            <div>
              <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-[var(--bg-disabled)] disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
              >
                  {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;