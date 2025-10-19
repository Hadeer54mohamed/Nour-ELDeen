"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "../../../styles/sections.scss";
import { MapPin, Phone, Clock } from "lucide-react";

const BranchesSection = () => {
  const t = useTranslations("branches");

  const branches = [
    {
      name: t("branch1.name"),
      address: t("branch1.address"),
      phone: "01151662662",
      hours: t("branch1.hours"),
      image: "/images/branches/1.jpg",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d856.8959453354523!2d31.0015859!3d30.7862592!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c96f245f02e9%3A0x4629a79a0965e381!2sAgency%20Noureddine!5e0!3m2!1sen!2seg!4v1760574610302!5m2!1sen!2seg"
    },
    {
      name: t("branch2.name"),
      address: t("branch2.address"),
      phone: "01151662662",
      hours: t("branch2.hours"),
      image: "/images/branches/2.jpg",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3426.6694061357116!2d30.994086!3d30.81190400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDQ4JzQyLjkiTiAzMMKwNTknMzguNyJF!5e0!3m2!1sen!2seg!4v1760574733448!5m2!1sen!2seg"
    }
  ];

  return (
    <section className="branches-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>

        <div className="branches-grid">
          {branches.map((branch, index) => (
            <div className="branch-card" key={index}>
              <div className="branch-map">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  width={600}
                  height={250}
                  style={{ borderRadius: "15px", objectFit: "cover", width: "100%", height: "250px" }}
                  priority={index === 0}
                />
              </div>
              <div className="branch-info">
                <h3>{branch.name}</h3>
                <p className="branch-address">
                  <MapPin size={18} /> {branch.address}
                </p>
                <p className="branch-phone">
                  <Phone size={18} /> {branch.phone}
                </p>
                <p className="branch-hours">
                  <Clock size={18} /> {branch.hours}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
