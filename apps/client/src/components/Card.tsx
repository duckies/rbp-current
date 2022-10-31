import clsx from 'clsx';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> { }

export interface CardTitleProps extends React.ComponentPropsWithoutRef<'h3'> { }
export interface CardCaptionProps extends React.ComponentPropsWithoutRef<'p'> { }

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return <h3 className={clsx('title ~color|250ms f:22 f:semibold', className)} {...props}>{children}</h3>;
}

export function CardCaption({ children, className, ...props }: CardCaptionProps) {
  return <p className={clsx('caption ~color|250ms my:16 font:gray-80', className)} {...props}>{children}</p>;
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={clsx('p:32 bg:gray-10 r:10 box-shadow:0|10|8|rgb(0,0,0/0.4) box-shadow:0|4|3|rgb(0,0,0,0.1)', className)} {...props}>
      {children}
    </div>
  );
}

Card.Title = CardTitle;
Card.Caption = CardCaption;
