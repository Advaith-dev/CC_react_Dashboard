import { useWasteData } from '../hooks/useWasteData'
import { useState } from 'react'

function Table () {
  const { tableData: wasteData, isLoading, error } = useWasteData()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const wasteTypeColors = {
    Paper: 'bg-green-400',
    Plastic: 'bg-blue-400',
    Other: 'bg-red-400'
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
  }

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentData = wasteData.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className='relative overflow-hidden rounded-sm shadow-md bg-white mt-7'>
      <div className='py-5 px-5 text-xl font-normal text-black'>
        Realtime Log
      </div>
      <hr className='h-px border-0 bg-gray-100' />
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800'>
          <thead className='text-[13px] text-gray-700 border-b-1 border-slate-300 bg-stone-50 dark:bg-slate-100 dark:text-gray-500'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                Bin ID
              </th>
              <th scope='col' className='px-6 py-4'>
                Waste Type
              </th>
              <th scope='col' className='px-6 py-4'>
                Fill level
              </th>
              <th scope='col' className='px-6 py-4'>
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan='4' className='px-6 py-4 text-center'>
                  Loading...
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr
                  key={index}
                  className='bg-white border-b-1 border-slate-200 hover:bg-gray-50 dark:hover:bg-slate-200'
                >
                  <td className='px-6 py-4 font-semibold'>{row.binId}</td>
                  <td className='px-6'>
                    <div>
                      <span
                        className={`px-4 py-1 text-white rounded-sm ${
                          wasteTypeColors[row.wasteType] || 'bg-gray-500'
                        }`}
                      >
                        {row.wasteType}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>{row.fillLevel}</td>
                  <td className='px-6 py-4'>{formatTime(row.time)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between p-4'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={startIndex + rowsPerPage >= wasteData.length}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Table
