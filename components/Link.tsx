import NextLink from "next/link";
import type { ReactNode } from "react";

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/** Internal paths use next/link (client-side navigation), external URLs use a plain anchor. */
export default function Link({ to, children, className = "", onClick }: Props) {
  if (to.startsWith("http")) {
    return (
      <a className={className} href={to} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <NextLink className={className} href={to} onClick={onClick}>
      {children}
    </NextLink>
  );
}
