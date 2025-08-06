import { useTexts } from '@/ui/hooks/useTexts';
import styles from './ViewDetails.module.css';

export default function ViewDetails() {
  const { getCommonText } = useTexts();
  
  return (
    <footer className={styles.footer}>
      <span className={`${styles.cta} view-details-cta`}>{getCommonText('viewDetails')} →</span>
    </footer>
  );
}
