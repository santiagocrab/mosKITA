import { MapContainer, TileLayer, Polygon, Popup, Tooltip } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getAllBarangayPredictions } from '../services/api'
import { fetchBarangayBoundaries, getBarangayCentroids, getApproximateBoundaries } from '../data/barangayBoundaries'

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

// Barangay names for Naga City
const BARANGAY_NAMES = [
  'Bagumbayan Norte',
  'Concepcion Grande',
  'Tinago',
  'Balatas',
  'San Felipe',
]

const getRiskColor = (risk) => {
  switch (risk) {
    case 'High':
      return '#ef4444' // red-500
    case 'Moderate':
      return '#f59e0b' // amber-500
    case 'Low':
      return '#10b981' // emerald-500
    default:
      return '#6b7280' // gray-500
  }
}

const getRiskOpacity = (risk) => {
  switch (risk) {
    case 'High':
      return 0.7
    case 'Moderate':
      return 0.5
    case 'Low':
      return 0.3
    default:
      return 0.2
  }
}

const BarangayHeatmap = () => {
  const [barangayRisks, setBarangayRisks] = useState({})
  const [barangayBoundaries, setBarangayBoundaries] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingBoundaries, setLoadingBoundaries] = useState(true)

  const fetchBoundaries = async () => {
    try {
      // Add timeout to prevent hanging on slow API
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
      // Keep approximate boundaries on error
    }
  }

  const fetchAllPredictions = async () => {
    try {
      // Don't set loading - keep showing fallback data
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
      
      // This now uses the same weather data as barangay pages
      const predictions = await Promise.race([
        getAllBarangayPredictions(),
        timeoutPromise
      ])
      
      const risks = {}
      
      // Get current week's risk for each barangay
      Object.keys(predictions).forEach(barangay => {
        if (predictions[barangay].full_forecast && predictions[barangay].full_forecast.length > 0) {
          risks[barangay] = predictions[barangay].full_forecast[0].risk
        } else {
          risks[barangay] = 'Low' // Default to Low instead of Unknown
        }
      })
      
      setBarangayRisks(risks)
    } catch (error) {
      console.error('Error fetching predictions:', error)
      // Keep fallback data on error
    }
  }

  useEffect(() => {
    // Set fallback data immediately for fast initial render
    const fallbackBoundaries = getApproximateBoundaries()
    setBarangayBoundaries(fallbackBoundaries)
    setLoadingBoundaries(false)
    
    // Set fallback risks immediately
    const fallbackRisks = {}
    BARANGAY_NAMES.forEach(barangay => {
      fallbackRisks[barangay] = 'Low'
    })
    setBarangayRisks(fallbackRisks)
    setLoading(false)
    
    // Load real data in background (non-blocking)
    fetchAllPredictions()
    fetchBoundaries()
    
    // Refresh predictions when weather updates (every 5 minutes like barangay pages)
    const interval = setInterval(() => {
      fetchAllPredictions()
    }, 300000) // 5 minutes, same as barangay pages

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
      {/* Always show map - no loading state blocking render */}
      {Object.keys(barangayBoundaries).length === 0 ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading map...</p>
          </div>
        </div>
      ) : (
        <MapContainer
          center={NAGA_CENTER}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {BARANGAY_NAMES.map((barangay) => {
            const risk = barangayRisks[barangay] || 'Unknown'
            const fillColor = getRiskColor(risk)
            const fillOpacity = getRiskOpacity(risk)
            const boundaries = barangayBoundaries[barangay]
            
            if (!boundaries || boundaries.length === 0) {
              return null
            }
            
            return (
              <Polygon
                key={barangay}
                positions={boundaries}
                pathOptions={{
                  color: fillColor,
                  fillColor: fillColor,
                  fillOpacity: fillOpacity,
                  weight: 3,
                }}
              >
                <Tooltip permanent direction="center" className="custom-tooltip">
                  <div className="text-center">
                    <div className="font-bold text-sm">{barangay}</div>
                    <div className={`text-xs font-semibold ${
                      risk === 'High' ? 'text-red-600' :
                      risk === 'Moderate' ? 'text-yellow-600' :
                      risk === 'Low' ? 'text-green-600' :
                      'text-gray-600'
                    }`}>
                      {risk} Risk
                    </div>
                  </div>
                </Tooltip>
                <Popup className="bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg">
                  <div className="text-center p-3 min-w-[200px]">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{barangay}</h3>
                    <div className={`inline-flex items-center px-4 py-2 rounded-lg font-bold text-sm mb-2 ${
                      risk === 'High' ? 'bg-red-100 text-red-800' :
                      risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      risk === 'Low' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {risk === 'High' ? '🔴' : risk === 'Moderate' ? '🟠' : risk === 'Low' ? '🟢' : '⚪'} {risk} Risk
                    </div>
                    <div className="text-xs text-gray-500 mt-2 space-y-1">
                      <p>⚠️ No case data in public</p>
                      <p>Temperature: --°C</p>
                      <p>Humidity: --%</p>
                      <p>Rainfall: --mm</p>
                    </div>
                  </div>
                </Popup>
              </Polygon>
            )
          })}
        </MapContainer>
      )}
    </div>
  )
}

export default BarangayHeatmap
