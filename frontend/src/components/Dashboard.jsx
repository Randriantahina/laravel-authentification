import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        axios
          .get('http://127.0.0.1:8000/api/dashboard', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log('Dashboard data:', response.data);
          })
          .catch((error) => {
            setError('Failed to fetch dashboard data.');
            console.error(error);
          });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out.');
    }
  };

  if (loading)
    return <p className="text-center text-secondary fs-5">Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-center text-2xl font-semibold text-blue-600 mb-4">
          Welcome to Your Dashboard
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {user && (
          <div className="bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded text-center">
            <p>
              Hello, <strong>{user.name}</strong>!
            </p>
            <p>Your email: {user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded mt-4 mx-auto block hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
