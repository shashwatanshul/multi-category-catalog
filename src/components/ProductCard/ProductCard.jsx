import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/ProductCard.module.css';

export default function ProductCard({ item }) {
  return (
    <Link href={`/items/${item.slug}`} className={`${styles.card} glass`}>
      <div className={styles.imageWrapper}>
        <img 
          src={item.image} 
          alt={item.itemname} 
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.categoryBadge}>{item.category}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{item.itemname}</h3>
        <span className={styles.cta}>View Details &rarr;</span>
      </div>
    </Link>
  );
}
