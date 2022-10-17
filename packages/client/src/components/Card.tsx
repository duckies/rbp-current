import css from "styles/components/card.module.scss";

export interface CardProps {
  children?: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className={css.card}>{children}</div>;
}
