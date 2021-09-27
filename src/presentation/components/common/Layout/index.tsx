import { AppBar } from '@/presentation/components/common/AppBar';
import { Footer } from '@/presentation/components/common/Footer';

import styles from './Layout.module.css';

type LayoutProps = {
  children: JSX.Element;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <AppBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
