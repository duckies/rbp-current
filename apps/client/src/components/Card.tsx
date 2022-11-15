import clsx from 'clsx';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> { }
export interface CardTitleProps extends React.ComponentPropsWithoutRef<'h3'> { }
export interface CardCaptionProps extends React.ComponentPropsWithoutRef<'p'> { }

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return <h3 className={clsx('title text-xl font-semibold', className)} {...props}>{children}</h3>;
}

export function CardCaption({ children, className, ...props }: CardCaptionProps) {
  return <p className={clsx('caption my-4 font:gray-80', className)} {...props}>{children}</p>;
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={clsx('p-8 bg-surface-700 rounded-md shadow-md', className)} {...props}>
      {children}
    </div>
  );
}

Card.Title = CardTitle;
Card.Caption = CardCaption;
