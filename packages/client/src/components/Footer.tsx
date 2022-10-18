import Container from "./Container";
import css from "styles/components/footer.module.scss";

export function Footer() {
  return (
    <footer className={css.footer}>
      <Container className={css.content}>
        <div>First</div>

        <div>Second</div>

        <div>Third</div>
        <div className={css.bottom}>Credits or whatever</div>
      </Container>
    </footer>
  );
}
