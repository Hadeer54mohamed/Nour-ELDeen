"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function MainNavbar({ menuOpen, closeMenu }) {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <nav className="main-navbar">
      <div className="container">
        <Link href={`/${locale}`} className="logo">
          <Image
            src="/images/logo.png"
            alt="Noureldeen Logo"
            width={200}
            height={230}
            className="logo-image"
            priority
          />
          <Image
            src="/images/1920-.png"
            alt="Hotline 1920"
            width={200}
            height={200}
            className="image-1920"
          />
        </Link>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link href={`/${locale}/magazine`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/book1.png"
                  alt={t("magazine")}
                  width={24}
                  height={24}
                />
                <span>{t("magazine")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/about`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/book.png"
                  alt={t("about")}
                  width={24}
                  height={24}
                />
                <span>{t("about")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/services`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/service.png"
                  alt={t("services")}
                  width={24}
                  height={24}
                />
                <span>{t("services")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/products`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/order.png"
                  alt={t("products")}
                  width={24}
                  height={24}
                />
                <span>{t("products")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/contact`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/24-7.png"
                  alt={t("contact")}
                  width={24}
                  height={24}
                />
                <span>{t("contact")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/branches`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/branches.png"
                  alt={t("branches")}
                  width={24}
                  height={24}
                />
                <span>{t("branches")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/careers`} onClick={closeMenu}>
              <div className="nav-item">
                <Image
                  src="/icons/job-description.png"
                  alt={t("careers")}
                  width={24}
                  height={24}
                />
                <span>{t("careers")}</span>
              </div>
            </Link>
          </li>
        </ul>
        {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        <div className="hotline">
          {/*           <span className="label">{t("callUs")}</span>
           */}

          <a href="tel:01151662662">
            <Image
              src="/icons/delivery.jpg"
              alt="phone"
              width={240}
              height={97}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
