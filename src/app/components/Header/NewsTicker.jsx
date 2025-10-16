"use client";
import { useState } from "react";
import { Newspaper } from "lucide-react";

export default function NewsTicker() {
  const [news] = useState([
    "مرحباً بكم في نور الدين - أفضل مكان لتسوق المواد الغذائية 👋",
    "تجدونا الآن في طنطا – الغربية ❤️",
    "فرع أول: شارع أول البحر 🌊",
    "فرع ثاني: الاستاد 🏟️",
    "خدمة متوفرة على مدار 24 ساعة يومياً ⏰",
    "منتجات طازجة وجودة مضمونة دائماً 🛒",
    "نور الدين في خدمتك في أي وقت 🤝",
    "عروض خاصة كل أسبوع 🎉",
  ]);

  return (
    <div className="news-ticker">
      <div className="container">
        <div className="icon">
          <Newspaper size={20} />
        </div>
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {[...news, ...news, ...news, ...news].map((item, index) => (
              <span key={index} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
