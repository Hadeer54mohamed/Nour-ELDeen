"use client";
import React from "react";
import Image from "next/image";
import "../../../styles/sections.scss";
import storyData from "./storyData.json";

const StorySection = () => {
  const { title, subtitle, description, quote, image, slogan } = storyData;

  return (
    <section className="story-section">
      <div className="container">
        <div className="story-wrapper">
          <div className="story-image-wrapper">
            <Image
              src={image}
              alt="Noureldeen Story"
              width={500}
              height={500}
              className="story-image"
              priority
            />
          </div>
          <div className="story-content">
            <h3 className="story-subtitle">{subtitle}</h3>
            <h2 className="story-title">{title}</h2>
            <p className="story-description">{description}</p>
            <blockquote className="story-quote">
              "{quote}"
            </blockquote>
            <p className="story-slogan">{slogan}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
