import { useLocation, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const AddBin = () => {
  const location = useLocation()
  const { id, latitude, longitude } = location.state || {}
  const [name, setName] = useState('')

  if (!id) {
    return <Navigate to='/qrcode' replace />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(latitude, longitude, id, name)
    try {
      const response = await axios.post('http://localhost:3001/api/write', {
        lat: parseFloat(latitude),
        long: parseFloat(longitude),
        id,
        name
      })

      alert(response.data.message)
    } catch (error) {
      console.error('Error adding wastebin:', error)
      alert('Failed to add wastebin')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
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
  )
}

export default AddBin
