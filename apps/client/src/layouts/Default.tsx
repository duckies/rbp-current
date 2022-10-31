import Image from 'next/image';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Container from 'components/Container';
import background from 'public/images/noise-bg.png';

export interface DefaultLayoutProps {
  children: React.ReactNode
}

function LayoutBackground() {
  return (
    <div className="abs inset:0 h:450 h:500@lg overflow:hidden z:-1">
      <div className="abs inset:-50vw bg:linear-gradient(107.67deg,#3220FF|0%,rgba(17,31,0,0.47)|99.5%) background-blend-mode:overlay blend:normal @spin|4s|infinite" />
      <Image className="h:full w:full object:fill" src={background} alt="" priority />
      <div className="abs inset:0 bg:linear-gradient(0deg,rgb(0,0,0),rgb(0,0,0,0.05)|75%)" />
    </div>
  );
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <LayoutBackground />
      <Container className="min-h:700">{children}</Container>
      <Footer />
    </>
  );
}
