import { PropsWithChildren } from 'react';

import styles from './layout.module.css';

export default function MainLayout({ children }: PropsWithChildren) {
  return <section className={styles.layout}>{children}</section>;
}
