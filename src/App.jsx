import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'

function App() {

  return (
    <div className='px-30'>
      <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
