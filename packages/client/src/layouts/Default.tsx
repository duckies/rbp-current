import Image from 'next/future/image';
import Footer from 'components/Footer';
import background from 'public/images/login-screen.webp';
import Header from 'components/Header';
import Container from 'components/Container';

export interface DefaultLayoutProps {
  children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />

      <div className="absolute top-0 right-0 bottom-0 left-0 -z-10 before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-10 bg-gradient-to-tr from-gray-900 to-gray-800 to-gray-800/35">
        <Image
          className="object-cover w-full h-full"
          src={background}
          alt=""
          priority
        />
      </div>

      <Container>{children}</Container>

      <Footer />
    </>
  );
}
