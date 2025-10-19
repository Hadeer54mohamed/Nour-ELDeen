"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import "../../../styles/contact.scss";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  const t = useTranslations("contact");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    e.target.reset();
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3 className="contact-subtitle">{t("subtitle")}</h3>
            <h2 className="contact-title">{t("title")}</h2>
            <p className="contact-description">
              {t("description")}
            </p>

            <ul className="contact-details">
              <li>
                <strong>          
                  <MapPin size={14} />
                  {t("addressLabel")}:
                </strong> {t("address")}
              </li>
              <li>
                <strong><Phone size={14} /> {t("phoneLabel")}:</strong> 01151662662
              </li>
              <li>
                <strong> <Mail size={14} /> {t("emailLabel")}:</strong> info@noureldeen.com
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {showSuccess && (
              <div className="success-message">
                ✓ {t("successMessage")}
              </div>
            )}
            <input type="text" placeholder={t("namePlaceholder")} required />
            <input type="email" placeholder={t("emailPlaceholder")} required />
            <textarea placeholder={t("messagePlaceholder")} rows="5" required></textarea>
            <button type="submit" className="contact-btn">{t("submitButton")}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

