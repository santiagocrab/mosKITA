import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BarangayHeatmap from '../components/BarangayHeatmap'
import RiskChart from '../components/RiskChart'
import { getWeeklyPredictions } from '../services/api'

const Home = () => {
  const [selectedBarangay, setSelectedBarangay] = useState('Bagumbayan Norte')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)

  const barangays = ['Bagumbayan Norte', 'Concepcion Grande', 'Tinago', 'Balatas']

  // Use fallback data immediately, then load real data in background
  useEffect(() => {
    // Set fallback data immediately for fast initial render
    const startDate = new Date(selectedDate)
    const fallbackData = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      fallbackData.push({
        week: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        risk: i < 3 ? 'Low' : i < 5 ? 'Moderate' : 'High',
        probability: i < 3 ? 0.15 : i < 5 ? 0.45 : 0.65
      })
    }
    setForecast(fallbackData)
    setLoading(false)

    // Load real data in background (non-blocking)
    loadForecast()
  }, [selectedBarangay, selectedDate])

  const loadForecast = async () => {
    try {
      const data = await getWeeklyPredictions(selectedBarangay, selectedDate)
      // Transform data to match chart format
      const weeklyData = []
      const startDate = new Date(selectedDate)
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        const dateKey = date.toISOString().split('T')[0]
        const risk = data.weekly_predictions?.[dateKey] || 'Low'
        weeklyData.push({
          week: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          risk: risk,
          probability: risk === 'High' ? 0.65 : risk === 'Moderate' ? 0.45 : 0.15
        })
      }
      setForecast(weeklyData)
    } catch (error) {
      console.error('Error loading forecast:', error)
      // Keep fallback data on error
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-light">
      {/* Header Section with Background */}
      <section className="relative overflow-hidden">
        {/* Background Image - User will upload */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/background.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/logo.png" 
              alt="mosKITA Logo" 
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy">
              mosKITA
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-heading font-semibold text-center text-navy mb-2">
            🦟 Outsmart the Bite Before It Strikes
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-center text-gray-600 mb-8">
            Forecasting danger, one barangay at a time. Real-time climate intelligence, localized for Naga City.
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search for barangay..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 text-lg"
              />
            </div>

            {/* Date Filter */}
            <button className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-green-500 flex items-center gap-2 text-gray-700 font-medium">
              Today
              <span className="text-gray-400">▼</span>
            </button>

            {/* Filter Button */}
            <button className="px-6 py-3 bg-green text-white rounded-lg font-semibold hover:bg-green-600 flex items-center gap-2">
              <span>🔄</span>
              Filter
            </button>

            {/* Settings Icon */}
            <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-green-500 text-gray-700">
              ⚙️
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Insights Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-navy mb-6 flex items-center gap-2">
            🗺️ Real-time insights that help communities prepare, respond, and stay safe.
          </h2>

          {/* Map Container */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-4">
            <BarangayHeatmap />
          </div>

          {/* Risk Legend */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-700">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Moderate-High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-700">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">Low Risk</span>
            </div>
          </div>

          {/* Last Updated */}
          <p className="text-sm text-gray-600">Last updated: a few minutes ago</p>
        </div>
      </section>

      {/* Barangay Dengue Trends Section */}
      <section className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-navy mb-6 flex items-center gap-2">
            📊 Barangay Dengue Trends
          </h2>

          {/* Barangay Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {barangays.map((barangay) => (
              <button
                key={barangay}
                onClick={() => setSelectedBarangay(barangay)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedBarangay === barangay
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {barangay}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-4">
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              </div>
            ) : (
              <RiskChart forecast={forecast} type="line" />
            )}
          </div>

          {/* Graph Description */}
          <p className="text-sm text-gray-600">
            7-Day Forecast showing estimated dengue risk probability. Use these insights to plan and protect your community.
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Barangay Monitored Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 text-center"
            >
              <div className="text-4xl mb-3">🏘️</div>
              <div className="text-4xl font-bold text-navy mb-2">5</div>
              <div className="text-sm text-gray-600 font-medium">Barangay Monitored</div>
            </motion.div>

            {/* Active Weather Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 text-center"
            >
              <div className="text-4xl mb-3">⚠️</div>
              <div className="text-4xl font-bold text-red-600 mb-2">2</div>
              <div className="text-sm text-gray-600 font-medium">Active Weather Alerts</div>
            </motion.div>

            {/* Recent Forecasts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200 text-center"
            >
              <div className="text-4xl mb-3">📅</div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">5</div>
              <div className="text-sm text-gray-600 font-medium">Recent Forecasts</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
