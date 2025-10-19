"use client";
import React from "react";
import { useTranslations } from "next-intl";
import "../../../styles/footer.scss";

const FooterLower = () => {
  const t = useTranslations("footer");

  return (
    <div className="footer-lower">
      <div className="container">
        <p className="footer-inline">
          <span className="footer-slogan">{t("slogan")}</span>
          <span className="divider">|</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} <strong> {t("name")} </strong> — {t("copyright")}
          </span>
          <span className="divider">|</span>
          <span className="developed-by">
            {t("developedBy")}{" "}
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
