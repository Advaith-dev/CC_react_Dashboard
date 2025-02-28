import { Scanner } from '@yudiel/react-qr-scanner'
import { useGeolocated } from 'react-geolocated'
import { useNavigate } from 'react-router-dom'

const Qr = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true
      },
      userDecisionTimeout: 5000
    })

  const navigate = useNavigate()

  const ErrorMessage = ({ message }) => (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-red-50 p-6 rounded-lg shadow-sm'>
        <div className='flex items-center gap-3'>
          <svg
            className='w-6 h-6 text-red-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className='text-red-600 font-medium'>{message}</p>
        </div>
      </div>
    </div>
  )

  const handleScan = result => {
    if (result) {
      console.log(result[0]['rawValue'])
      navigate('/addbin', {
        state: {
          id: result[0]['rawValue'],
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      })
    }
  }

  if (!isGeolocationAvailable) {
    return <ErrorMessage message='Please update or change your browser' />
  }

  if (!isGeolocationEnabled) {
    return <ErrorMessage message='Please enable location on your browser' />
  }

  if (!coords) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex items-center gap-3'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500'></div>
          <p className='text-gray-600 font-medium'>Getting location data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
          QR Code Scanner
        </h2>

        <div className='bg-gray-100 rounded-lg p-4 mb-6'>
          <div className='w-full aspect-square max-w-sm mx-auto'>
            <Scanner
              onScan={handleScan}
              style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='text-lg font-semibold text-gray-700'>
            Current Location
          </h3>
          <div className='bg-teal-50 rounded-lg p-4 space-y-2'>
            <div className='flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-teal-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Latitude:</span>{' '}
                {coords.latitude.toFixed(6)}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-teal-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Longitude:</span>{' '}
                {coords.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qr
