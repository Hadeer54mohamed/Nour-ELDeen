"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "../../../styles/sections.scss";

const ProductsSection = () => {
  const t = useTranslations("products");
  const scrollContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "mafaza", label: t("categories.Mafaza") },
    { key: "herbs_grocery", label: t("categories.Herbs & Grocery") },
    { key: "fruits_vegetables", label: t("categories.Fruits & Vegetables") },
    { key: "dairy", label: t("categories.Dairy") },
    { key: "meat", label: t("categories.Meat") },
    { key: "canned_goods", label: t("categories.Canned Goods") },
    { key: "beverages", label: t("categories.Beverages") },
    { key: "frozen_foods", label: t("categories.Frozen Foods") },
    { key: "pasta", label: t("categories.Pasta") },
    { key: "oils", label: t("categories.Oils") },
    { key: "halva", label: t("categories.Halva") }
  ];

  const productsData = [
    {
      name: t("items.category1.name"),
      description: t("items.category1.description"),
      image: "/category/Mafaza.jpg",
      category: "mafaza",
    },
    {
      name: t("items.category2.name"),
      description: t("items.category2.description"),
      image: "/category/Spices1.jpg",
      category: "herbs_grocery",
    },
    {
      name: t("items.category3.name"),
      description: t("items.category3.description"),
      image: "/category/Nuts.jpg",
      category: "herbs_grocery",
    },
    {
      name: t("items.category4.name"),
      description: t("items.category4.description"),
      image: "/category/Tea.jpg",
      category: "beverages",
    },
    {
      name: t("items.category5.name"),
      description: t("items.category5.description"),
      image: "/category/Meat.jpg",
      category: "meat",
    },
    {
      name: t("items.category6.name"),
      description: t("items.category6.description"),
      image: "/category/Vegetables.jpg",
      category: "fruits_vegetables",
    },
    {
      name: t("items.category7.name"),
      description: t("items.category7.description"),
      image: "/category/Fruits.jpg",
      category: "fruits_vegetables",
    },
    {
      name: t("items.category8.name"),
      description: t("items.category8.description"),
      image: "/category/Canned Goods.jpg",
      category: "canned_goods",
    },
    {
      name: t("items.category9.name"),
      description: t("items.category9.description"),
      image: "/category/Beverages.jpg",
      category: "beverages",
    },
    {
      name: t("items.category10.name"),
      description: t("items.category10.description"),
      image: "/category/Frozen Foods.jpg",
      category: "frozen_foods",
    },
    {
      name: t("items.category11.name"),
      description: t("items.category11.description"),
      image: "/category/Dairy.jpg",
      category: "dairy",
    },
    {
      name: t("items.category12.name"),
      description: t("items.category12.description"),
      image: "/category/Pasta.jpg",
      category: "pasta",
    },
    {
      name: t("items.category13.name"),
      description: t("items.category13.description"),
      image: "/category/Halva.jpg",
      category: "halva",
    },
    {
      name: t("items.category14.name"),
      description: t("items.category14.description"),
      image: "/category/Cheese.jpg",
      category: "dairy",
    },
    {
      name: t("items.category15.name"),
      description: t("items.category15.description"),
      image: "/category/Oils.jpg",
      category: "oils",
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (scrollContainerRef.current && filteredProducts.length > 0) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedCategory, filteredProducts.length]);

  return (
    <section className="products-section">
      <div className="section-header-container">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t("title")}</h2>
            <p className="section-subtitle">{t("subtitle")}</p>
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
        </div>
      </div>

      <div className="products-slider-wrapper">
        <button 
          className="slider-btn slider-btn-left" 
          onClick={scrollLeft}
          aria-label="Previous"
        >
          ‹
        </button>
        
        <div className="products-slider" ref={scrollContainerRef}>
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={`${product.name}-${index}`}>
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
              </div>
            </div>
          ))}
        </div>

        <button 
          className="slider-btn slider-btn-right" 
          onClick={scrollRight}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default ProductsSection;
