import { Link } from 'react-router-dom'
import { getBarangays } from '../services/api'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import MiniHeatmap from '../components/MiniHeatmap'
import AIInsightCard from '../components/AIInsightCard'
import AnalyticsCards from '../components/AnalyticsCards'
import ForecastSlider from '../components/ForecastSlider'
import TipsCarousel from '../components/TipsCarousel'
import { getCurrentWeather } from '../services/weather'

const Home = () => {
  const [barangays, setBarangays] = useState([])
  const [weather, setWeather] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [theme, setTheme] = useState('default')
  const [barangayCount, setBarangayCount] = useState(0)
  const [weatherAlerts, setWeatherAlerts] = useState(0)
  const [recentForecasts, setRecentForecasts] = useState(0)
  
  const heroRef = useRef(null)
  const heatmapRef = useRef(null)
  const tilesRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isHeatmapInView = useInView(heatmapRef, { once: true, amount: 0.3 })
  const isTilesInView = useInView(tilesRef, { once: true, amount: 0.3 })

  useEffect(() => {
    getBarangays().then((data) => {
      setBarangays(data)
      setBarangayCount(data.length)
    }).catch(console.error)
    
    // Load weather for theming
    getCurrentWeather().then((data) => {
      setWeather(data)
      setLastUpdate(new Date())
      
      // Set theme based on weather
      if (data.condition === 'Rain' || data.rainfall > 20) {
        setTheme('rainy')
        setWeatherAlerts(1)
      } else if (data.condition === 'Clear' && data.temperature > 30) {
        setTheme('sunny')
        setWeatherAlerts(0)
      } else if (data.condition === 'Clouds') {
        setTheme('cloudy')
        setWeatherAlerts(0)
      } else {
        setTheme('default')
        setWeatherAlerts(0)
      }
      
      // Simulate recent forecasts count
      setRecentForecasts(5)
    })
  }, [])

  const handleRefresh = async () => {
    const data = await getCurrentWeather()
    setWeather(data)
    setLastUpdate(new Date())
  }

  const formatTime = (date) => {
    if (!date) return ''
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Theme-based background gradients
  const getThemeGradient = () => {
    switch (theme) {
      case 'sunny':
        return 'bg-gradient-to-b from-yellow-50 via-orange-50 to-support-gray'
      case 'rainy':
        return 'bg-gradient-to-b from-blue-50 via-gray-50 to-support-gray'
      case 'cloudy':
        return 'bg-gradient-to-b from-gray-50 to-support-gray'
      default:
        return 'bg-gradient-to-b from-primary-50 via-support-gray to-white'
    }
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className={`min-h-screen pt-20 ${getThemeGradient()} animate-fade-in transition-colors duration-500 relative overflow-hidden`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-300 rounded-full animate-float opacity-30" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent-300 rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-support-lime rounded-full animate-float opacity-25" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-primary-200 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.img 
              src="/logo.png" 
              alt="mosKITA Logo" 
              className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1 
              className="text-5xl md:text-6xl font-heading font-bold text-gray-900"
              variants={fadeInUp}
            >
              mosKITA
            </motion.h1>
          </div>
          <motion.p 
            className="text-xl md:text-2xl text-primary-700 font-semibold mb-2"
            variants={fadeInUp}
          >
            🦟 Outsmart the Bite Before It Strikes
          </motion.p>
          <motion.p 
            className="text-gray-600 text-lg"
            variants={fadeInUp}
          >
            Real-time dengue risk prediction for Naga City
          </motion.p>
        </motion.div>

        {/* Animated Tiles */}
        <motion.div 
          ref={tilesRef}
          initial="hidden"
          animate={isTilesInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <motion.div 
            variants={scaleIn}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200 hover:border-primary-400 transition-all"
          >
            <div className="text-3xl mb-2">🏘️</div>
            <div className="text-3xl font-bold text-primary mb-1">{barangayCount}</div>
            <div className="text-sm text-gray-600">Barangays Monitored</div>
          </motion.div>
          <motion.div 
            variants={scaleIn}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-accent-200 hover:border-accent-400 transition-all"
          >
            <div className="text-3xl mb-2">🌡️</div>
            <div className="text-3xl font-bold text-accent mb-1">{weatherAlerts}</div>
            <div className="text-sm text-gray-600">Weather Alerts</div>
          </motion.div>
          <motion.div 
            variants={scaleIn}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-support-lime hover:border-support-lime/80 transition-all"
          >
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-support-lime mb-1">{recentForecasts}</div>
            <div className="text-sm text-gray-600">Recent Forecasts</div>
          </motion.div>
        </motion.div>

        {/* Top Row: Weather Card and AI Insight */}
        <motion.div 
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          <motion.div variants={fadeInUp}>
            <WeatherCard />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <AIInsightCard />
          </motion.div>
        </motion.div>

        {/* Analytics Cards */}
        <motion.div
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <AnalyticsCards />
        </motion.div>

        {/* Interactive Heatmap */}
        <motion.div 
          ref={heatmapRef}
          initial="hidden"
          animate={isHeatmapInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mb-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">🗺️ Real-time insights that help communities prepare, respond, and stay safe.</h3>
            <MiniHeatmap />
          </div>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial="hidden"
          animate={isHeatmapInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mb-6"
        >
          <ForecastSlider />
        </motion.div>

        {/* Last Updated + Refresh Button */}
        <motion.div 
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200"
        >
          <div className="text-sm text-gray-600">
            {lastUpdate ? (
              <>Last updated: <span className="font-semibold">{formatTime(lastUpdate)}</span></>
            ) : (
              'Loading...'
            )}
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-all transform hover:scale-105"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </motion.div>

        {/* Did You Know Carousel */}
        <motion.div
          initial="hidden"
          animate={isHeatmapInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mb-12"
        >
          <TipsCarousel />
        </motion.div>

        {/* Barangays Grid */}
        <motion.div 
          initial="hidden"
          animate={isTilesInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {barangays.map((barangay, index) => {
            const slug = barangay.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
            const path = `/${slug}`
            
            return (
              <motion.div
                key={barangay}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={path}
                  className="block bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-primary transition-all card-hover"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏘️</div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{barangay}</h3>
                    <p className="text-gray-600 text-sm">View Risk Forecast</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div 
          initial="hidden"
          animate={isTilesInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={scaleIn} className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
            <div className="text-3xl mb-3">🔴</div>
            <h3 className="text-lg font-heading font-bold text-red-900 mb-2">High Risk</h3>
            <p className="text-red-700 text-sm">Greater than 60% outbreak probability</p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
            <div className="text-3xl mb-3">🟡</div>
            <h3 className="text-lg font-heading font-bold text-yellow-900 mb-2">Moderate Risk</h3>
            <p className="text-yellow-700 text-sm">30-60% outbreak probability</p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <div className="text-3xl mb-3">🟢</div>
            <h3 className="text-lg font-heading font-bold text-green-900 mb-2">Low Risk</h3>
            <p className="text-green-700 text-sm">Less than 30% outbreak probability</p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial="hidden"
          animate={isTilesInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border-2 border-primary-200"
        >
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Stay Informed, Stay Safe</h2>
          <p className="text-gray-700 mb-6">
            Check your barangay's dengue risk forecast and report any cases or symptoms you observe.
          </p>
          <Link
            to="/information"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-primary-600 transition-all transform hover:scale-105"
          >
            Learn More About Dengue
          </Link>
        </motion.div>

        {/* Mock User Testimonials */}
        <motion.div 
          initial="hidden"
          animate={isTilesInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={scaleIn} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-700 mb-3">"mosKITA helps us prepare better for dengue season. The forecasts are accurate!"</p>
            <p className="text-sm font-semibold text-gray-900">- Maria S., Barangay Health Worker</p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-700 mb-3">"Real-time weather data makes all the difference. Great tool for our community!"</p>
            <p className="text-sm font-semibold text-gray-900">- Juan D., Community Leader</p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-700 mb-3">"Easy to use and very informative. Helps us stay one step ahead!"</p>
            <p className="text-sm font-semibold text-gray-900">- Ana L., Resident</p>
          </motion.div>
        </motion.div>

        {/* Important Warning */}
        <motion.div 
          initial="hidden"
          animate={isTilesInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mt-12 text-center bg-red-50 rounded-xl p-6 border-2 border-red-300"
        >
          <p className="text-lg font-semibold text-red-900 leading-relaxed">
            ⚠️ Dengue is dangerous and can be fatal if not addressed immediately. When left untreated, it can lead to internal bleeding, shock, and other severe complications.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
