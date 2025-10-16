"use client";
import React from "react";
import Image from "next/image";
import "../../../styles/footer.scss";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const FooterUpper = () => {
  return (
    <footer className="footer-upper">
      <div className="container">
        <div className="footer-columns">
          {/* About */}
          <div className="footer-col about">
            <div className="footer-logo">
              <Image
                src="/images/logo.png"
                alt="Noureldeen Logo"
                width={150}
                height={150}
                priority
              />
            </div>
            <p className="footer-desc">
              منذ عام 1920، متخصصون في بيع أجود المواد الغذائية بخبرة تمتد لأجيال.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" title="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" title="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="WhatsApp" title="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col links">
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="#hero">الرئيسية</a></li>
              <li><a href="#products">منتجاتنا</a></li>
              <li><a href="#story">قصتنا</a></li>
              <li><a href="#branches">فروعنا</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col contact">
            <h3>تواصل معنا</h3>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div className="contact-text">
                <p>فرع شارع البحر – طنطا</p>
                <p>فرع الاستاد – طنطا</p>
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
