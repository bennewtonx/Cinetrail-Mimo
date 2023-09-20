import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import SearchResultItem from "../../SearchResultItem/SearchResultItem";

import "./Header.css";

export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { token, setToken, user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&query=${query}`
    )
      .then((res) => setSearchResults(res.data.results))
      .catch((err) => console.log(err));
  }, [query]);

  const toggleMode = () => {
    setDarkMode((prevState) => !prevState);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
    setToken("");
    navigate("/");
  };

  return (
    <div className={`header-container ${!darkMode && "header-light"}`}>
      <Link className="logo" to="/">
        CineTrail
      </Link>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() && (
          <div className="search-results-container">
            {searchResults.map((result) => (
              <SearchResultItem
                movie={result}
                key={result?.id}
                setQuery={setQuery}
              />
            ))}
          </div>
        )}
      </div>
      <div className="header-buttons-container">
        <div className="theme-buttons-container">
          <div className="theme-buttons">
            <MdOutlineLightMode
              className={`theme-icon ${!darkMode && "theme-icon-active"}`}
              onClick={!darkMode ? undefined : toggleMode}
            />
            <MdOutlineDarkMode
              className={`theme-icon ${darkMode && "theme-icon-active"}`}
              onClick={darkMode ? undefined : toggleMode}
            />
          </div>
        </div>
        <div>
          {token ? (
            <div className="profile-container">
              <img
                src={user?.image_url}
                alt="avatar"
                className="profile-img"
                onClick={() => setShowProfile((prevState) => !prevState)}
              />
              <p>Welcome, {user?.username}</p>
              {showProfile && (
                <div className="profile-options">
                  <Link to={"/favorites"}>My Favorites</Link>
                  <p className="logout" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              className="create-account-btn"
              onClick={() => navigate("/signup")}
            >
              Create an Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}