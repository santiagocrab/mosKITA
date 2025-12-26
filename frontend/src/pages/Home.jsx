import { Link } from 'react-router-dom'
import { getBarangays } from '../services/api'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import BarangayHeatmap from '../components/BarangayHeatmap'
import { getCurrentWeather } from '../services/weather'

const Home = () => {
  const [barangays, setBarangays] = useState([])
  const [weather, setWeather] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [riskAlerts, setRiskAlerts] = useState([
    { barangay: 'Peñafrancia', risk: 'Moderate', time: '2 mins ago' },
    { barangay: 'Concepcion Grande', risk: 'Low', time: '5 mins ago' },
    { barangay: 'Cararayan', risk: 'High', time: '8 mins ago' },
  ])
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })

  useEffect(() => {
    getBarangays().then(setBarangays).catch(console.error)
    getCurrentWeather().then(setWeather).catch(console.error)
    
    // Rotate risk alerts
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % riskAlerts.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-dark text-light' : 'bg-light'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-navy-50 via-green-50 to-light py-20"
      >
        {/* Animated Background - Naga Skyline */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          >
            {/* Simple skyline illustration using CSS */}
            <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path
                d="M0,200 L0,150 L50,140 L100,160 L150,120 L200,150 L250,130 L300,160 L350,110 L400,140 L450,120 L500,150 L550,100 L600,140 L650,130 L700,150 L750,110 L800,140 L850,120 L900,150 L950,100 L1000,140 L1050,130 L1100,150 L1150,120 L1200,140 L1200,200 Z"
                fill="currentColor"
                className="text-navy-300"
              />
            </svg>
          </motion.div>
          
          {/* Floating mosquitoes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={floatAnimation}
              transition={{ delay: i * 0.5 }}
            >
              🦟
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center"
          >
            {/* Logo and Title */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <motion.img
                src="/logo.png"
                alt="mosKITA Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.h1
                className="text-6xl md:text-7xl font-heading font-bold text-navy"
                variants={fadeInUp}
              >
                mosKITA
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-2xl md:text-3xl font-heading font-semibold text-navy mb-4"
              variants={fadeInUp}
            >
              🦟 Outsmart the Bite Before It Strikes
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Forecasting danger, one barangay at a time. Real-time climate intelligence, localized for Naga City.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              variants={fadeInUp}
            >
              <Link
                to="/barangays"
                className="px-8 py-4 bg-green text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>📍</span>
                Check Risk in My Barangay
              </Link>
              <Link
                to="/report"
                className="px-8 py-4 bg-accent-orange text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-accent-orange/90 transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>📝</span>
                Report Dengue Case
              </Link>
            </motion.div>

            {/* Weather Display */}
            {weather && (
              <motion.div
                variants={fadeInUp}
                className="inline-block bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border-2 border-green-200"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{weather.condition === 'Clear' ? '☀️' : weather.condition === 'Rain' ? '🌧️' : '☁️'}</div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-navy">{weather.temperature}°C</div>
                    <div className="text-sm text-gray-600">{weather.condition} • {weather.humidity}% humidity</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Real-time Risk Alerts Ticker */}
      <section className="bg-navy text-white py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="font-bold text-accent-yellow flex-shrink-0">🚨 Latest Risk Alerts in Naga City:</span>
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAlertIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    riskAlerts[currentAlertIndex].risk === 'High' ? 'bg-red-500' :
                    riskAlerts[currentAlertIndex].risk === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {riskAlerts[currentAlertIndex].risk}
                  </span>
                  <span className="font-semibold">{riskAlerts[currentAlertIndex].barangay}</span>
                  <span className="text-gray-300 text-sm">• {riskAlerts[currentAlertIndex].time}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* How mosKITA Works Infographic */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-heading font-bold text-center text-navy mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How mosKITA Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🌡️', title: 'Climate Data', desc: 'Real-time weather monitoring' },
              { icon: '🤖', title: 'AI Analysis', desc: 'Machine learning predictions' },
              { icon: '📊', title: 'Risk Assessment', desc: '7-day forecast generation' },
              { icon: '📱', title: 'Community Alerts', desc: 'Instant notifications' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="text-center bg-white rounded-xl p-6 shadow-lg border-2 border-green-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-heading font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Insights Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-heading font-bold text-center text-navy mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            🗺️ Real-time insights that help communities prepare, respond, and stay safe.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-xl border-2 border-green-200"
          >
            <BarangayHeatmap />
          </motion.div>
        </div>
      </section>

      {/* Barangay Cards */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-heading font-bold text-center text-navy mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Monitor Your Barangay
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {['Peñafrancia', 'Concepcion Grande', 'Cararayan', 'Calauag', 'San Felipe'].map((barangay, i) => {
              const slug = barangay.toLowerCase().replace(/\s+/g, '-').replace(/ñ/g, 'n')
              return (
                <motion.div
                  key={barangay}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link
                    to={`/${slug}`}
                    className="block bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-center"
                  >
                    <div className="text-4xl mb-4">🏘️</div>
                    <h3 className="text-lg font-heading font-bold text-navy mb-2">{barangay}</h3>
                    <p className="text-sm text-gray-600">View Risk Forecast</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
