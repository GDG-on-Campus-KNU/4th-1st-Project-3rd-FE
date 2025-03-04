import { PropsWithChildren } from 'react';

import styles from './layout.module.css';

// function MUMobileLayout() {
//   const [isOpened, setIsOpened] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsOpened((prev) => !prev)}>O</button>
//     </div>
//   );
// }

export default function MUMainLayout({ children }: PropsWithChildren) {
  // const isMobile = checkIsMobile();
  return <section className={styles.layout}>{children}</section>;
}
