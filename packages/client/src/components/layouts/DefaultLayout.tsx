import Image from 'next/image';
import dragonflight from 'public/images/dragonflight.jpg';
import Header from 'components/Header';
import styles from 'styles/layouts/DefaultLayout.module.scss';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__background}>
        <Image
          src={dragonflight}
          layout="fill"
          // priority
          placeholder="blur"
          objectFit="cover"
          alt=""
        />
      </div>

      <div className={styles.layout__content}>
        <Header />

        {children}
      </div>
    </div>
  );
}
