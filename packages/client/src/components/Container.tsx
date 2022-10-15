import styles from 'styles/components/Container.module.scss';

export interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  return <div className={styles.container}>{props.children}</div>;
}
