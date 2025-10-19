"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "../../../styles/services.scss";

const ServicesSection = () => {
  const t = useTranslations("services");

  const services = [
    {
      title: t("service1.title"),
      description: t("service1.description"),
      icon: "/images/hero/b&w.png"
    },
    {
      title: t("service2.title"),
      description: t("service2.description"),
      icon: "/images/hero/b&w.png"
    },
    {
      title: t("service3.title"),
      description: t("service3.description"),
      icon: "/images/hero/b&w.png"
    },
    {
      title: t("service4.title"),
      description: t("service4.description"),
      icon: "/images/hero/b&w.png"
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <h3 className="services-subtitle">{t("subtitle")}</h3>
          <h2 className="services-title">{t("title")}</h2>
          <p className="services-description-intro">
            {t("description")}
          </p>
        </div>

        <div className="services-wrapper">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

