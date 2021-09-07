import React from 'react';

import { AppBar } from '@/ui/components/common/AppBar';
import { Footer } from '@/ui/components/common/Footer';

import styles from './Layout.module.css';

type Props = {
  children: JSX.Element;
};

export function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <AppBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
