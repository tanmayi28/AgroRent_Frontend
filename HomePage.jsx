import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * AgroRent Homepage Component
 * A modern, responsive homepage with improved visual hierarchy, typography, and UX
 */
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Check login state on mount and listen for changes
  useEffect(() => {
    const checkLoginState = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const user = localStorage.getItem('username') || '';
      setIsLoggedIn(loggedIn);
      setUsername(user);
    };

    // Check initial state
    checkLoginState();

    // Listen for storage changes (when user logs in/out in another tab or after signup)
    window.addEventListener('storage', checkLoginState);

    // Also check periodically in case localStorage is updated in the same tab
    const interval = setInterval(checkLoginState, 500);

    return () => {
      window.removeEventListener('storage', checkLoginState);
      clearInterval(interval);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setShowProfileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-bold">AgroRent</span>
            </Link>

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <Link
                to="/about"
                className="text-white/90 hover:text-white font-medium transition-all relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
              <Link
                to="/how-it-works"
                className="text-white/90 hover:text-white font-medium transition-all relative group"
              >
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* Right Side - Profile or Settings */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/20"
                  >
                    <i className="fas fa-user-circle text-xl"></i>
                    <span className="hidden sm:inline max-w-[120px] truncate">{username || 'User'}</span>
                    <i className={`fas fa-chevron-down text-sm transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}></i>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <i className="fas fa-user text-green-600"></i>
                        <span>View Profile</span>
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/20"
                  >
                    <span className="text-xl font-bold">⋮</span>
                  </button>

                  {/* Settings Dropdown */}
                  {showSettingsMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowSettingsMenu(false)}
                      >
                        <i className="fas fa-cog text-green-600"></i>
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/notifications"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowSettingsMenu(false)}
                      >
                        <i className="fas fa-bell text-green-600"></i>
                        <span>Notifications</span>
                      </Link>
                      <Link
                        to="/help"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowSettingsMenu(false)}
                      >
                        <i className="fas fa-question-circle text-green-600"></i>
                        <span>Help & Support</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/Hero page video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Logo Image */}
          <div className="mb-8">
            <img
              src="/assets/hero text.png"
              alt="AgroRent Logo"
              className="max-w-full h-auto mx-auto drop-shadow-2xl"
              style={{ maxWidth: '570px' }}
            />
          </div>

          {/* Tagline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-12 drop-shadow-lg tracking-wide">
            Renting made Easy, Farming made Better
          </h2>

          {/* Get Started Button (shown when not logged in) */}
          {!isLoggedIn && (
            <div className="mb-12">
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Static Equipment Cards (shown only when NOT logged in) */}
          {!isLoggedIn && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {/* Rent Equipment Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-white/20 pointer-events-none">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <i className="fas fa-tractor text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rent Equipment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse and rent agricultural equipment from verified owners
                </p>
              </div>

              {/* List Equipment Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-white/20 pointer-events-none">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <i className="fas fa-hand-holding-usd text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">List Equipment</h3>
                <p className="text-gray-600 leading-relaxed">
                  List your equipment and start earning from rentals
                </p>
              </div>
            </div>
          )}

          {/* Functional Buttons (shown only when logged in) */}
          {isLoggedIn && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <button
                onClick={() => window.location.href = '/browse-equipment'}
                className="w-full py-4 px-8 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-lg rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
              >
                <i className="fas fa-tractor"></i>
                <span>Browse Equipment</span>
              </button>
              <button
                onClick={() => window.location.href = '/list-equipment'}
                className="w-full py-4 px-8 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-lg rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
              >
                <i className="fas fa-hand-holding-usd"></i>
                <span>List Your Equipment</span>
              </button>
            </div>
          )}

          {/* Trust & Engagement Section */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white/90 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="font-medium">100+ verified owners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">🔒</span>
              <span className="font-medium">Secure rentals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">🌾</span>
              <span className="font-medium">Serving farmers nationwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Close dropdowns when clicking outside */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
      {showSettingsMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSettingsMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default HomePage;

