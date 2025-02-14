import { useState } from 'react'
import { auth,provider } from './firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth'

function SignIn () {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    }
    setIsLoading(false)
  }
  const handleGoogleButton = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    }
    
  };

  return (
    <div className='min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Header Section */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Welcome Back
          </h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Please sign in to your account
          </p>
          {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
        </div>

        {/* Form Section */}
        <div className='bg-white dark:bg-slate-800 shadow-lg rounded-sm p-6 sm:p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Email address
              </label>
              <input
                id='email'
                type='email'
                required
                className='mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-sm text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                dark:text-gray-300'
                placeholder='Enter your email'
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                required
                className='mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-sm text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                dark:text-gray-300'
                placeholder='Enter your password'
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50'
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* OR Line */}
          <div className='flex items-center w-full my-4'>
            <hr className='flex-grow border-t border-gray-600' />
            <span className='mx-4 text-gray-600'>or</span>
            <hr className='flex-grow border-t border-gray-600' />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleButton}
            class='cursor-pointer w-full justify-center text-white flex gap-2 items-center bg-transparent border border-gray-600 px-4 py-2 rounded-sm font-medium text-sm hover:bg-white hover:text-black transition-all ease-in duration-200'
          >
            <svg
              viewBox='0 0 48 48'
              xmlns='http://www.w3.org/2000/svg'
              class='w-6'
            >
              <path
                d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                fill='#FFC107'
              ></path>
              <path
                d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                fill='#FF3D00'
              ></path>
              <path
                d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                fill='#4CAF50'
              ></path>
              <path
                d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                fill='#1976D2'
              ></path>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Don't have an account?{' '}
              <a
                onClick={() => navigate('/signUp')}
                className='font-medium text-blue-500 hover:text-blue-400 cursor-pointer'
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
