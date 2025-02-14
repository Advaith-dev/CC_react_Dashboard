import { useWasteData } from '../../hooks/useWasteData'

function HeaderCard () {
  const { totalBins, totalWaste, commonWaste, filledBins, isLoading } = useWasteData()
  return (
    <div className='flex flex-wrap justify-between gapb-2 mt-5 mb-5'>
      <div className='pb-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]'>
        <div className='rounded-sm h-full bg-blue-500 px-5 py-4 flex justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-white dark:text-white text-base whitespace-nowrap truncate'>
              Total Bins
            </p>
            <p className='text-white dark:text-white text-3xl'>
              {isLoading ? '...' : totalBins}
            </p>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='white'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
          </svg>
        </div>
      </div>

      <div className='pb-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]'>
        <div className='rounded-sm h-full dark:bg-emerald-600 px-5 py-4 flex justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-white dark:text-white text-base whitespace-nowrap truncate'>
              Total Waste
            </p>
            <p className='text-white dark:text-white text-3xl'>
              {isLoading ? '...' : `${totalWaste}`}
            </p>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='white'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
            />
          </svg>
        </div>
      </div>

      <div className='pb-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]'>
        <div className='rounded-sm h-full bg-amber-700 px-5 py-4 flex justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-white dark:text-white text-base whitespace-nowrap truncate'>
              Common Waste
            </p>
            <p className='text-white dark:text-white text-3xl'>
              {isLoading ? '...' : commonWaste}
            </p>
          </div>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='white'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
            />
          </svg>
        </div>
      </div>

      <div className='pb-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]'>
        <div className='rounded-sm h-full bg-rose-700 px-5 py-4 flex justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-white dark:text-white text-base whitespace-nowrap truncate'>
              Filled Bins
            </p>
            <p className='text-white dark:text-white text-3xl'>
              {isLoading ? '...' : filledBins}
            </p>
          </div>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='white'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HeaderCard
