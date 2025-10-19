"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "../../../styles/sections.scss";

const StorySection = () => {
  const t = useTranslations("story");

  return (
    <section className="story-section">
      <div className="container">
        <div className="story-wrapper">
          <div className="story-image-wrapper">
            <Image
              src="/images/hero/b&w.png"
              alt="Noureldeen Story"
              width={500}
              height={500}
              className="story-image"
              priority
            />
          </div>
          <div className="story-content">
            <h3 className="story-subtitle">{t("subtitle")}</h3>
            <h2 className="story-title">{t("title")}</h2>
            <p className="story-description">{t("description")}</p>
            <blockquote className="story-quote">
              "{t("quote")}"
            </blockquote>
            <p className="story-slogan">{t("slogan")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
