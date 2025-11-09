"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import "../../../styles/careers.scss";
import {
  FileText,
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const CareersPage = () => {
  const t = useTranslations("careers");
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    position: "",
    otherPosition: "",
    militaryStatus: "",
    coverLetter: "",
    cvLink: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const otherPositionValue = t("positionOther");

    setFormData((prev) => {
      if (name === "position") {
        return {
          ...prev,
          position: value,
          otherPosition:
            value === otherPositionValue ? prev.otherPosition : "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false);

    if (!formData.cvLink || !/^https?:\/\//i.test(formData.cvLink)) {
      setErrorMessage(t("invalidCvLink"));
      return;
    }

    const otherPositionValue = t("positionOther");
    if (
      formData.position === otherPositionValue &&
      !formData.otherPosition.trim()
    ) {
      setErrorMessage(t("otherPositionRequired"));
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage(t("configurationError"));
      return;
    }

    if (!formRef.current) {
      setErrorMessage(t("submitError"));
      return;
    }

    setIsSubmitting(true);

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setShowSuccess(true);
        setErrorMessage("");
        setFormData({
          fullName: "",
          address: "",
          email: "",
          phone: "",
          position: "",
          otherPosition: "",
          militaryStatus: "",
          coverLetter: "",
          cvLink: "",
        });
        formRef.current?.reset();

        window.setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setErrorMessage(t("submitError"));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="careers-section">
      <div className="container">
        <div className="careers-header">
          <h3 className="careers-subtitle">{t("subtitle")}</h3>
          <h2 className="careers-title">{t("title")}</h2>
          <p className="careers-description">{t("description")}</p>
        </div>

        <div className="careers-wrapper">
          <div className="careers-info">
            <div className="info-card">
              <User size={24} />
              <h4>{t("infoTitle")}</h4>
              <p>{t("infoDescription")}</p>
            </div>
            <div className="info-card">
              <Briefcase size={24} />
              <h4>{t("benefitsTitle")}</h4>
              <ul>
                <li>{t("benefit1")}</li>
                <li>{t("benefit2")}</li>
                <li>{t("benefit3")}</li>
                <li>{t("benefit4")}</li>
              </ul>
            </div>
            <div className="info-card">
              <Award size={24} />
              <h4>{t("requirementsTitle")}</h4>
              <ul>
                <li>{t("requirement1")}</li>
                <li>{t("requirement2")}</li>
                <li>{t("requirement3")}</li>
              </ul>
            </div>
          </div>

          <form
            ref={formRef}
            className="careers-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <label htmlFor="fullName">
                <User size={16} />
                {t("fullNameLabel")} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder={t("fullNamePlaceholder")}
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">
                <MapPin size={16} />
                {t("addressLabel")} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder={t("addressPlaceholder")}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
            <div className="form-group">
                <label htmlFor="email">
                  <Mail size={16} />
                  {t("emailLabel")}{" "}
                  <span className="optional">({t("optionalLabel")})</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <Phone size={16} />
                  {t("phoneLabel")} <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("phonePlaceholder")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">
                  <Briefcase size={16} />
                  {t("positionLabel")} <span className="required">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t("positionPlaceholder")}</option>
                  <option value={t("positionSales")}>{t("positionSales")}</option>
                  <option value={t("positionCashier")}>
                    {t("positionCashier")}
                  </option>
                  <option value={t("positionWarehouse")}>
                    {t("positionWarehouse")}
                  </option>
                  <option value={t("positionManager")}>
                    {t("positionManager")}
                  </option>
                  <option value={t("positionDriver")}>{t("positionDriver")}</option>
                  <option value={t("positionOther")}>{t("positionOther")}</option>
                </select>
              </div>

              {formData.position === t("positionOther") && (
                <div className="form-group">
                  <label htmlFor="otherPosition">
                    <Briefcase size={16} />
                    {t("otherPositionLabel")} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherPosition"
                    name="otherPosition"
                    placeholder={t("otherPositionPlaceholder")}
                    value={formData.otherPosition}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="militaryStatus">
                  <ShieldCheck size={16} />
                  {t("militaryStatusLabel")} <span className="required">*</span>
                </label>
                <select
                  id="militaryStatus"
                  name="militaryStatus"
                  value={formData.militaryStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t("militaryStatusPlaceholder")}</option>
                  <option value={t("militaryStatusCompleted")}>
                    {t("militaryStatusCompleted")}
                  </option>
                  <option value={t("militaryStatusExempted")}>
                    {t("militaryStatusExempted")}
                  </option>
                  <option value={t("militaryStatusPostponed")}>
                    {t("militaryStatusPostponed")}
                  </option>
                  <option value={t("militaryStatusServing")}>
                    {t("militaryStatusServing")}
                  </option>
                  <option value={t("militaryStatusNotApplicable")}>
                    {t("militaryStatusNotApplicable")}
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cv">
                <FileText size={16} />
                {t("cvLabel")} <span className="required">*</span>
              </label>
              <input
                type="url"
                id="cv"
                name="cvLink"
                placeholder={t("cvPlaceholder")}
                value={formData.cvLink}
                onChange={handleInputChange}
                required
              />
              <input type="hidden" name="cvLinkHref" value={formData.cvLink} />
              <input
                type="hidden"
                name="positionDisplay"
                value={
                  formData.position === t("positionOther") &&
                  formData.otherPosition
                    ? formData.otherPosition
                    : formData.position
                }
              />
              <small className="file-hint">{t("cvHint")}</small>
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">
                <FileText size={16} />
                {t("coverLetterLabel")}
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                placeholder={t("coverLetterPlaceholder")}
                rows="5"
                value={formData.coverLetter}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submittingButton") : t("submitButton")}
            </button>
            {errorMessage && (
              <div className="error-message" role="alert">
                {errorMessage}
              </div>
            )}
            {showSuccess && (
              <div className="success-message" role="status">
                ✓ {t("successMessage")}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CareersPage;


