import clsx from "clsx";
import css from "styles/components/container.module.scss";

export interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}
