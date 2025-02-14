import { useState, useRef, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'; //No page reload,Faster navigation,Preserves React state

function Navbar () {
  // const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSignOut = () => {
    window.location.href = '/';
    // setIsDropdownOpen(false);
    // navigate('/');
  };

  return (
    <nav className='bg-teal-950 border-gray-200 w-full'>
      <div className='flex items-center justify-between px-6 py-4 w-full'>
        <a href='/' className='flex items-center'>
          <span className='text-2xl font-semibold text-white'>Cashcrow</span>
        </a>
        <div className='relative' ref={dropdownRef}>
          <button onClick={toggleDropdown} type='button'
            className='flex text-sm bg-teal-950 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer hover:opacity-80'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 hover:text-gray-200'
              fill='none'
              viewBox='0 0 24 24'
              stroke='white'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
              <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Profile</a>
              <a onClick={handleSignOut} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Sign Out</a>
              {/* <button 
                onClick={handleSignOut}
                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                Sign Out
              </button> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
