import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Laravel Authentication</h1>

      <div className="mt-4 space-x-2">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigateTo('/login')}
        >
          Login
        </button>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigateTo('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
