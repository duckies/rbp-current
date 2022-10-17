import css from "styles/components/container.module.scss";

export interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  return <div className={css.container}>{props.children}</div>;
}
