import React from 'react';
import styles from './HomePage.module.css';
import { useTexts } from '../../hooks/useTexts';

export default function HomePage() {
  const { getHomeText } = useTexts();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        {getHomeText('title')}
      </h1>
      <section>
        <p className={styles.description}>
          {getHomeText('description')}
        </p>
      </section>
    </main>
  );
}
