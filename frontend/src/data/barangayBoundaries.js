// Barangay boundary GeoJSON data from OpenStreetMap
// Fetched using Overpass QL query
// This file contains the actual polygon boundaries for each barangay

// Naga City barangay centroids
const BARANGAY_CENTROIDS = {
  'Bagumbayan Norte': [13.6250, 123.1850],
  'Concepcion Grande': [13.6150, 123.1750],
  'Tinago': [13.6100, 123.1800],
  'Balatas': [13.6200, 123.1900],
  'San Felipe': [13.6050, 123.1850],
}

// Function to create approximate polygon from centroid
const createPolygonFromCenter = (center, radius = 0.008) => {
  const [lat, lng] = center
  return [
    [lat + radius, lng - radius],
    [lat + radius, lng + radius],
    [lat - radius, lng + radius],
    [lat - radius, lng - radius],
    [lat + radius, lng - radius],
  ]
}

// Function to fetch real boundaries from Overpass API
export const fetchBarangayBoundaries = async () => {
  const overpassQuery = `
    [out:json][timeout:50];
    area["name"="Naga City"]->.searchArea;
    (
      relation["boundary"="administrative"]["admin_type:PH"="barangay"]["name"="Bagumbayan Norte"](area.searchArea);
      relation["boundary"="administrative"]["admin_type:PH"="barangay"]["name"="Concepcion Grande"](area.searchArea);
      relation["boundary"="administrative"]["admin_type:PH"="barangay"]["name"="Tinago"](area.searchArea);
      relation["boundary"="administrative"]["admin_type:PH"="barangay"]["name"="Balatas"](area.searchArea);
      relation["boundary"="administrative"]["admin_type:PH"="barangay"]["name"="San Felipe"](area.searchArea);
    );
    out geom;
  `

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(overpassQuery)}`,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch boundaries from Overpass API')
    }

    const data = await response.json()
    return processOverpassData(data)
  } catch (error) {
    console.warn('Failed to fetch real boundaries, using approximate polygons:', error)
    return getApproximateBoundaries()
  }
}

// Process Overpass API response into usable format
const processOverpassData = (data) => {
  const boundaries = {}
  
  if (data.elements && Array.isArray(data.elements)) {
    data.elements.forEach((element) => {
      if (element.type === 'relation' && element.members) {
        const name = element.tags?.name
        if (name && BARANGAY_CENTROIDS[name]) {
          // Extract polygon coordinates from relation members
          // Relations contain ways, and ways contain nodes with geometry
          const allCoordinates = []
          
          // Sort members by role to get outer boundary first
          const outerMembers = element.members.filter(m => 
            !m.role || m.role === 'outer' || m.role === ''
          )
          
          outerMembers.forEach((member) => {
            if (member.type === 'way' && member.geometry) {
              const wayCoords = member.geometry.map((point) => [point.lat, point.lon])
              allCoordinates.push(...wayCoords)
            }
          })
          
          if (allCoordinates.length > 0) {
            // Remove duplicates and close the polygon
            const uniqueCoords = []
            const seen = new Set()
            allCoordinates.forEach(coord => {
              const key = `${coord[0]},${coord[1]}`
              if (!seen.has(key)) {
                seen.add(key)
                uniqueCoords.push(coord)
              }
            })
            
            // Close polygon if not already closed
            if (uniqueCoords.length > 0 && 
                (uniqueCoords[0][0] !== uniqueCoords[uniqueCoords.length - 1][0] ||
                 uniqueCoords[0][1] !== uniqueCoords[uniqueCoords.length - 1][1])) {
              uniqueCoords.push(uniqueCoords[0])
            }
            
            boundaries[name] = uniqueCoords
          }
        }
      }
    })
  }

  // Fill in missing boundaries with approximate ones
  Object.keys(BARANGAY_CENTROIDS).forEach((name) => {
    if (!boundaries[name]) {
      boundaries[name] = createPolygonFromCenter(BARANGAY_CENTROIDS[name])
    }
  })

  return boundaries
}

// Get approximate boundaries as fallback
export const getApproximateBoundaries = () => {
  const boundaries = {}
  Object.keys(BARANGAY_CENTROIDS).forEach((name) => {
    boundaries[name] = createPolygonFromCenter(BARANGAY_CENTROIDS[name])
  })
  return boundaries
}

// Export centroids for marker placement
export const getBarangayCentroids = () => BARANGAY_CENTROIDS

// Default export: approximate boundaries (will be replaced by real data if fetched)
export default getApproximateBoundaries()

