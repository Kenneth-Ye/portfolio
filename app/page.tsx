"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });

const SERIF = "var(--font-serif), Lora, Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

/* ── Data ────────────────────────────────────────────────────── */

const INCOMING = [
  {
    org: "Amazon Web Services",
    href: "https://aws.amazon.com",
    role: "Software Engineer Intern — DynamoDB",
    favicon: "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64",
  },
  {
    org: "Coinbase",
    href: "https://coinbase.com",
    role: "Software Engineer Intern — Developer Platform",
    favicon: "https://www.google.com/s2/favicons?domain=coinbase.com&sz=64",
    faviconBg: "#fff",
  },
];

const EXPERIENCE = [
  {
    org: "Shopify",
    href: "https://shopify.com",
    role: "Software Engineer Intern — Channels Platform",
    period: "Sep – Dec 2025",
    favicon: "https://www.google.com/s2/favicons?domain=shopify.com&sz=64",
  },
  {
    org: "Shopify",
    href: "https://shopify.com",
    role: "Software Engineer Intern — Developer Platform",
    period: "Jan – Apr 2025",
    favicon: "https://www.google.com/s2/favicons?domain=shopify.com&sz=64",
  },
  {
    org: "Chemsyn",
    href: "#",
    role: "Software Engineer",
    period: "Aug – Oct 2024",
    favicon: null as string | null,
    badge: { l: "C", bg: "#4a4a5a" },
  },
  {
    org: "IDI-Itech Development",
    href: "#",
    role: "Full Stack Developer",
    period: "May – Aug 2024",
    favicon: null as string | null,
    badge: { l: "I", bg: "#3a5a6a" },
  },
];

const PROJECTS = [
  { name: "ShoPacks",   href: "https://github.com/YashK2005/shoPacks", desc: "Won 1st place at Shopify Internal Hackathon",                  stat: "$1,000" },
  { name: "Syntaxtual", href: "https://github.com/Duo-Keyboard-Koalition/Syntaxtual-Backend", desc: "Won 1st place at Cohere × OpenSesame Agentic Builder Day",     stat: "$400"   },
  { name: "ChariTree",  href: "https://github.com/Kenneth-Ye/ChariTree", desc: "Won Most Innovative Subnet Idea at HawkHacks 2024",            stat: "$1,700" },
];

/* ── Shared primitives ───────────────────────────────────────── */

function Favicon({ src, alt, bg }: { src: string; alt: string; bg?: string }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={bg ? 13 : 18} height={bg ? 13 : 18}
      style={{ display: "block", flexShrink: 0 }} />
  );
  if (bg) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 18, height: 18, borderRadius: 3, background: bg,
        flexShrink: 0, verticalAlign: "middle",
      }}>
        {img}
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, flexShrink: 0, verticalAlign: "middle", borderRadius: 3, overflow: "hidden" }}>
      {img}
    </span>
  );
}

function LetterBadge({ l, bg }: { l: string; bg: string }) {
  return (
    <span aria-hidden style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 18, height: 18, borderRadius: 3,
      fontSize: 8, fontWeight: 700, fontFamily: "system-ui, sans-serif",
      lineHeight: 1, color: "#fff", background: bg, flexShrink: 0,
    }}>{l}</span>
  );
}

function Lnk({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ color: "#d4d4d4", textDecoration: "underline", textDecorationColor: "rgba(212,212,212,0.28)", textUnderlineOffset: "3px", transition: "color 0.15s" }}
      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#fff")}
      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#d4d4d4")}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, fontWeight: 600, color: "#a084cc", marginBottom: 12 }}>
      {children}
    </p>
  );
}

const Arrow = () => <span style={{ color: "#686868", fontSize: 13, flexShrink: 0 }}>↳</span>;
const Dot   = () => <span style={{ color: "#3a3a3a" }}>·</span>;

/* ── Page ────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <ParticleCanvas />

      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
        <div style={{ width: 560, maxWidth: "calc(100vw - 48px)", margin: "0 auto", paddingTop: 80, paddingBottom: 80, fontFamily: SANS }}>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            {[
              { label: "About", href: "#",      active: true  },
              { label: "Blog",  href: "/blog",  active: false },
            ].map(({ label, href, active }) => (
              <Link key={label} href={href}
                style={{ fontSize: 13, color: active ? "#b090d8" : "#666", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#b090d8")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = active ? "#b090d8" : "#666")}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Name */}
          <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#b090d8", marginBottom: 5 }}>
            Kenneth Ye
          </h1>

          {/* Bio */}
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b8b8b8", marginBottom: 22 }}>
            I build any type of software at a startup and enterprise scale. Currently exploring AI/ML infra and scalable backend systems.
          </p>

          {/* Education */}
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
            <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888" }}>
              <span style={{ color: "#444", fontSize: 10, flexShrink: 0 }}>✦</span>
              <Favicon src="https://www.google.com/s2/favicons?domain=uwaterloo.ca&sz=64" alt="University of Waterloo" />
              <span>
                Bachelor of Computer Science (Co-op) —{" "}
                <Lnk href="https://uwaterloo.ca" external>University of Waterloo</Lnk>
              </span>
            </li>
          </ul>

          {/* Incoming */}
          <section style={{ marginBottom: 36 }}>
            <SectionLabel>incoming:</SectionLabel>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {INCOMING.map((e, i) => (
                <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Arrow />
                  <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 5, fontSize: 14.5 }}>
                    <Favicon src={e.favicon} alt={e.org} bg={"faviconBg" in e ? e.faviconBg : undefined} />
                    <span style={{ color: "#d4d4d4" }}>{e.org}</span>
                    <Dot />
                    <span style={{ color: "#888" }}>{e.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Experience */}
          <section style={{ marginBottom: 36 }}>
            <SectionLabel>experience:</SectionLabel>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {EXPERIENCE.map((e, i) => (
                <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Arrow />
                  <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 5, fontSize: 14.5 }}>
                    {e.favicon
                      ? <Favicon src={e.favicon} alt={e.org} />
                      : "badge" in e && e.badge && <LetterBadge l={e.badge.l} bg={e.badge.bg} />}
                    <span style={{ color: "#d4d4d4" }}>{e.org}</span>
                    <Dot />
                    <span style={{ color: "#888" }}>{e.role}</span>
                    <span style={{ color: "#484848", fontSize: 13 }}>· {e.period}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section id="projects" style={{ marginBottom: 32 }}>
            <SectionLabel>projects:</SectionLabel>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {PROJECTS.map(({ name, href, desc, stat }) => (
                <li key={name} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Arrow />
                  <span style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 4, fontSize: 14.5 }}>
                    <Lnk href={href}>{name}</Lnk>
                    <span style={{ color: "#3a3a3a" }}>—</span>
                    <span style={{ color: "#888" }}>{desc}</span>
                    {stat && <span style={{ color: "#4a4a4a", fontSize: 13 }}>· {stat}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <footer style={{ display: "flex", gap: 20 }}>
            {[
              { label: "GitHub",   href: "https://github.com/kenneth-ye" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/kenneth-ye/"          },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, color: "#666", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#c8c8c8")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#666")}>
                {label}
              </a>
            ))}
          </footer>

        </div>
      </div>
    </>
  );
}
