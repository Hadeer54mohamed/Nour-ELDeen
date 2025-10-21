"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  MessageCircle,
  Truck,
  Globe,
  Award,
} from "lucide-react"; // 🎨 الأيقونات
import "../../../styles/services.scss";

const ServicesSection = () => {
  const t = useTranslations("services");

  const iconColor = "#b44041";

  const services = [
    {
      title: t("service1.title"),
      description: t("service1.description"),
      icon: <MessageCircle size={40} color={iconColor} strokeWidth={2.2} />,
    },
    {
      title: t("service2.title"),
      description: t("service2.description"),
      icon: <Truck size={40} color={iconColor} strokeWidth={2.2} />,
    },
    {
      title: t("service3.title"),
      description: t("service3.description"),
      icon: <Globe size={40} color={iconColor} strokeWidth={2.2} />,
    },
    {
      title: t("service4.title"),
      description: t("service4.description"),
      icon: <Award size={40} color={iconColor} strokeWidth={2.2} />,
    },
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
              <div className="service-icon-wrapper">
                <div className="service-icon-circle">{service.icon}</div>
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
