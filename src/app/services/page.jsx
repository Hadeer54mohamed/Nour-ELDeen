"use client";
import React from "react";
import Image from "next/image";
import "../../styles/services.scss";
import servicesData from "./servicesData.json";

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <h3 className="services-subtitle">ماذا نقدم</h3>
          <h2 className="services-title">خدماتنا في نور الدين للمواد الغذائية</h2>
          <p className="services-description-intro">
            نعمل على تلبية احتياجات السوق المحلي من المنتجات الغذائية بأعلى جودة ومعايير السلامة.
          </p>
        </div>

        <div className="services-wrapper">
          {servicesData.map((service, index) => (
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
