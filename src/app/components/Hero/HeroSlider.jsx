"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import heroData from "./heroData.json";
import "../../../styles/sections.scss";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const slides = heroData.slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="hero-bg"
          />

          <div className="overlay"></div>

          <div className="hero-content container">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>

            {slide.button && (
              <Link href={slide.button.link} className="hero-btn">
                {slide.button.text}
              </Link>
            )}
          </div>
        </div>
      ))}

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}
