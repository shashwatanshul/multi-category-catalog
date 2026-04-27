import Link from 'next/link';
import { getItemBySlug, getAllItems } from '@/lib/data';
import { notFound } from 'next/navigation';
import styles from '@/styles/DetailPage.module.css';

export async function generateStaticParams() {
  const items = getAllItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ItemDetail({ params }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  if (!item) {
    return notFound();
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Link href="/" className={styles.backLink}>
          &larr; Back to Catalog
        </Link>

        <div className={styles.contentGrid}>
          {/* Left Side: Image */}
          <div className={`${styles.imageSection} glass`}>
            <div className={styles.imageContainer}>
              <img 
                src={item.image} 
                alt={item.itemname} 
                className={styles.mainImage}
              />
            </div>
            <div className={styles.categoryBadge}>{item.category}</div>
          </div>

          {/* Right Side: Details */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>{item.itemname}</h1>
            <p className={styles.categoryLabel}>Category: <span>{item.category}</span></p>
            
            <div className={styles.propertiesContainer}>
              <h2 className={styles.propsTitle}>Technical Specifications</h2>
              <div className={styles.propsGrid}>
                {item.itemprops.map((prop, idx) => (
                  <div key={idx} className={`${styles.propCard} glass`}>
                    <span className={styles.propLabel}>{prop.label}</span>
                    <span className={styles.propValue}>{prop.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
