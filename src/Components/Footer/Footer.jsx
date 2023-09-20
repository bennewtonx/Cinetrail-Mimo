import React, { useContext } from "react";
import "./Footer.css";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function Footer() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <footer className={`footer-container ${!darkMode && "footer-light"}`}>
      All rights reserved.
    </footer>
  );
}