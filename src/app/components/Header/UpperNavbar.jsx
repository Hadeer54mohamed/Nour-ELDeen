"use client";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";

export default function UpperNavbar({ menuOpen, toggleMenu }) {
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <div className="upper-navbar">
      <div className="container">
        <button
          className="menu-btn-upper"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="welcome-text">
          <span>{t("welcometext")}</span>
        </div>

        <div className="contact-info">
          <a href="tel:+201151662662" className="contact-item">
            <Phone size={14} />
            <span dir="ltr">01151662662</span>
          </a>
          <a href="mailto:info@noureldeen.com" className="contact-item">
            <Mail size={14} />
            <span>info@noureldeen.com</span>
          </a>
         {/*  <div className="location-item">
            <MapPin size={14} />
            <span>{t("location")}</span>
          </div> */}
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
