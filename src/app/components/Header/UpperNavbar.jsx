"use client";
import { Phone, Mail, MapPin } from "lucide-react";

export default function UpperNavbar() {
  return (
    <div className="upper-navbar">
      <div className="container">
        <div className="welcome-text">
          <span>مرحباً بكم في نور الدين للمواد الغذائية</span>
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
          <div className="location-item">
            <MapPin size={14} />
            <span>طنطا، الغربية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
