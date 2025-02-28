import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import Qr from './Qr'
import AddBin from './AddBin'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/qrcode' element={<Qr />} />
        <Route path='/addbin' element={<AddBin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
