"use client";

import Link from "next/link";
import { BookOpen, House, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Inicio", icon: House },
  { href: "/dashboard/cursos", label: "Cursos", icon: BookOpen },
  { href: "/dashboard/chat", label: "Chat", icon: MessageCircle },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="dashboard-nav dashboard-sidebar-nav" aria-label="Navegacion principal">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/dashboard"
          ? pathname === href
          : pathname.startsWith(href);

        return (
          <Link
            key={href}
            className={`dashboard-nav-link${active ? " is-active" : ""}`}
            href={href}
            aria-current={active ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
            <span className="dashboard-nav-tooltip">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
