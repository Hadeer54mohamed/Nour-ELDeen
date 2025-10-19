"use client";
import { useState, useEffect } from "react";
import MainNavbar from "./MainNavbar";
import UpperNavbar from "./UpperNavbar";
import NewsTicker from "./NewsTicker";
import "@/styles/header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (menuOpen && e.target.classList.contains("menu-open")) {
        closeMenu();
      }
    };

    document.body.addEventListener("click", handleOverlayClick);

    return () => {
      document.body.removeEventListener("click", handleOverlayClick);
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <UpperNavbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <NewsTicker />
      <MainNavbar menuOpen={menuOpen} closeMenu={closeMenu} />
    </header>
  );
}
