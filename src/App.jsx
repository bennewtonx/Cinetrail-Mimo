import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="moviedetails" element={<MovieDetails />}/>
      {/*the "*" tells code to input anything selected - must come at the end of the browser routes*/}
      <Route path={"*"} element={<Homepage />} />
    </Routes>
    <Footer />
      
    </BrowserRouter>
  )
}

export default App
