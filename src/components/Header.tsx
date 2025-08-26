import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, User, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Header() {
  const location = useLocation();
  const { user, cart } = useApp();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {!isHomePage ? (
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-pink-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-amber-900" />
          </button>
        ) : (
          <div className="w-9" />
        )}
        
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🐕</span>
          <span className="font-bold text-amber-900">SHIBA</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            to={user.isLoggedIn ? '/dashboard' : '/login'}
            className="p-2 hover:bg-pink-100 rounded-full transition-colors relative"
          >
            <User className="w-5 h-5 text-amber-900" />
          </Link>
          
          <Link
            to="/checkout"
            className="p-2 hover:bg-pink-100 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5 text-amber-900" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;