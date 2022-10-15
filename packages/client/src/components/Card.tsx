import clsx from 'clsx';
import css from 'styles/components/Card.module.scss';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Card(props: CardProps) {
  return (
    <div className={clsx(css.card, props.className)}>{props.children}</div>
  );
}
