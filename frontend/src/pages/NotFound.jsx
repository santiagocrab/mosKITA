import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBug, FaHome, FaMapMarkerAlt } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-light via-green-50 to-light flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-6 flex justify-center"
        >
          <FaBug className="text-8xl text-primary" />
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl font-heading font-bold text-navy mb-4">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
          You got lost. Don't worry, we'll find your barangay!
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist. But don't worry - we'll help you get back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-green text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all"
          >
            <span className="flex items-center gap-2">
              <FaHome /> Go Home
            </span>
          </Link>
          <Link
            to="/barangays"
            className="px-8 py-4 bg-navy text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-navy-600 transform hover:scale-105 transition-all"
          >
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt /> Find Your Barangay
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound

