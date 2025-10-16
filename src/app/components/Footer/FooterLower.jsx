"use client";
import React from "react";
import "../../../styles/footer.scss";

const FooterLower = () => {
  return (
    <div className="footer-lower">
      <div className="container">
        <p className="footer-inline">
          <span className="footer-slogan">نحن نتطور من أجلكم 💫</span>
          <span className="divider">|</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} <strong>نــور الـديـن</strong> — جميع الحقوق محفوظة
          </span>
          <span className="divider">|</span>
          <span className="developed-by">
            تم التطوير بواسطة{" "}
            <a
              href="https://www.facebook.com/ENSEGYPTEG"
              target="_blank"
              rel="noopener noreferrer"
            >
              ENS
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FooterLower;
