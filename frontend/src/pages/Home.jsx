import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaBug, 
  FaSearch, 
  FaFilter, 
  FaCog, 
  FaMapMarkerAlt, 
  FaSyncAlt, 
  FaChartLine,
  FaCity,
  FaExclamationTriangle,
  FaChartBar
} from 'react-icons/fa'
import BarangayHeatmap from '../components/BarangayHeatmap'
import RiskChart from '../components/RiskChart'
import { getWeeklyPredictions } from '../services/api'

const Home = () => {
  const [selectedBarangay, setSelectedBarangay] = useState('Bagumbayan Norte')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const barangays = ['Bagumbayan Norte', 'Concepcion Grande', 'Tinago', 'Balatas']

  const loadForecast = async () => {
    try {
      setLoading(true)
      const data = await getWeeklyPredictions(selectedBarangay, selectedDate).catch(err => {
        console.warn('Forecast API error, using fallback:', err)
        return { weekly_predictions: {} }
      })
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
    } finally {
      setLoading(false)
    }
  }

  // Initialize with fallback data immediately for fast render
  useEffect(() => {
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
    
    // Load real data in background (non-blocking)
    loadForecast()
    
    // Update last updated time
    setLastUpdated(new Date())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBarangay, selectedDate])

  // Safety check - ensure forecast is always an array
  const safeForecast = Array.isArray(forecast) && forecast.length > 0 ? forecast : []

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary-100 via-background to-background py-16 md:py-24">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/bg.png)' }}
        ></div>
        
        {/* Sky gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-50/50 via-transparent to-background"></div>
        
        {/* Floating mosquitoes at low opacity */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-5 text-primary"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <FaBug className="text-2xl" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center mb-6"
          >
            <motion.img
              src="/logo.png"
              alt="mosKITA Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-heading font-semibold italic text-center text-primary mb-3 flex items-center justify-center gap-2"
          >
            <FaBug className="text-primary" />
            <span>Outsmart the Bite Before It Strikes</span>
          </motion.p>

          {/* Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center space-y-1 mb-10"
          >
            <p className="text-base md:text-lg text-text/80 font-medium">
              Forecasting danger, one barangay at a time.
            </p>
            <p className="text-base md:text-lg text-text/70 font-normal">
              Real-time climate intelligence, localized for Naga City.
            </p>
          </motion.div>

          {/* Smart Search Bar - Floating Glass Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-secondary-200/50 flex flex-col sm:flex-row gap-3 items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/40 text-lg" />
                <input
                  type="text"
                  placeholder="Search for barangay..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-secondary-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 text-text bg-white/50 transition-all"
                />
              </div>

              {/* Date Filter */}
              <button className="px-5 py-3 border-2 border-secondary-200 rounded-xl hover:border-primary hover:bg-primary/5 flex items-center gap-2 text-text font-medium transition-all whitespace-nowrap">
                Today
                <span className="text-text/40">▼</span>
              </button>

              {/* Filter Button */}
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                <FaFilter />
                Filter
              </button>

              {/* Settings Icon */}
              <button className="p-3 border-2 border-secondary-200 rounded-xl hover:border-primary hover:bg-primary/5 text-text transition-all">
                <FaCog />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Insights Section */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-heading font-bold text-text mb-8 flex items-center gap-3"
          >
            <FaMapMarkerAlt className="text-3xl text-primary" />
            Real-time insights that help communities prepare, respond, and stay safe.
          </motion.h2>

          {/* Interactive Heatmap Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border-2 border-secondary-200 p-6 mb-6 shadow-lg"
          >
            <BarangayHeatmap />
          </motion.div>

          {/* Risk Legend - Clean Pill Style */}
          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-text font-medium">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-accent rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-text font-medium">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-text font-medium">Elevated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-danger rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-text font-medium">High Risk</span>
            </div>
          </div>

          {/* Last Updated Indicator */}
          <div className="flex items-center gap-2 text-sm text-text/60">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-accent"
            >
              <FaSyncAlt />
            </motion.span>
            <span>Last updated: a few minutes ago</span>
          </div>
        </div>
      </section>

      {/* Barangay Dengue Trends Section */}
      <section className="bg-background py-12 border-t border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-heading font-bold text-text mb-8 flex items-center gap-3"
          >
            <FaChartLine className="text-3xl text-primary" />
            Barangay Dengue Trends
          </motion.h2>

          {/* Barangay Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {barangays.map((barangay) => (
              <motion.button
                key={barangay}
                onClick={() => setSelectedBarangay(barangay)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedBarangay === barangay
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-text border-2 border-secondary-200 hover:border-primary hover:bg-primary/5'
                }`}
              >
                {barangay}
              </motion.button>
            ))}
          </div>

          {/* Chart Card */}
          <motion.div
            key={selectedBarangay}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border-2 border-secondary-200 p-6 mb-4 shadow-lg"
          >
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
                    ) : (
                      <RiskChart forecast={safeForecast} type="line" />
                    )}
          </motion.div>

          {/* Graph Description */}
          <p className="text-sm text-text/70 font-normal">
            7-Day Forecast showing estimated dengue risk probability. Use these insights to plan and protect your community.
          </p>
        </div>
      </section>

      {/* Summary KPI Cards */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Barangay Monitored Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-secondary-200 text-center transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4 flex justify-center"
              >
                <FaCity className="text-5xl text-primary" />
              </motion.div>
              <div className="text-5xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-text/70 font-medium">Barangay Monitored</div>
            </motion.div>

            {/* Active Weather Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-danger/30 text-center transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="mb-4 flex justify-center"
              >
                <FaExclamationTriangle className="text-5xl text-danger" />
              </motion.div>
              <div className="text-5xl font-bold text-danger mb-2">2</div>
              <div className="text-sm text-text/70 font-medium">Active Weather Alerts</div>
            </motion.div>

            {/* Recent Forecasts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-accent/30 text-center transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4 flex justify-center"
              >
                <FaChartBar className="text-5xl text-accent" />
              </motion.div>
              <div className="text-5xl font-bold text-accent mb-2">5</div>
              <div className="text-sm text-text/70 font-medium">Recent Forecasts</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
