import Link from "next/link";

const navLinks = [
  { href: "/researchers", label: "Researchers" },
  { href: "/practitioners", label: "Practitioners" },
  { href: "/stakeholders", label: "Stakeholders" },
  { href: "/protocols", label: "Protocols" },
];

export function Header() {
  return (
    <header className="border-b border-neutral/20 bg-neutral-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Text wordmark — no BYU-Idaho logo per spec */}
        <Link
          href="/"
          className="font-heading text-xl font-semibold text-primary-dark"
        >
          Learning Library
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-black sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
