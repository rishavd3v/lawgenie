import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import ProtectedRoute from './components/Auth/ProtectedRoute'

function App() {

  return (
    <Router>
      <Navbar/>
      <div className='px-30'>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
