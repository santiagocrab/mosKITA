import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const PublicNavbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2">
                <img 
                  src="/logo.png" 
                  alt="mosKITA Logo" 
                  className="w-8 h-8 object-contain logo-hover"
                />
              </div>
              <span className="text-2xl font-bold text-navy group-hover:text-green transition-colors">mosKITA</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/barangays"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/barangays')
                  ? 'bg-navy text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Barangays
            </Link>
            <Link
              to="/report"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/report')
                  ? 'bg-accent-orange text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Report Case
            </Link>
            <Link
              to="/information"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/information')
                  ? 'bg-navy text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Information
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/barangays"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Barangays
            </Link>
            <Link
              to="/report"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Report Case
            </Link>
            <Link
              to="/information"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Information
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default PublicNavbar
