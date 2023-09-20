import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Header from './Components/Header/Header';
import Signup from './Pages/Signup';
import Signin from './Pages/Singin';
import Favorites from './Pages/Favourites';
import Footer from './Components/Footer/Footer';
import ContextReducer from './contexts/index';
import MovieDetails from './Pages/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <ContextReducer>
        <Header />
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/movieDetails/:movieId"} element={<MovieDetails />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/favorites"} element={<Favorites />} />
          <Route path={"*"} element={<Homepage />} />
        </Routes>
        <Footer />
      </ContextReducer>
    </BrowserRouter>
  );
}

export default App;