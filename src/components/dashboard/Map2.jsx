import React, { useEffect, useRef, useState } from 'react'
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
  const [markerLocations, setMarkerLocations] = useState([])
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const olaMapsRef = useRef(null)
  const { tableData, isLoading } = useWasteData()

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/location')
        const data = await response.json()
        setMarkerLocations(data)
      } catch (error) {
        console.error('Error fetching marker data:', error)
      }
    }

    fetchMarkers()
  }, [])

  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (window.OlaMaps) {
          resolve(window.OlaMaps)
          return
        }
        const script = document.createElement('script')
        script.src = 'src/assets/OlaMapsWebSDKNew/olamaps-web-sdk.umd.js'
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
    if (!mapRef.current || !olaMapsRef.current || !markerLocations.length)
      return

    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

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
      const getMarkerColor = fillLevel => {
        if (fillLevel > 80) return 'red'
        if (fillLevel > 50) return 'orange'
        return 'green'
      }
      // Add new markers from MongoDB data
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
          .setLngLat([location.long, location.lat])
          .setPopup(
            olaMapsRef.current.addPopup({ offset: [0, -30], anchor: 'bottom' })
              .setHTML(`
                <div>
                  <p>Bin ID: ${location.id}</p>
                  <p>Name: ${location.name}</p>
                </div>
              `)
          )
          .addTo(mapRef.current)

        markersRef.current.push(marker)
      })
    } catch (error) {
      console.error('Marker update failed:', error)
    }
  }, [markerLocations])

  return (
    <div className='flex flex-col bg-white rounded-sm'>
      <div className='py-6 px-5 text-xl text-black'>Bin Location</div>
      <hr className='h-px bg-gray-100 border-0 dark:bg-gray-200' />
      <div className='p-4'>
        <div
          id='map'
          className='w-full rounded-sm h-64 sm:h-80 md:h-96 lg:h-[500px]'
        />
      </div>
    </div>
  )
}

export default Maps
