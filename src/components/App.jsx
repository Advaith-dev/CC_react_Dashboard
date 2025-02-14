import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
