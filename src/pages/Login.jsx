import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ScaleIcon } from '@heroicons/react/24/outline';

const BACKEND_URL = "https://lawpal-backend.onrender.com";

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, form);
      onAuth(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <ScaleIcon className="h-8 w-8 text-indigo-700" />
            <span className="text-2xl font-bold text-gray-800">LawPal</span>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-6">Sign in to your legal dashboard</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@lawfirm.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-start">
                <svg
                  className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to LawPal?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
