import Image from 'next/image';
import valdrakken from 'public/images/login-screen.webp';
import Header from 'components/Header';
import styles from 'styles/layouts/default.module.scss';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <div className={styles.layout__background}>
          <Image src={valdrakken} layout="fill" objectFit="cover" alt="" />
        </div>

        <div className={styles.layout__content}>{children}</div>
      </div>
    </>
  );
}
