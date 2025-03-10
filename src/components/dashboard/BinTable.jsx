import { useState, useEffect } from 'react'

function Table () {
  const [binData, setBinData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/location')
        const data = await response.json()
        setBinData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching bin data:', error)
        setIsLoading(false)
      }
    }

    fetchBinData()
    const interval = setInterval(fetchBinData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative overflow-hidden rounded-sm shadow-md bg-white mt-7'>
      <div className='py-5 px-5 text-xl font-normal text-black'>
        Bin Details
      </div>
      <hr className='h-px border-0 bg-gray-100' />
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800'>
          <thead className='text-[13px] text-gray-700 border-b-1 border-slate-300 bg-stone-50 dark:bg-slate-100 dark:text-gray-500'>
            <tr>
              <th scope='col' className='w-[18%] pl-16 pr-6 py-4'>
                Bin ID
              </th>
              <th scope='col' className='w-[25%] px-6 py-4'>
                Bin Name
              </th>
              <th scope='col' className='w-[20%] px-6 py-4'>
                Latitude
              </th>
              <th scope='col' className='w-[20%] px-6 py-4'>
                Longitude
              </th>
              <th scope='col' className='w-[17%] px-6 py-4'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan='5' className='px-6 py-4 text-center'>
                  Loading...
                </td>
              </tr>
            ) : binData.length === 0 ? (
              <tr>
                <td colSpan='5' className='px-6 py-4 text-center'>
                  No bins found
                </td>
              </tr>
            ) : (
              binData.map((bin, index) => (
                <tr
                  key={bin.id || index}
                  className='bg-white border-b-1 border-slate-200 hover:bg-gray-50 dark:hover:bg-slate-200'
                >
                  <td className='pl-16 pr-6 py-4 font-semibold'>{bin.id}</td>
                  <td className='px-6 py-4'>{bin.name || 'N/A'}</td>
                  <td className='px-6 py-4'>{bin.lat}</td>
                  <td className='px-6 py-4'>{bin.long}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        bin.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {bin.status || 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
