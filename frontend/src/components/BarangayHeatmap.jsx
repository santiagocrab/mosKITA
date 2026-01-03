import { MapContainer, TileLayer, Circle, Polygon, Popup, Tooltip, useMap } from 'react-leaflet'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaThermometerHalf, FaTint, FaCloudRain, FaSearch, FaCog, FaCompass, 
  FaTimes, FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaCircle, FaLayerGroup
} from 'react-icons/fa'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getAllBarangayPredictions } from '../services/api'
import { fetchBarangayBoundaries, getApproximateBoundaries } from '../data/barangayBoundaries'
import { getCurrentWeather } from '../services/weather'

// Fix for default marker icon in React Leaflet
if (typeof window !== 'undefined' && L.Icon && L.Icon.Default) {
  try {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
  } catch (e) {
    // Silently fail if icon fix doesn't work
  }
}

// Naga City center coordinates
const NAGA_CENTER = [13.6192, 123.1814]

// Barangay coordinates (center points)
const BARANGAY_COORDS = {
  'Bagumbayan Norte': [13.6362, 123.1848],
  'Concepcion Grande': [13.6200, 123.2207],
  'Balatas': [13.6304, 123.2010],
  'San Felipe': [13.6415, 123.2041],
  'Tinago': [13.6240, 123.1850],
}

const BARANGAY_NAMES = Object.keys(BARANGAY_COORDS)

// New color scheme - smaller circles
const RISK_COLORS = {
  'Low': {
    fill: '#34A853',
    border: '#2E7D32',
    opacity: 0.6,
    radius: 300, // meters - smaller radius
  },
  'Moderate': {
    fill: '#FBBF24',
    border: '#F59E0B',
    opacity: 0.7,
    radius: 400,
  },
  'Elevated': {
    fill: '#F97316',
    border: '#EA580C',
    opacity: 0.75,
    radius: 500,
  },
  'High': {
    fill: '#EF4444',
    border: '#DC2626',
    opacity: 0.8,
    radius: 600,
  },
  'Unknown': {
    fill: '#9CA3AF',
    border: '#6B7280',
    opacity: 0.5,
    radius: 250,
  },
}

const getRiskColor = (risk, probability = 0) => {
  if (risk === 'High' && probability > 0.6) {
    return RISK_COLORS['High']
  } else if (risk === 'Moderate' && probability > 0.4) {
    return RISK_COLORS['Elevated']
  } else if (risk === 'Moderate') {
    return RISK_COLORS['Moderate']
  } else if (risk === 'Low') {
    return RISK_COLORS['Low']
  }
  return RISK_COLORS['Unknown']
}

// Get barangay route path
const getBarangayPath = (barangay) => {
  const paths = {
    'Bagumbayan Norte': '/bagumbayan-norte',
    'Concepcion Grande': '/concepcion-grande',
    'Tinago': '/tinago',
    'Balatas': '/balatas',
    'San Felipe': '/san-felipe',
  }
  return paths[barangay] || '/barangays'
}

// Compass overlay component
function CompassOverlay() {
  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200">
      <FaCompass className="text-2xl text-primary" />
    </div>
  )
}

