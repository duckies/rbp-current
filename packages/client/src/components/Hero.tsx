import Container from 'components/Container';
import styles from 'styles/components/Hero.module.scss';

export interface HeroProps {
  children: React.ReactNode;
}

export default function Hero(props: HeroProps) {
  return (
    <Container>
      <section className={styles.hero}>{props.children}</section>
    </Container>
  );
}
