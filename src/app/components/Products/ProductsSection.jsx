"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "../../../styles/sections.scss";

const ProductsSection = () => {
  const t = useTranslations("products");
  
  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "coffee", label: t("categories.coffee") },
    { key: "spices", label: t("categories.spices") },
    { key: "nuts", label: t("categories.nuts") },
  ];

  const productsData = [
    {
      name: t("items.product1.name"),
      description: t("items.product1.description"),
      image: "/images/hero/b&w.png",
      category: "coffee"
    },
    {
      name: t("items.product2.name"),
      description: t("items.product2.description"),
      image: "/images/hero/b&w.png",
      category: "spices"
    },
    {
      name: t("items.product3.name"),
      description: t("items.product3.description"),
      image: "/images/hero/b&w.png",
      category: "nuts"
    },
  
    {
      name: t("items.product5.name"),
      description: t("items.product5.description"),
      image: "/images/hero/b&w.png",
      category: "coffee"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const filteredProducts =
    selectedCategory === "all"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>

        <div className="products-filter">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${
                selectedCategory === category.key ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

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
                <button 
                  className="btn-primary"
                  onClick={() => openQuickView(product)}
                >
                  {t("learnMore")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isQuickViewOpen && selectedProduct && (
        <div className="quickview-overlay" onClick={closeQuickView}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="quickview-close" onClick={closeQuickView}>
              ×
            </button>
            <div className="quickview-content">
              <div className="quickview-image">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className="modal-product-image"
                />
              </div>
              <div className="quickview-details">
                <span className="product-category">{categories.find(c => c.key === selectedProduct.category)?.label}</span>
                <h2>{selectedProduct.name}</h2>
                <p className="product-description">{selectedProduct.description}</p>
                <div className="product-features">
                  <h3>{t("features")}</h3>
                  <ul>
                    <li>{t("feature1")}</li>
                    <li>{t("feature2")}</li>
                    <li>{t("feature3")}</li>
                  </ul>
                </div>
               {/*  <div className="quickview-actions">
                  <button className="btn-primary">اطلب الآن</button>
                  <button className="btn-secondary" onClick={closeQuickView}>
                    إغلاق
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
