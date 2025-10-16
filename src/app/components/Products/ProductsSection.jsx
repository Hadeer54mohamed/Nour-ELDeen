"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../../../styles/sections.scss";
import productsData from "./ProductsData.json";

const ProductsSection = () => {
  const categories = ["الكل", "البن", "التوابل", "المكسرات", "الحبوب"];
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredProducts =
    selectedCategory === "الكل"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">منتجاتنا</h2>
          <p className="section-subtitle">
            نقدم لكم أجود المواد الغذائية المختارة بعناية من نور الدين منذ عام 1920.
          </p>
        </div>

        {/* الفلتر */}
        <div className="products-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* المنتجات */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image-wrapper">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button className="btn-primary">اعرف المزيد</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
