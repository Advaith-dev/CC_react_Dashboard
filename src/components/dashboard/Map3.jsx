import { useEffect, useRef, useState } from 'react'

function Maps () {
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch location data
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/location')
        if (!response.ok) throw new Error('Failed to fetch locations')
        const data = await response.json()
        setLocations(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching locations:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchLocations, 30000)
    return () => clearInterval(interval)
  }, [])

  // Initialize map and handle markers
  useEffect(() => {
    const initMap = async () => {
      if (!window.olaMaps || mapRef.current) return

      try {
        // Initialize map
        mapRef.current = window.olaMaps.init({
          style:
            'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
          container: 'map2',
          center: [76.8220416, 9.528],
          zoom: 17
        })

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []

        // Add markers for each location
        locations.forEach(location => {
          if (!location.lat || !location.long) return

          try {
            const marker = window.olaMaps
              .addMarker({
                offset: [0, 6],
                anchor: 'bottom',
                color: '#2DCE89',
                draggable: false
              })
              .setLngLat([parseFloat(location.long), parseFloat(location.lat)])

            // Add popup
            const popup = window.olaMaps.addPopup({
              offset: [0, -30],
              anchor: 'bottom'
            }).setHTML(`
                <div class="p-3 min-w-[200px]">
                  <h3 class="font-semibold mb-2">Bin Details</h3>
                  <p class="text-sm"><span class="font-medium">ID:</span> ${
                    location.id
                  }</p>
                  <p class="text-sm"><span class="font-medium">Name:</span> ${
                    location.name || 'N/A'
                  }</p>
                  <p class="text-sm"><span class="font-medium">Added:</span> ${new Date(
                    location.timestamp
                  ).toLocaleString()}</p>
                </div>
              `)

            marker.setPopup(popup)
            marker.addTo(mapRef.current)
            markersRef.current.push(marker)
          } catch (err) {
            console.error('Error adding marker:', err)
          }
        })
      } catch (err) {
        console.error('Map initialization error:', err)
        setError('Failed to initialize map')
      }
    }

    if (!isLoading) {
      initMap()
    }

    return () => {
      if (mapRef.current) {
        markersRef.current.forEach(marker => marker.remove())
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [locations, isLoading])

  return (
    <div className='relative w-full h-full'>
      <div id='map2' className='w-full h-[400px] rounded-lg' />
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100/80 rounded-lg'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500' />
        </div>
      )}
      {error && (
        <div className='absolute inset-x-0 bottom-4 mx-auto max-w-sm'>
          <div className='bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center'>
            {error}
          </div>
        </div>
      )}
    </div>
  )
}

export default Maps
