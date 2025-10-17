"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../../styles/products.scss";
import productsData from "../components/Products/ProductsData.json";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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
          <h2 className="section-title">منتجاتنا</h2>
          <p className="section-subtitle">
            نقدم لكم أجود المواد الغذائية المختارة بعناية من نور الدين منذ عام 1920.
          </p>
        </div>

        <div className="products-grid">
          {productsData.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image-wrapper">
                <Image
                  src={product.image}
                  alt={product.name || "منتج من منتجات نور الدين"}
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
                  اعرف المزيد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* quick view  */}
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
                <span className="product-category">{selectedProduct.category}</span>
                <h2>{selectedProduct.name}</h2>
                <p className="product-description">{selectedProduct.description}</p>
                <div className="product-features">
                  <h3>المميزات:</h3>
                  <ul>
                    <li>منتج طبيعي 100%</li>
                    <li>جودة مضمونة</li>
                    <li>تعبئة يومية طازجة</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