const BarangayHeatmap = () => {
  const [barangayRisks, setBarangayRisks] = useState({})
  const [barangayPredictions, setBarangayPredictions] = useState({})
  const [barangayBoundaries, setBarangayBoundaries] = useState({})
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBarangay, setSelectedBarangay] = useState(null)
  const [forecastWindow, setForecastWindow] = useState('today')
  const [showLayerSettings, setShowLayerSettings] = useState(false)
  const [showWeatherOverlay, setShowWeatherOverlay] = useState(false)
  const [showPolygonBoundaries, setShowPolygonBoundaries] = useState(false)
  const [circleMode, setCircleMode] = useState(true)
  const [showLegend, setShowLegend] = useState(true)
  const [showAllBarangays, setShowAllBarangays] = useState(true)
  const [mapInstance, setMapInstance] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showBarangayList, setShowBarangayList] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchBoundaries = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
      
      const boundaries = await Promise.race([
        fetchBarangayBoundaries(),
        timeoutPromise
      ])
      setBarangayBoundaries(boundaries)
    } catch (error) {
      console.error('Error fetching boundaries:', error)
      const approximate = getApproximateBoundaries()
      setBarangayBoundaries(approximate)
    }
  }

  const fetchAllPredictions = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
      
      const predictions = await Promise.race([
        getAllBarangayPredictions(),
        timeoutPromise
      ])
      
      const risks = {}
      const fullPredictions = {}
      
      Object.keys(predictions).forEach(barangay => {
        if (predictions[barangay].full_forecast && predictions[barangay].full_forecast.length > 0) {
          const currentWeek = predictions[barangay].full_forecast[0]
          risks[barangay] = currentWeek.risk
          fullPredictions[barangay] = {
            risk: currentWeek.risk,
            probability: currentWeek.probability,
            forecast: predictions[barangay].full_forecast,
          }
        } else {
          risks[barangay] = 'Low'
          fullPredictions[barangay] = {
            risk: 'Low',
            probability: 0.2,
            forecast: [],
          }
        }
      })
      
      setBarangayRisks(risks)
      setBarangayPredictions(fullPredictions)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fallbackRisks = {}
    const fallbackPredictions = {}
    BARANGAY_NAMES.forEach(barangay => {
      fallbackRisks[barangay] = 'Low'
      fallbackPredictions[barangay] = {
        risk: 'Low',
        probability: 0.2,
        forecast: [],
      }
    })
    setBarangayRisks(fallbackRisks)
    setBarangayPredictions(fallbackPredictions)
    setLoading(false)
    
    fetchAllPredictions()
    fetchBoundaries()
    
    const loadWeather = async () => {
      try {
        const weatherData = await getCurrentWeather()
        setWeather(weatherData)
      } catch (error) {
        console.error('Error loading weather:', error)
      }
    }
    loadWeather()
    
    const interval = setInterval(() => {
      fetchAllPredictions()
      loadWeather()
    }, 300000)

    return () => clearInterval(interval)
  }, [])

  const filteredBarangays = BARANGAY_NAMES.filter(b =>
    b.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayedBarangays = showAllBarangays ? filteredBarangays : filteredBarangays.slice(0, 5)

  const handleBarangaySelect = (barangay) => {
    setSelectedBarangay(barangay)
    setSearchTerm('')
    if (mapInstance && BARANGAY_COORDS[barangay]) {
      const coords = BARANGAY_COORDS[barangay]
      mapInstance.flyTo(coords, 14, { animate: true, duration: 1.5 })
    }
  }

  const handleResetView = () => {
    if (mapInstance) {
      mapInstance.flyTo(NAGA_CENTER, 13, { animate: true, duration: 1 })
    }
    setSelectedBarangay(null)
    setSearchTerm('')
  }

  const MapController = () => {
    const map = useMap()
    useEffect(() => {
      setMapInstance(map)
    }, [map])
    return null
  }

  return (
    <div className="relative w-full h-[700px] md:h-[800px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-white">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-[1000] w-full max-w-sm">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10" />
          <input
            type="text"
            placeholder="Search barangay..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-lg text-gray-900 placeholder-gray-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
          {searchTerm && filteredBarangays.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 max-h-60 overflow-y-auto z-20">
              {filteredBarangays.map((barangay) => (
                <button
                  key={barangay}
                  onClick={() => handleBarangaySelect(barangay)}
                  className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-0"
                >
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="font-semibold text-gray-900">{barangay}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date Picker */}
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <select
          value={forecastWindow}
          onChange={(e) => setForecastWindow(e.target.value)}
          className="bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-lg px-4 py-2 text-sm font-semibold text-gray-900 transition-all"
        >
          <option value="today">Today</option>
          <option value="3day">3-Day Forecast</option>
          <option value="7day">7-Day Forecast</option>
        </select>
      </div>

      {/* Layer Settings Button */}
      <div className="absolute top-20 right-4 z-[1000]">
        <button
          onClick={() => setShowLayerSettings(!showLayerSettings)}
          className="bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-300 hover:border-primary shadow-lg p-3 text-gray-700 hover:text-primary transition-all"
          title="Layer Settings"
        >
          <FaLayerGroup className="text-xl" />
        </button>
      </div>

      {/* Layer Settings Panel */}
      {showLayerSettings && (
        <div className="absolute top-32 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-300 shadow-2xl p-4 min-w-[220px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <FaLayerGroup className="text-primary" />
              Layer Settings
            </h3>
            <button
              onClick={() => setShowLayerSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={circleMode}
                onChange={(e) => setCircleMode(e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Circle Markers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPolygonBoundaries}
                onChange={(e) => setShowPolygonBoundaries(e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Polygon Boundaries</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showWeatherOverlay}
                onChange={(e) => setShowWeatherOverlay(e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Weather Overlay</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLegend}
                onChange={(e) => setShowLegend(e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Show Legend</span>
            </label>
          </div>
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        center={NAGA_CENTER}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <MapController />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.9}
        />
        
        {/* Render circles or polygons based on mode */}
        {displayedBarangays.map((barangay) => {
          const prediction = barangayPredictions[barangay] || { risk: 'Low', probability: 0.2 }
          const risk = prediction.risk || 'Low'
          const probability = prediction.probability || 0.2
          const colorScheme = getRiskColor(risk, probability)
          const coords = BARANGAY_COORDS[barangay]
          const boundaries = barangayBoundaries[barangay]
          const isHighRisk = risk === 'High'
          
          if (!coords) return null

          return (
            <div key={barangay}>
              {/* Circle Markers */}
              {circleMode && (
                <>
                  {/* Main Circle */}
                  <Circle
                    center={coords}
                    radius={colorScheme.radius}
                    pathOptions={{
                      color: colorScheme.border,
                      fillColor: colorScheme.fill,
                      fillOpacity: colorScheme.opacity,
                      weight: 3,
                    }}
                    eventHandlers={{
                      mouseover: (e) => {
                        const layer = e.target
                        layer.setStyle({
                          fillOpacity: Math.min(colorScheme.opacity + 0.15, 0.95),
                          weight: 5,
                        })
                      },
                      mouseout: (e) => {
                        const layer = e.target
                        layer.setStyle({
                          fillOpacity: colorScheme.opacity,
                          weight: 3,
                        })
                      },
                    }}
                  >
                  <Tooltip 
                    permanent={false} 
                    direction="center" 
                    className="custom-tooltip-enhanced"
                    opacity={1}
                  >
                    <div className="text-center bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
                      <div className="font-bold text-sm text-gray-900">{barangay}</div>
                      <div className={`text-xs font-semibold mt-1 ${
                        risk === 'High' ? 'text-red-600' :
                        risk === 'Moderate' || risk === 'Elevated' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {risk} Risk
                      </div>
                    </div>
                  </Tooltip>
                  <Popup className="custom-popup-enhanced">
                    <div className="p-4 min-w-[280px]">
                      <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />
                        {barangay}
                      </h3>
                      <div className={`inline-flex items-center px-4 py-2 rounded-lg font-bold text-sm mb-3 ${
                        risk === 'High' ? 'bg-red-100 text-red-800 border-2 border-red-300' :
                        risk === 'Moderate' || risk === 'Elevated' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                        'bg-green-100 text-green-800 border-2 border-green-300'
                      }`}>
                        <span className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colorScheme.fill }}
                          />
                          {risk} Risk ({(probability * 100).toFixed(1)}%)
                        </span>
                      </div>
                      {weather && (
                        <div className="space-y-2 border-t border-gray-200 pt-3 mt-3">
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <FaThermometerHalf className="text-red-600" /> 
                            <span className="font-semibold">Temperature:</span>
                            <span className="text-gray-900">{weather.temperature}°C</span>
                          </p>
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <FaTint className="text-blue-600" /> 
                            <span className="font-semibold">Humidity:</span>
                            <span className="text-gray-900">{weather.humidity}%</span>
                          </p>
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <FaCloudRain className="text-blue-500" /> 
                            <span className="font-semibold">Rainfall:</span>
                            <span className="text-gray-900">{weather.rainfall}mm</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                            Last updated: {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      )}
                      <Link
                        to={getBarangayPath(barangay)}
                        className="mt-4 block w-full text-center bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-all"
                      >
                        View Details →
                      </Link>
                    </div>
                  </Popup>
                  </Circle>
                </>
              )}

              {/* Polygon Boundaries (optional, light outline only) */}
              {showPolygonBoundaries && boundaries && boundaries.length > 0 && (
                <Polygon
                  positions={boundaries}
                  pathOptions={{
                    color: '#6B7280',
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    weight: 2,
                    dashArray: '5, 5',
                  }}
                />
              )}
            </div>
          )
        })}
      </MapContainer>

      {/* Reset View Button */}
      <div className="absolute bottom-20 right-4 z-[1000]">
        <button
          onClick={handleResetView}
          className="bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-300 hover:border-primary shadow-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-all flex items-center gap-2"
        >
          Reset View
        </button>
      </div>

      {/* Compass Overlay */}
      <CompassOverlay />

      {/* Enhanced Legend - Responsive */}
      {showLegend && (
        <>
          {/* Desktop/Tablet Legend */}
          <div className="hidden md:block absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-300 shadow-2xl p-4 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaCircle className="text-primary" />
                Risk Levels
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAllBarangays}
                  onChange={(e) => setShowAllBarangays(e.target.checked)}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-xs font-medium text-gray-700">Show All</span>
              </label>
            </div>
            <div className="space-y-2">
              {Object.entries(RISK_COLORS).filter(([key]) => key !== 'Unknown').map(([risk, colors]) => (
                <div key={risk} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2"
                    style={{ 
                      backgroundColor: colors.fill,
                      borderColor: colors.border,
                      opacity: colors.opacity,
                    }}
                  />
                  <span className="text-sm font-semibold text-gray-700">{risk} Risk</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Legend Drawer */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-t-2 border-gray-300 shadow-2xl">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="w-full px-4 py-3 flex items-center justify-between text-gray-900 font-semibold"
            >
              <span className="flex items-center gap-2">
                <FaCircle className="text-primary" />
                Risk Levels
              </span>
              {showLegend ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            {showLegend && (
              <div className="px-4 pb-4 space-y-2 max-h-60 overflow-y-auto">
                <label className="flex items-center gap-2 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={showAllBarangays}
                    onChange={(e) => setShowAllBarangays(e.target.checked)}
                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Show All Barangays</span>
                </label>
                {Object.entries(RISK_COLORS).filter(([key]) => key !== 'Unknown').map(([risk, colors]) => (
                  <div key={risk} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: colors.fill,
                        borderColor: colors.border,
                        opacity: colors.opacity,
                      }}
                    />
                    <span className="text-sm font-semibold text-gray-700">{risk} Risk</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile Barangay List Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setShowBarangayList(!showBarangayList)}
          className="md:hidden fixed bottom-4 right-4 z-[1000] bg-primary text-white rounded-full p-4 shadow-2xl hover:bg-primary-600 transition-all transform hover:scale-110 flex items-center gap-2 group"
          aria-label="Toggle Barangay List"
        >
          <FaMapMarkerAlt className="text-xl" />
          <span className="font-semibold text-sm hidden sm:inline">
            {showBarangayList ? 'Hide' : 'Show'} Barangays
          </span>
          {showBarangayList ? (
            <FaChevronDown className="text-lg transition-transform group-hover:translate-y-1" />
          ) : (
            <FaChevronUp className="text-lg transition-transform group-hover:-translate-y-1" />
          )}
        </button>
      )}

      {/* Mobile Barangay List (popup drawer) */}
      {isMobile && (
        <div 
          className={`md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/98 backdrop-blur-md border-t-2 border-gray-300 shadow-2xl transition-all duration-300 ease-in-out ${
            showBarangayList 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          style={{ maxHeight: '50vh' }}
        >
          {/* Header with close button */}
          <div className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-between sticky top-0 bg-white/98 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FaMapMarkerAlt className="text-primary text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Barangays</h3>
                <p className="text-xs text-gray-500">{displayedBarangays.length} locations</p>
              </div>
            </div>
            <button
              onClick={() => setShowBarangayList(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Scrollable list */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(50vh - 80px)' }}>
            <div className="divide-y divide-gray-100">
              {displayedBarangays.map((barangay) => {
                const prediction = barangayPredictions[barangay] || { risk: 'Low', probability: 0.2 }
                const risk = prediction.risk || 'Low'
                const colorScheme = getRiskColor(risk, prediction.probability)
                
                return (
                  <Link
                    key={barangay}
                    to={getBarangayPath(barangay)}
                    onClick={() => setShowBarangayList(false)}
                    className="block px-4 py-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all active:bg-primary/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div 
                          className="w-5 h-5 rounded-full border-2 flex-shrink-0 shadow-sm"
                          style={{ 
                            backgroundColor: colorScheme.fill,
                            borderColor: colorScheme.border,
                          }}
                        />
                        <span className="font-semibold text-gray-900 text-base">{barangay}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
                          risk === 'High' ? 'bg-red-100 text-red-800 border border-red-200' :
                          risk === 'Moderate' || risk === 'Elevated' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {risk}
                        </span>
                        <FaChevronUp className="text-gray-400 text-xs transform -rotate-90" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BarangayHeatmap
