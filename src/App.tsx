import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage/>}></Route>
    </Routes>
  )
}

export default App