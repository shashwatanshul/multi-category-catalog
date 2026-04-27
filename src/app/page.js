"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { getCategories } from '@/lib/data';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from '@/styles/page.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const allCategories = useMemo(() => getCategories(), []);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [isMobileView, setIsMobileView] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const isProgrammaticSlide = useRef(false);
  const buttonRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth <= 768);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const filterOptions = useMemo(() => ['All', ...allCategories.map(c => c.name)], [allCategories]);

  useEffect(() => {
    if (swiperInstance && activeCategory) {
      const index = filterOptions.indexOf(activeCategory);
      const isCurrentlyOnTarget = (swiperInstance.realIndex % filterOptions.length) === index;
      
      if (index !== -1 && !isCurrentlyOnTarget && !swiperInstance.animating && !swiperInstance?.touchEventsData?.isTouched) {
        isProgrammaticSlide.current = true;
        swiperInstance.slideToLoop(index);
      }
    }
  }, [activeCategory, swiperInstance, filterOptions]);

  const updateIndicator = () => {
    if (!isMobileView && buttonRefs.current[activeCategory]) {
      const btn = buttonRefs.current[activeCategory];
      setIndicatorStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [activeCategory, isMobileView]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeCategory, isMobileView]);

  // Determine which categories to display
  const displayedCategories = activeCategory === 'All' 
    ? allCategories 
    : allCategories.filter(cat => cat.name === activeCategory);

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={`${styles.title} animate-fade`}>
            Modern <span className={styles.gradientText}>Catalog</span> Experience
          </h1>
          <p className={`${styles.subtitle} animate-fade`}>
            Explore cutting-edge technology and precision engineering across multiple dynamic categories.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterWrapper}>
            {isMobileView ? (
              <div className={styles.pillSwiperWrapper}>
                <div className={styles.stationaryPillIndicator}></div>
                <Swiper
                  onSwiper={setSwiperInstance}
                  centeredSlides={false}
                  slidesPerView={3}
                  loop={true}
                  watchSlidesProgress={true}
                  initialSlide={filterOptions.indexOf(activeCategory)}
                  onSlideChange={(swiper) => {
                    if (isProgrammaticSlide.current) {
                      isProgrammaticSlide.current = false;
                      return;
                    }
                    const actualIndex = swiper.realIndex % filterOptions.length;
                    const newCat = filterOptions[actualIndex];
                    if (newCat !== activeCategory) {
                      setActiveCategory(newCat);
                    }
                  }}
                  className={styles.typeSwiper}
                >
                  {((filterOptions.length < 6 ? [...filterOptions, ...filterOptions] : filterOptions)).map((opt, index) => (
                    <SwiperSlide key={"swiper-" + index} className={styles.typeSlide}>
                      {({ isActive, progress }) => {
                        const influence = 1 - Math.min(1, Math.abs(progress));
                        const targetR = 255, targetG = 255, targetB = 255; // White
                        const startR = 138, startG = 43, startB = 226; // var(--primary) (#8a2be2)
                        const r = Math.round(startR + (targetR - startR) * influence);
                        const g = Math.round(startG + (targetG - startG) * influence);
                        const b = Math.round(startB + (targetB - startB) * influence);
                        const interpolatedColor = `rgb(${r}, ${g}, ${b})`;

                        return (
                          <div 
                            className={`${styles.typeItem} ${isActive ? styles.activeType : ""}`}
                            style={{ color: interpolatedColor }}
                            onClick={() => {
                              if (swiperInstance) {
                                swiperInstance.slideToLoop(index % filterOptions.length);
                              }
                            }}
                          >
                            {opt}
                          </div>
                        );
                      }}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className={`${styles.filterContainer} glass`}>
                <div className={styles.filterSlider} style={indicatorStyle}></div>
                <button 
                  ref={el => buttonRefs.current['All'] = el}
                  className={`${styles.filterBtn} ${activeCategory === 'All' ? styles.activeFilter : ''}`}
                  onClick={() => setActiveCategory('All')}
                >
                  All
                </button>
                {allCategories.map(c => (
                  <button 
                    key={c.name}
                    ref={el => buttonRefs.current[c.name] = el}
                    className={`${styles.filterBtn} ${activeCategory === c.name ? styles.activeFilter : ''}`}
                    onClick={() => setActiveCategory(c.name)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className={styles.catalogSection}>
        <div className="container">
          {displayedCategories.map((cat, idx) => (
            <div 
              key={cat.name} 
              className={styles.categoryGroup}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryName}>{cat.name}</h2>
                <div className={styles.divider}></div>
                <span className={styles.itemCount}>{cat.items.length} Items</span>
              </div>
              <div className={styles.grid}>
                {cat.items.map(item => (
                  <ProductCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2026 Nebula Catalog. Dynamic Frontend Assignment.</p>
        </div>
      </footer>
    </div>
  );
}
