import { useWasteData } from '../../hooks/useWasteData'
import { useState } from 'react'

function Table() {
  const { tableData: wasteData, isLoading, error } = useWasteData()
  const [currentPage, setCurrentPage] = useState(1)
  const [inputPage, setInputPage] = useState('')
  const itemsPerPage = 10

  const totalPages = Math.ceil(wasteData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = wasteData.slice(startIndex, endIndex)

  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }
  const formatDate = timestamp => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const wasteTypeColors = {
    Paper: 'bg-green-400',
    Plastic: 'bg-blue-400',
    Other: 'bg-red-400'
  }

  const handlePageInput = (e) => {
    const value = e.target.value
    setInputPage(value)
  }

  const handlePageSubmit = (e) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(inputPage)
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum)
      }
      setInputPage('')
    }
  }

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
              <th scope='col' className='w-[18%] pl-16 pr-6 py-4'>
                Bin ID
              </th>
              <th scope='col' className='w-[25%] px-6 py-4'>
                Waste Type
              </th>
              <th scope='col' className='w-[25%] px-6 py-4'>
                Fill level
              </th>
              <th scope='col' className='w-[20%] px-6 py-4'>
                Time
              </th>
              <th scope='col' className='w-[20%] px-6 py-4'>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan='4' className='px-6 py-4'>
                  Loading...
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr
                  key={index}
                  className='bg-white border-b-1 border-slate-200 hover:bg-gray-50 dark:hover:bg-slate-200'
                >
                  <td className='pl-16 pr-6 py-4 font-semibold'>{row.binId}</td>
                  <td className='px-6'>
                    <div>
                      <span className={`px-4 py-1 text-white rounded-sm ${wasteTypeColors[row.wasteType] || 'bg-gray-500'}`}>
                        {row.wasteType}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>{row.fillLevel}</td>
                  <td className='px-6 py-4'>{formatTime(row.time)}</td>
                  <td className='px-6 py-4'>{formatDate(row.time)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900">
              {startIndex + 1}-{Math.min(endIndex, wasteData.length)}
            </span> of <span className="font-semibold text-gray-900">
              {wasteData.length}
            </span>
          </span>
          
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-200 dark:border-gray-300 dark:text-black dark:hover:bg-gray-500 dark:hover:text-white disabled:opacity-50"
              >
                Previous
              </button>
            </li>
            
            <li>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handlePageInput}
                onKeyDown={handlePageSubmit}
                placeholder={currentPage}
                    className="w-16 h-8 text-center border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200 dark:border-gray-300 dark:text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </li>
            
            <li className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-slate-200 dark:border-gray-300 dark:text-black">
              of {totalPages}
            </li>
            
            <li>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-200 dark:border-gray-300 dark:text-black dark:hover:bg-gray-500 dark:hover:text-white disabled:opacity-50"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

  )
}

export default Table
