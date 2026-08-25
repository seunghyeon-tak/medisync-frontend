import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AppointmentSlotPage from './pages/AppointmentSlotPage'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/appointment-slots" element={<AppointmentSlotPage/>}></Route>
    </Routes>
  )
}

export default App