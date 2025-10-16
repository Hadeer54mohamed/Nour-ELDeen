"use client";
import React from "react";
import Image from "next/image";
import "../../styles/about.scss";

const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image">
            <Image
              src="/images/hero/slide.png"
              alt="صورة توضيحية عن شركة نور الدين"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="about-content">
            <h3 className="about-subtitle">قصتنا</h3>
            <h1 className="about-title">
              منذ عام 1920 — جودة تُورّث جيل بعد جيل
            </h1>
            <p className="about-description">
              بدأت رحلة <strong>نور الدين</strong> من قلب مدينة طنطا، كشغف صغير
              لتقديم منتجات غذائية أصيلة ومذاق لا يُنسى. على مدار أكثر من مائة
              عام، أصبحنا علامة موثوقة لكل بيت مصري، بمنتجات تجمع بين الأصالة
              والجودة.
            </p>

            <p className="about-description">
              نعمل اليوم بفروعنا المتعددة على توفير أفضل المواد الغذائية الطازجة
              والمستوردة، مع الالتزام الكامل بخدمة عملائنا وتلبية احتياجاتهم
              بأعلى معايير الجودة.
            </p>

            <blockquote className="about-quote">
              "منذ 1920.. نحافظ على طعم الأصالة في كل منتج نقدمه."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
