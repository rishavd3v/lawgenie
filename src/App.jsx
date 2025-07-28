import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Conversation from './components/Conversation'
import ChatPage from './pages/ChatPage'

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/chat/:conversationId" element={<ProtectedRoute><ChatPage/></ProtectedRoute>}/>
        </Routes>
    </Router>
  )
}

export default App
