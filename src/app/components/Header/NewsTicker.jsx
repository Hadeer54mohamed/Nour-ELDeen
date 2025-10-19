"use client";
import { Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsTicker() {
  const t = useTranslations("newsTicker");
  
  const news = [
    t("news1"),
    t("news2"),
    t("news3"),
    t("news4"),
    t("news5"),
    t("news6"),
    t("news7"),
    t("news8"),
  ];

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
