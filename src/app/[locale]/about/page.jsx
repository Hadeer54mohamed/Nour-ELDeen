"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "../../../styles/about.scss";

const AboutPage = () => {
  const t = useTranslations("about");

  return (
    <section className="about-page">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image">
            <Image
              src="/images/hero/slide.png"
              alt={t("imageAlt")}
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="about-content">
            <h3 className="about-subtitle">{t("subtitle")}</h3>
            <h1 className="about-title">
              {t("title")}
            </h1>
            <p className="about-description">
              {t("description1")}
            </p>

            <p className="about-description">
              {t("description2")}
            </p>

            <blockquote className="about-quote">
              "{t("quote")}"
            </blockquote>
            <blockquote className="about-quote">
              "{t("quote2")}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

