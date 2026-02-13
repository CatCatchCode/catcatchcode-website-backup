import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlayCircle, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const BottomNav = () => {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/') ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link
          to="/courses"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/courses') ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>

        {user && (
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive('/dashboard') ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <PlayCircle className="h-6 w-6" />
            <span className="text-xs mt-1">My Learning</span>
          </Link>
        )}

        <Link
          to={user ? "/profile" : "/login"}
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/profile') || isActive('/login') ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">{user ? 'Account' : 'Login'}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
