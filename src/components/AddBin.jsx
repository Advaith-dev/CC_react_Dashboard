import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import SuccessToast from './SuccessToast'
import Navbar from './dashboard/Navbar.jsx'

const AddBin = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id, latitude, longitude } = location.state || {}
  const [name, setName] = useState('')
  const [showToast, setShowToast] = useState(false)

  if (!id) {
    return <Navigate to='/qrcode' replace />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/api/write', {
        lat: parseFloat(latitude),
        long: parseFloat(longitude),
        id: parseInt(id),
        name
      })

      // Show success toast
      setShowToast(true)

      // Hide toast and navigate after 3 seconds
      setTimeout(() => {
        setShowToast(false)
        navigate('/dashboard')
      }, 3000)
    } catch (error) {
      console.error('Error adding wastebin:', error)
      alert('Failed to add wastebin')
    }
  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
        {showToast && <SuccessToast message='Bin successfully added!' />}
        <div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
            Add New Bin
          </h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Bin ID
              </label>
              <input
                type='text'
                value={id}
                disabled
                className='w-full p-2 border rounded-md bg-gray-50 text-gray-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Bin Name
              </label>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className='w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Latitude
              </label>
              <input
                type='text'
                value={latitude}
                disabled
                className='w-full p-2 border rounded-md bg-gray-50 text-gray-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Longitude
              </label>
              <input
                type='text'
                value={longitude}
                disabled
                className='w-full p-2 border rounded-md bg-gray-50 text-gray-500'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200'
            >
              Add Bin
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddBin
