"use client";
import React from "react";
import "../../../styles/sections.scss";
import branchesData from "./branchesData.json";
import { MapPin, Phone, Clock } from "lucide-react";

const BranchesSection = () => {
  return (
    <section className="branches-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">فروعنا</h2>
          <p className="section-subtitle">
            يسعدنا خدمتكم من خلال فروعنا المنتشرة في طنطا – الغربية، على مدار الساعة.
          </p>
        </div>

        <div className="branches-grid">
          {branchesData.map((branch, index) => (
            <div className="branch-card" key={index}>
              <div className="branch-map">
                <iframe
                  src={branch.mapUrl}
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "15px" }}
                  allowFullScreen
                  loading="lazy"
                   referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
