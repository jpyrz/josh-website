"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.scss";

type NavLinkProps = {
  href: string;
  label: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`) || (href === "/gallery" && pathname.startsWith("/artwork/"));

  return (
    <Link href={href} className={`${styles.link} ${isActive ? styles.active : ""}`} aria-current={isActive ? "page" : undefined}>
      {label}
    </Link>
  );
}
