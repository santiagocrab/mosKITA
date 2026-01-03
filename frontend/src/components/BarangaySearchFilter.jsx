import { useState } from 'react'
import { motion } from 'framer-motion'

const BarangaySearchFilter = ({ 
  barangays = [], 
  selectedBarangay, 
  onBarangayChange,
  selectedDate,
  onDateChange,
  weatherParam,
  onWeatherParamChange,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredBarangays = barangays.filter(b =>
    b.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBarangaySelect = (barangay) => {
    setSearchQuery(barangay)
    setShowSuggestions(false)
    if (onBarangayChange) {
      onBarangayChange(barangay)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200 mb-6">
      <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">🔎 Search & Filter</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Barangay
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for barangay..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-200 transition-all"
          />
          {showSuggestions && filteredBarangays.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            >
              {filteredBarangays.map((barangay) => (
                <button
                  key={barangay}
                  type="button"
                  onClick={() => handleBarangaySelect(barangay)}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors text-gray-700"
                >
                  {barangay}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange && onDateChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-200 transition-all"
          />
        </div>

        {/* Weather Parameter Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Weather Parameter
          </label>
          <select
            value={weatherParam}
            onChange={(e) => onWeatherParamChange && onWeatherParamChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-200 transition-all"
          >
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="rainfall">Rainfall</option>
          </select>
        </div>
      </div>

      {onSearch && (
        <button
          onClick={onSearch}
          className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all transform hover:scale-105"
        >
          Apply Filters
        </button>
      )}
    </div>
  )
}

export default BarangaySearchFilter

