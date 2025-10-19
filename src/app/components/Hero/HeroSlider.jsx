"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import "../../../styles/sections.scss";

export default function HeroSlider() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const slide = {
    title: t("slide1.title"),
    description: t("slide1.description"),
    button: { text: t("slide1.button"), link: `/${locale}/about` },
    video: "/images/hero/hero.mp4",
  };

  return (
    <section className="hero-section">
      {/* الخلفية الفيديو */}
      <video
        className="hero-bg"
        src="/images/hero/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* <div className="overlay"></div>

      <div className="hero-content container">
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>

        {slide.button && (
          <Link href={slide.button.link} className="hero-btn">
            {slide.button.text}
          </Link>
        )}
      </div> */}

    </section>
  );
}
