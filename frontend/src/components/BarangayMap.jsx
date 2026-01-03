import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { FaThermometerHalf, FaTint, FaCloudRain } from 'react-icons/fa'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { fetchBarangayBoundaries, getApproximateBoundaries } from '../data/barangayBoundaries'
import { getCurrentWeather } from '../services/weather'

// Fix for default marker icon in React Leaflet (run once on module load)
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

const getRiskColor = (risk) => {
  switch (risk) {
    case 'High':
      return '#ef4444'
    case 'Moderate':
      return '#f59e0b'
    case 'Low':
      return '#10b981'
    default:
      return '#6b7280'
  }
}

const BarangayMap = ({ barangay, currentRisk }) => {
  const [bounds, setBounds] = useState(null)
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const loadBoundaries = async () => {
      try {
        setLoading(true)
        const boundaries = await fetchBarangayBoundaries()
        if (boundaries[barangay]) {
          setBounds(boundaries[barangay])
        } else {
          // Fallback to approximate
          const approximate = getApproximateBoundaries()
          setBounds(approximate[barangay] || approximate['Bagumbayan Norte'])
        }
      } catch (error) {
        console.error('Error loading boundaries:', error)
        const approximate = getApproximateBoundaries()
        setBounds(approximate[barangay] || approximate['Bagumbayan Norte'])
      } finally {
        setLoading(false)
      }
    }
    loadBoundaries()
    
    // Load weather data
    const loadWeather = async () => {
      try {
        const weatherData = await getCurrentWeather()
        setWeather(weatherData)
      } catch (error) {
        console.error('Error loading weather:', error)
      }
    }
    loadWeather()
  }, [barangay])

  const fillColor = getRiskColor(currentRisk)
  const fillOpacity = 0.5

  if (loading || !bounds) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
      <MapContainer
        center={NAGA_CENTER}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={bounds}
          pathOptions={{
            color: fillColor,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
            weight: 4,
          }}
        >
          <Popup className="bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg">
            <div className="p-3 min-w-[200px]">
              <h3 className="font-bold text-lg text-gray-900 mb-3 text-center">{barangay}</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Risk Level: <span className={`font-bold ${
                    currentRisk === 'High' ? 'text-red-600' :
                    currentRisk === 'Moderate' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>{currentRisk || 'Unknown'}</span>
                </p>
                {weather && (
                  <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                    <p className="text-xs text-gray-700 flex items-center gap-1">
                      <FaThermometerHalf className="text-xs text-red-600" /> 
                      Temperature: <span className="font-semibold">{weather.temperature}°C</span>
                    </p>
                    <p className="text-xs text-gray-700 flex items-center gap-1">
                      <FaTint className="text-xs text-blue-600" /> 
                      Humidity: <span className="font-semibold">{weather.humidity}%</span>
                    </p>
                    <p className="text-xs text-gray-700 flex items-center gap-1">
                      <FaCloudRain className="text-xs text-blue-500" /> 
                      Rainfall: <span className="font-semibold">{weather.rainfall}mm</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  )
}

export default BarangayMap

