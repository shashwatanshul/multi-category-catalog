import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`${styles.nav}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.brand}>Nebula</span>Catalog
        </Link>
        <div className={styles.links}>
          <Link href="/#categories" className={styles.link}>Categories</Link>
        </div>
      </div>
    </nav>
  );
}
