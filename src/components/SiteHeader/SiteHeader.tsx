"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavLink } from "@/components/NavLink";
import type { SiteSettings } from "@/lib/types";
import styles from "./SiteHeader.module.scss";

type SiteHeaderProps = {
  artistName: string;
  brandLogo?: SiteSettings["brandLogo"];
  navLabels?: SiteSettings["navLabels"];
};

export function SiteHeader({ artistName, brandLogo, navLabels }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links = [
    { href: "/", label: navLabels?.home || "Home" },
    { href: "/gallery", label: navLabels?.gallery || "Gallery" },
    { href: "/about", label: navLabels?.about || "About" },
    { href: "/contact", label: navLabels?.contact || "Contact" },
  ];

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 0);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {brandLogo ? (
            <Image
              src={brandLogo.src}
              alt={brandLogo.alt}
              width={brandLogo.width || 180}
              height={brandLogo.height || 72}
              className={styles.logo}
              priority
            />
          ) : (
            artistName
          )}
        </Link>
        <button
          className={styles.menuButton}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="site-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <span key={link.href} onClick={() => setIsMenuOpen(false)}>
              <NavLink href={link.href} label={link.label} />
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
