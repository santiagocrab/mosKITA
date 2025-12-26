import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Barangays = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const allBarangays = [
    'Peñafrancia', 'Concepcion Grande', 'Cararayan', 'Calauag', 'San Felipe',
    'Bagumbayan Norte', 'Tinago', 'Balatas', 'San Francisco', 'Lerma',
    'Pacol', 'Del Rosario', 'Tabuco', 'Igualdad', 'Sabang',
    'Dayangdang', 'Dinaga', 'Triangulo', 'Panicuason', 'Carolina',
    'Mabolo', 'Concepcion Pequeña', 'Sta. Cruz', 'Mabulo', 'Panganiban',
    'San Isidro', 'San Roque'
  ]

  const featuredBarangays = ['Peñafrancia', 'Concepcion Grande', 'Cararayan', 'Calauag', 'San Felipe']

  const filteredBarangays = allBarangays.filter(b =>
    b.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-light via-green-50 to-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
            📍 Barangay Risk Monitoring
          </h1>
          <p className="text-lg text-gray-600">
            Select a barangay to view detailed dengue risk forecasts
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for barangay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 text-lg"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Barangays */}
        {!searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-heading font-bold text-navy mb-6">Featured Barangays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {featuredBarangays.map((barangay, i) => {
                const slug = barangay.toLowerCase().replace(/\s+/g, '-').replace(/ñ/g, 'n')
                return (
                  <motion.div
                    key={barangay}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Link
                      to={`/${slug}`}
                      className="block bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-center"
                    >
                      <div className="text-4xl mb-4">🏘️</div>
                      <h3 className="text-lg font-heading font-bold text-navy mb-2">{barangay}</h3>
                      <p className="text-sm text-gray-600">View Forecast</p>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* All Barangays */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-heading font-bold text-navy mb-6">
            {searchTerm ? `Search Results (${filteredBarangays.length})` : 'All Barangays (27)'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBarangays.map((barangay, i) => {
              const slug = barangay.toLowerCase().replace(/\s+/g, '-').replace(/ñ/g, 'n')
              const isFeatured = featuredBarangays.includes(barangay)
              return (
                <motion.div
                  key={barangay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Link
                    to={`/${slug}`}
                    className={`block bg-white rounded-lg p-4 shadow-md border-2 ${
                      isFeatured 
                        ? 'border-green-400 hover:border-green-500' 
                        : 'border-gray-200 hover:border-green-300'
                    } transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏘️</span>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-navy">{barangay}</h3>
                        {isFeatured && (
                          <span className="text-xs text-green-600 font-semibold">Featured</span>
                        )}
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Barangays

