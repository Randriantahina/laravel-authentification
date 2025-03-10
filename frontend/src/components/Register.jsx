import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
      });

      console.log('Response:', response.data);

      setSuccess('Registration successful! Please log in.');
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.error('Error response:', err.response);

        if (err.response.data.errors) {
          setError(
            err.response.data.errors.email ||
              'Registration failed. Please try again.'
          );
        } else {
          setError(err.response.data.message || 'Registration failed');
        }
      } else {
        setError('Something went wrong.');
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Display error or success messages */}
          {error && <div className="mt-3 text-red-500">{error}</div>}
          {success && <div className="mt-3 text-green-500">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
