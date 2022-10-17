import { clsx } from "clsx";
import { useRouter } from "next/router";
import Link, { type LinkProps } from "./Link";
import css from "styles/components/navlink.module.scss";

export interface NavLinkProps extends LinkProps {}

export default function NavLink({
  to,
  children,
  className,
  ...props
}: LinkProps) {
  const isActive = useRouter().pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        css["nav-link"],
        isActive && css["nav-link--active"],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
