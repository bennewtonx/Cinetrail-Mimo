import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import MovieDetails from './Pages/MovieDetails/MovieDetails'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="moviedetails" element={<MovieDetails />}/>
    </Routes>
      hi
      
    </BrowserRouter>
  )
}

export default App
