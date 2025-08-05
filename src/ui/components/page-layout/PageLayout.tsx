import { useTexts } from '@/ui/hooks/useTexts';
import Link from 'next/link';
import styles from './PageLayout.module.css';
import type { PageLayoutProps } from './PageLayout.types';

export default function PageLayout({
  children,
  aside,
  footer,
}: PageLayoutProps) {
  const { getHomeText } = useTexts();

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.navButton}>
          <h1 className={styles.title}>{getHomeText('title')}</h1>
        </Link>
        {aside}
      </aside>
      <section className={styles.children}>{children}</section>
      {footer}
    </main>
  );
}
