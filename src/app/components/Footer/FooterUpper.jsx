"use client";
import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import "../../../styles/footer.scss";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const FooterUpper = () => {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="footer-upper">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-col about">
            <div className="footer-logo">
              <Image
                src="/images/logo.png"
                alt="Noureldeen Logo"
                width={150}
                height={150}
                priority
              />
              <Image
                src="/images/1920-.png"
                alt="Noureldeen 1920"
                width={150}
                height={150}
                priority
              />
            </div>
            <p className="footer-desc">
              {t("description")}
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/1920NOURELDEEN"
              target="_blank" rel="noopener noreferrer"
               aria-label="Facebook" title="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/noureldeen_1920/" 
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" title="Instagram">
                <FaInstagram />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=201151662662&text&type=phone_number&app_absent=0" 
              target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp" title="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-col links">
            <h3>{t("quickLinks")}</h3>
            <ul>
              <li><a href={`/${locale}`}>{tNav("home")}</a></li>
              <li><a href={`/${locale}/products`}>{tNav("products")}</a></li>
              <li><a href={`/${locale}/about`}>{tNav("about")}</a></li>
              <li><a href={`/${locale}/branches`}>{tNav("branches")}</a></li>
              <li><a href={`/${locale}/contact`}>{tNav("contact")}</a></li>
            </ul>
          </div>

          <div className="footer-col contact">
            <h3>{t("contactUs")}</h3>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div className="contact-text">
                <p>{t("branch1")}</p>
                <p>{t("branch2")}</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <p className="contact-text">01151662662</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <p className="contact-text">info@noureldeen.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterUpper;
