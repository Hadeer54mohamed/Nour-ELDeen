"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { client, urlFor } from "../../../lib/sanity";
import "../../../styles/magazine.scss";

const MagazinePage = () => {
  const t = useTranslations("magazine");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [hoverArea, setHoverArea] = useState(null);
  const [curlIntensity, setCurlIntensity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [pages, setPages] = useState([]);
  const [magazineTitle, setMagazineTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Check if mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch magazine data from Sanity
  useEffect(() => {
    const fetchMagazineData = async () => {
      try {
        const query = `*[_type == "magazine" && isActive == true] | order(publishedAt desc)[0] {
          title,
          pages[]
        }`;

        const data = await client.fetch(query);

        if (data && data.pages && data.pages.length > 0) {
          // Convert Sanity images to URLs
          const imageUrls = data.pages.map((image) => urlFor(image).url());

          setPages(imageUrls);
          setMagazineTitle(data.title || t("title"));
        } else {
          // Fallback to default images if no data in Sanity
          setPages([
            "/magazine/1.jpg",
            "/magazine/2.jpg",
            "/magazine/3.jpg",
            "/magazine/4.jpg",
            "/magazine/5.jpg",
            "/magazine/6.jpg",
            "/magazine/7.jpg",
            "/magazine/8.jpg",
            "/magazine/9.jpg",
            "/magazine/10.jpg",
          ]);
        }
      } catch (error) {
        console.error("Error fetching magazine data:", error);
        // Fallback to default images
        setPages([
          "/magazine/1.jpg",
          "/magazine/2.jpg",
          "/magazine/3.jpg",
          "/magazine/4.jpg",
          "/magazine/5.jpg",
          "/magazine/6.jpg",
          "/magazine/7.jpg",
          "/magazine/8.jpg",
          "/magazine/9.jpg",
          "/magazine/10.jpg",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazineData();
  }, [locale, t]);

  const totalPages = isMobile ? pages.length : Math.ceil(pages.length / 2);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detect fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const nextPage = useCallback(() => {
    const maxPage = isMobile
      ? pages.length - 1
      : Math.ceil(pages.length / 2) - 1;
    if (isFlipping || currentPage >= maxPage) return;
    setIsFlipping(true);
    setFlipDirection("next");
    setHoverArea(null);
    setCurlIntensity(0);

    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 400);
    }, 400);
  }, [currentPage, isFlipping, isMobile, pages.length]);

  const prevPage = useCallback(() => {
    if (isFlipping || currentPage <= 0) return;
    setIsFlipping(true);
    setFlipDirection("prev");
    setHoverArea(null);
    setCurlIntensity(0);

    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 400);
    }, 400);
  }, [currentPage, isFlipping]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || isFlipping) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const bookWidth = rect.width;
      const bookHeight = rect.height;

      // Check if mouse is in right half (next page area)
      if (x > bookWidth / 2 && currentPage < totalPages - 1) {
        setHoverArea("next");
        const distanceFromEdge = Math.min(x - bookWidth / 2, 200);
        const intensity = Math.min(distanceFromEdge / 200, 0.9);
        setCurlIntensity(intensity);
      }
      // Check if mouse is in left half (prev page area)
      else if (x < bookWidth / 2 && currentPage > 0) {
        setHoverArea("prev");
        const distanceFromEdge = Math.min(bookWidth / 2 - x, 200);
        const intensity = Math.min(distanceFromEdge / 200, 0.9);
        setCurlIntensity(intensity);
      } else {
        setHoverArea(null);
        setCurlIntensity(0);
      }
    },
    [isMobile, isFlipping, currentPage, totalPages]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setHoverArea(null);
    setCurlIntensity(0);
  }, [isMobile]);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (!e.changedTouches[0]) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          prevPage();
        } else {
          nextPage();
        }
      }
    },
    [nextPage, prevPage]
  );

  const getLeftPageIndex = () => (isMobile ? currentPage : currentPage * 2);
  const getRightPageIndex = () =>
    isMobile ? currentPage + 1 : currentPage * 2 + 1;
  const getMobileTotalPages = () => pages.length;

  const downloadPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      let pdfInitialized = false;

      // تحميل جميع الصور وإضافتها إلى PDF واحد
      for (let i = 0; i < pages.length; i++) {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";

          img.onload = () => {
            try {
              const imgWidth = img.naturalWidth || img.width;
              const imgHeight = img.naturalHeight || img.height;
              
              // تحميل الصورة كـ blob ثم تحويلها إلى base64
              fetch(pages[i])
                .then(response => response.blob())
                .then(blob => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const imgData = reader.result;
                    
                    if (!pdfInitialized) {
                      // تهيئة PDF بحجم الصورة الأولى
                      pdf.internal.pageSize.setWidth(imgWidth);
                      pdf.internal.pageSize.setHeight(imgHeight);
                      pdfInitialized = true;
                    }
                    
                    // إضافة صفحة جديدة إذا لم تكن الأولى
                    if (i > 0) {
                      pdf.addPage([imgWidth, imgHeight]);
                    }
                    
                    // إضافة الصورة بحجمها الأصلي بدون أي تعديل أو خلفية
                    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
                    
                    resolve();
                  };
                  reader.readAsDataURL(blob);
                })
                .catch(err => reject(err));
            } catch (err) {
              reject(err);
            }
          };
          
          img.onerror = () => reject(new Error(`Failed to load image: ${pages[i]}`));
          img.src = pages[i];
        });
      }
      
      // حفظ PDF بعد إضافة جميع الصور
      pdf.save("magazine.pdf");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إنشاء PDF. يرجى المحاولة مرة أخرى.");
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <section className="magazine-page">
        <div className="container">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <div className="magazine-wrapper">
            <div className="loading-spinner">
              <p>Loading magazine...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="magazine-page">
      <div className="container">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>

        <div className="magazine-wrapper">
          <div className="paper-bg">
            {/* Fullscreen Exit Button */}
            {isFullscreen && (
              <button
                className="fullscreen-exit-btn"
                onClick={toggleFullscreen}
                aria-label="Exit fullscreen"
              >
                ✕
              </button>
            )}
            <div
              ref={containerRef}
              className="flipbook-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Book Base */}
              <div className="book-base">
                <div className="book-spine"></div>
              </div>

              {/* Current Page Spread */}
              <div className={`page-spread ${isMobile ? "mobile-view" : ""}`}>
                {!isMobile ? (
                  <>
                    {/* Desktop: Two Pages */}
                    {/* Left Page */}
                    <div className="page-left">
                      {pages[getLeftPageIndex()] && (
                        <img
                          src={pages[getLeftPageIndex()]}
                          alt={`Page ${getLeftPageIndex() + 1}`}
                          className="page-image"
                        />
                      )}
                      {!isFlipping && currentPage > 0 && (
                        <div
                          className="hover-area hover-area-prev"
                          onMouseEnter={() => setHoverArea("prev")}
                          onMouseLeave={handleMouseLeave}
                          onClick={prevPage}
                        />
                      )}
                    </div>

                    {/* Binding Line */}
                    <div className="binding-line"></div>

                    {/* Right Page */}
                    <div className="page-right">
                      {pages[getRightPageIndex()] && (
                        <img
                          src={pages[getRightPageIndex()]}
                          alt={`Page ${getRightPageIndex() + 1}`}
                          className="page-image"
                        />
                      )}
                      {!isFlipping &&
                        currentPage < Math.ceil(pages.length / 2) - 1 && (
                          <div
                            className="hover-area hover-area-next"
                            onMouseEnter={() => setHoverArea("next")}
                            onMouseLeave={handleMouseLeave}
                            onClick={nextPage}
                          />
                        )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Mobile: Single Page */}
                    <div className="page-single">
                      {pages[getLeftPageIndex()] && (
                        <img
                          src={pages[getLeftPageIndex()]}
                          alt={`Page ${getLeftPageIndex() + 1}`}
                          className="page-image"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Page Curl Effect - Next */}
              {!isFlipping &&
                !isMobile &&
                hoverArea === "next" &&
                currentPage < Math.ceil(pages.length / 2) - 1 &&
                curlIntensity > 0 && (
                  <div
                    className="page-curl page-curl-next"
                    style={{
                      transform: `rotateY(${
                        -curlIntensity * 25
                      }deg) translateZ(${curlIntensity * 30}px)`,
                      opacity: Math.min(curlIntensity * 1.2, 1),
                    }}
                  >
                    <div className="curl-content">
                      {pages[getLeftPageIndex() + 2] && (
                        <img
                          src={pages[getLeftPageIndex() + 2]}
                          alt="Next page preview"
                          className="page-image"
                        />
                      )}
                    </div>
                    <div className="curl-shadow"></div>
                  </div>
                )}

              {/* Page Curl Effect - Prev */}
              {!isFlipping &&
                !isMobile &&
                hoverArea === "prev" &&
                currentPage > 0 &&
                curlIntensity > 0 && (
                  <div
                    className="page-curl page-curl-prev"
                    style={{
                      transform: `rotateY(${
                        curlIntensity * 25
                      }deg) translateZ(${curlIntensity * 30}px)`,
                      opacity: Math.min(curlIntensity * 1.2, 1),
                    }}
                  >
                    <div className="curl-content">
                      {pages[getRightPageIndex() - 2] && (
                        <img
                          src={pages[getRightPageIndex() - 2]}
                          alt="Previous page preview"
                          className="page-image"
                        />
                      )}
                    </div>
                    <div className="curl-shadow"></div>
                  </div>
                )}

              {/* Flipping Animation */}
              {isFlipping && (
                <>
                  {flipDirection === "next" && (
                    <div className="flipping-page flipping-next">
                      <div className="flip-front">
                        {pages[getRightPageIndex()] && (
                          <img
                            src={pages[getRightPageIndex()]}
                            alt="Flipping page"
                            className="page-image"
                          />
                        )}
                      </div>
                      <div className="flip-back">
                        {pages[getLeftPageIndex() + 2] && (
                          <img
                            src={pages[getLeftPageIndex() + 2]}
                            alt="Next page"
                            className="page-image"
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {flipDirection === "prev" && (
                    <div className="flipping-page flipping-prev">
                      <div className="flip-front">
                        {pages[getLeftPageIndex()] && (
                          <img
                            src={pages[getLeftPageIndex()]}
                            alt="Flipping page"
                            className="page-image"
                          />
                        )}
                      </div>
                      <div className="flip-back">
                        {pages[getRightPageIndex() - 2] && (
                          <img
                            src={pages[getRightPageIndex() - 2]}
                            alt="Previous page"
                            className="page-image"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flipbook-controls">
              <button
                className="control-btn"
                onClick={prevPage}
                disabled={isFlipping || currentPage === 0}
                aria-label="Previous page"
              >
                ‹
              </button>
              <div className="page-indicators">
                {Array.from({
                  length: isMobile ? pages.length : Math.ceil(pages.length / 2),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`page-dot ${
                      index === currentPage ? "active" : ""
                    }`}
                    onClick={() => {
                      if (!isFlipping) {
                        if (index > currentPage) {
                          setFlipDirection("next");
                          setIsFlipping(true);
                          setTimeout(() => {
                            setCurrentPage(index);
                            setTimeout(() => {
                              setIsFlipping(false);
                              setFlipDirection(null);
                            }, 300);
                          }, 300);
                        } else if (index < currentPage) {
                          setFlipDirection("prev");
                          setIsFlipping(true);
                          setTimeout(() => {
                            setCurrentPage(index);
                            setTimeout(() => {
                              setIsFlipping(false);
                              setFlipDirection(null);
                            }, 300);
                          }, 300);
                        }
                      }
                    }}
                    disabled={isFlipping}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <button
                className="control-btn"
                onClick={nextPage}
                disabled={
                  isFlipping ||
                  currentPage >=
                    (isMobile
                      ? pages.length - 1
                      : Math.ceil(pages.length / 2) - 1)
                }
                aria-label="Next page"
              >
                ›
              </button>
            </div>

            {/* Extra Controls */}
            {!isMobile && (
              <div className="extra-controls">
                <button
                  className="control-btn extra-btn"
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen"
                >
                  <span className="btn-icon">⛶</span>
                  <span className="btn-text">تكبير الشاشة</span>
                </button>
                <button
                  className="control-btn extra-btn"
                  onClick={downloadPDF}
                  aria-label="Download PDF"
                >
                  <span className="btn-icon">⬇</span>
                  <span className="btn-text">تنزيل</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagazinePage;
