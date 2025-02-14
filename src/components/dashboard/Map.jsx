import React, { useEffect, useRef } from 'react'
import { useWasteData } from '../../hooks/useWasteData'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  render () {
    if (this.state.hasError) {
      return <div>Something went wrong with the map.</div>
    }
    return this.props.children
  }
}

const Maps = () => {
  const { tableData, isLoading } = useWasteData()
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const olaMapsRef = useRef(null)

  // Predefined marker locations
  const markerLocations = [
    { id: '123', longitude: 76.8220416, latitude: 9.52876 },
    { id: '002', longitude: 76.821451, latitude: 9.528223 },
    { id: '003', longitude: 76.82238, latitude: 9.527512 },
    { id: '004', longitude: 76.822876, latitude: 9.528128 },
    { id: '005', longitude: 76.82124, latitude: 9.5272 }
  ]

  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (window.OlaMaps) {
          resolve(window.OlaMaps)
          return
        }
        const script = document.createElement('script')
        // Ensure the script source path is correct
        script.src = 'src/assets/OlaMapsWebSDKNew/olamaps-web-sdk.umd.js' // Change to correct URL if needed
        script.async = true
        script.onload = () => resolve(window.OlaMaps)
        script.onerror = () => reject(new Error('Failed to load OlaMaps SDK'))
        document.body.appendChild(script)
      })
    }

    const initializeMap = async () => {
      try {
        const OlaMaps = await loadScript()
        olaMapsRef.current = new OlaMaps({
          apiKey: 'Yw1jxOC8MSvQEwiiuzfdTlQxriZWquV38Upv6xdM'
        })

        mapRef.current = olaMapsRef.current.init({
          style:
            'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
          container: 'map',
          center: [76.8220416, 9.528],
          zoom: 17
        })
      } catch (error) {
        console.error('Map initialization failed:', error)
      }
    }

    initializeMap()

    return () => {
      if (mapRef.current) {
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []
        mapRef.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !olaMapsRef.current || !tableData) return

    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      // Get latest readings for each bin
      const latestBinReadings = new Map()
      tableData.forEach(reading => {
        const currentTime = new Date(reading.time).getTime()
        if (
          !latestBinReadings.has(reading.binId) ||
          currentTime >
            new Date(latestBinReadings.get(reading.binId).time).getTime()
        ) {
          latestBinReadings.set(reading.binId, reading)
        }
      })

      // Add new markers
      markerLocations.forEach(location => {
        const binData = latestBinReadings.get(location.id) || { fillLevel: 0 }
        const fillLevel = parseFloat(binData.fillLevel)

        const marker = olaMapsRef.current
          .addMarker({
            offset: [0, 6],
            anchor: 'bottom',
            color: getMarkerColor(fillLevel),
            draggable: false
          })
          .setLngLat([location.longitude, location.latitude])
          .setPopup(createPopup(location.id, fillLevel))
          .addTo(mapRef.current)

        markersRef.current.push(marker)
      })
    } catch (error) {
      console.error('Marker update failed:', error)
    }
  }, [tableData])

  const getMarkerColor = fillLevel => {
    if (fillLevel > 80) return 'red'
    if (fillLevel > 50) return 'orange'
    return 'green'
  }

  const createPopup = (id, fillLevel) => {
    return olaMapsRef.current.addPopup({ offset: [0, -30], anchor: 'bottom' })
      .setHTML(`
        <div>
          <p>Bin ID: ${id}</p>
          <p>Fill Level: ${fillLevel}%</p>
        </div>
      `)
  }

  return (
    <div className='flex flex-col bg-white rounded-sm'>
      <div className='py-6 px-5 text-xl text-black'>Bin Location</div>
      <hr className='h-px bg-gray-100 border-0 dark:bg-gray-200' />
      <div className='p-4'>
        <div
          id='map'
          className='w-full rounded-sm h-64 sm:h-80 md:h-96 lg:h-[500px]'
          // You can adjust the class here to set a default height based on screen size
        />
      </div>
    </div>
  )
}

export default Maps
