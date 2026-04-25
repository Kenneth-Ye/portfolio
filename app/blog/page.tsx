"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });

const SERIF = "var(--font-serif), Lora, Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

export default function Blog() {
  return (
    <>
      <ParticleCanvas />

      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
        <div style={{ width: 560, maxWidth: "calc(100vw - 48px)", margin: "0 auto", paddingTop: 80, paddingBottom: 80, fontFamily: SANS }}>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 20, marginBottom: 32 }}>
            {[
              { label: "About", href: "/",      active: false },
              { label: "Blog",  href: "/blog",  active: true  },
            ].map(({ label, href, active }) => (
              <Link key={label} href={href}
                style={{ fontSize: 13, color: active ? "#b090d8" : "#666", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#b090d8")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = active ? "#b090d8" : "#666")}>
                {label}
              </Link>
            ))}
          </nav>

          <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#b090d8", marginBottom: 5 }}>
            Blog
          </h1>

          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b8b8b8", marginBottom: 22 }}>
            Coming soon.
          </p>

        </div>
      </div>
    </>
  );
}
