import React, { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { UserIcon, LockIcon, EyeIcon, EyeSlashIcon, SpinnerIcon } from '../components/Icons';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

// Correct live backend URL from Render.
const API_BASE_URL = 'https://valuecent-backend.onrender.com';

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const clearFormState = () => {
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleModeToggle = () => {
    clearFormState();
    setFormMode(prev => prev === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (formMode === 'register') {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed.');
            }
            setSuccess('Registration successful! Please log in.');
            setFormMode('login');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    } else { // Login mode
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred during login.');
            }
            onLoginSuccess();
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('Failed to fetch')) {
                    setError('Cannot connect to the server. The service may be starting up.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }
  };
  
  const isFormValid = formMode === 'login'
    ? username.trim() !== '' && password.trim() !== ''
    : username.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

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
          <p className="text-[var(--fg-muted)] mb-8">
            {formMode === 'login' ? 'Intelligent Learning Platform' : 'Create Your Account'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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

            {formMode === 'register' && (
              <div>
                <label htmlFor="confirmPassword"  className="block text-sm font-medium text-[var(--card-fg)]">Confirm Password</label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockIcon className="h-5 w-5 text-[var(--fg-subtle)]" />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="off"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-[var(--card)]/50 border-[var(--border)] text-[var(--card-fg)] placeholder-[var(--fg-subtle)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                    placeholder="Confirm password"
                    disabled={isLoading}
                  />
                  <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      disabled={isLoading}
                  >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}
            
            {error && (
              <p className="text-sm text-red-600 text-center font-medium bg-red-100 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg border border-red-200 dark:border-red-500/20">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 text-center font-medium bg-green-100 dark:bg-green-500/10 dark:text-green-400 p-3 rounded-lg border border-green-200 dark:border-green-500/20">{success}</p>
            )}

            <div>
              <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full h-14 flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-[var(--bg-disabled)] disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
              >
                  {isLoading 
                    ? <SpinnerIcon className="animate-spin h-6 w-6 text-white" />
                    : (formMode === 'login' ? 'Login' : 'Create Account')}
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm">
            <button onClick={handleModeToggle} className="text-[var(--fg-muted)] hover:text-[var(--fg)] font-medium transition-colors" disabled={isLoading}>
              {formMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;