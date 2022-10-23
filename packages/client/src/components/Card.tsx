import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={clsx('p-5', className)} {...props}>
      {children}
    </div>
  );
}
