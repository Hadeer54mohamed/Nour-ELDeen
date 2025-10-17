"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function MainNavbar() {
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
    <nav className="main-navbar">
      <div className="container">
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="Noureldeen Logo"
            width={200}
            height={230}
            className="logo-image"
            priority
          />
          <Image
            src="/images/1920-.png"
            alt="Hotline 1920"
            width={200}
            height={200}
            className="image-1920"
          />
        </div>

        <button
          className="menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
  <li>
    <Link href="/" onClick={closeMenu}>
      <div className="nav-item">
        <Image src="/icons/home.png" alt="Home" width={24} height={24} />
        <span>الرئيسية</span>
      </div>
    </Link>
  </li>
  <li>
    <Link href="/about" onClick={closeMenu}>
      <div className="nav-item">
        <Image src="/icons/story.png" alt="About" width={24} height={24} />
        <span>من نحن</span>
      </div>
    </Link>
  </li>
  <li>
    <Link href="/services" onClick={closeMenu}>
      <div className="nav-item">
        <Image src="/icons/service.png" alt="Services" width={24} height={24} />
        <span>الخدمات</span>
      </div>
    </Link>
  </li>
  <li>
    <Link href="/products" onClick={closeMenu}>
      <div className="nav-item">
        <Image src="/icons/order.png" alt="Products" width={24} height={24} />
        <span>المنتجات</span>
      </div>
    </Link>
  </li>
  <li>
    <Link href="/contact" onClick={closeMenu}>
      <div className="nav-item">
        <Image src="/icons/24-7.png" alt="Contact" width={24} height={24} />
        <span>تواصل معنا</span>
      </div>
    </Link>
  </li>
  <li>
    <Link href="/branches" onClick={closeMenu}>
      <div className="nav-item">
        <Image src="/icons/branches.png" alt="branches" width={24} height={24} />
        <span>فروعنا</span>
      </div>
    </Link>
  </li>
</ul>


        <div className="hotline">
          <span className="label">اتصل بنا</span>
          <a href="tel:01151662662" className="number">
            01151662662
          </a>
        </div>
      </div>
    </nav>
  );
}
