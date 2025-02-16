import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          🏠 RentEase
        </Link>
        <div className="flex gap-6 items-center">
          {user?.role === 'landlord' && (
            <Link to="/dashboard" className="text-white hover:text-blue-200">
              Dashboard
            </Link>
          )}
          <Link to="/properties" className="text-white hover:text-blue-200">
            Browse
          </Link>
          {user ? (
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}