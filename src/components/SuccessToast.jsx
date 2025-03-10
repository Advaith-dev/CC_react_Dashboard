import { useState, useEffect } from 'react'
import '../components/styles/index.css'

const SuccessToast = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed top-15 z-50
        animate-slide-up
      `}
    >
      <div
        className={`
          flex items-center gap-3 
          bg-teal-600 text-white
          px-7 py-5 rounded-lg shadow-lg
          animate-[fadeIn_0.5s_ease-out]
        `}
        role='alert'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='size-5 shrink-0'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>

        <p className='text-sm font-medium'>
          {message || 'Bin added successfully'}
        </p>
      </div>
    </div>
  )
}

export default SuccessToast
