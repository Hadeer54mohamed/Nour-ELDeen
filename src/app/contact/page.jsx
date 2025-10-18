"use client";
import React, { useState } from "react";
import "../../styles/contact.scss";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
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
            <h3 className="contact-subtitle">تواصل معنا</h3>
            <h2 className="contact-title">يسعدنا سماعك دائمًا</h2>
            <p className="contact-description">
              في <strong>نور الدين</strong> نهتم بآرائكم واستفساراتكم.  
              يمكنك مراسلتنا في أي وقت وسنقوم بالرد في أقرب فرصة ممكنة.
            </p>

            <ul className="contact-details">
            <li>
                <strong>          
                       <MapPin size={14} />
                العنوان:</strong> طنطا - اول شارع البحر مع الجلاء
                </li>
              <li>
                <strong><Phone size={14} /> الهاتف:</strong> 01151662662
                </li>
              <li>
                <strong> <MapPin size={14} /> البريد:</strong> info@noureldeen.com
                </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {showSuccess && (
              <div className="success-message">
                ✓ تم إرسال رسالتك بنجاح! شكراً لكم للتواصل معنا
              </div>
            )}
            <input type="text" placeholder="الاسم الكامل" required />
            <input type="email" placeholder="البريد الإلكتروني" required />
            <textarea placeholder="رسالتك" rows="5" required></textarea>
            <button type="submit" className="contact-btn">إرسال الرسالة</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
