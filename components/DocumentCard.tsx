import Link from "next/link";

export interface DocumentCardProps {
  /** Where the card links to — a document, quick dive, practice guide, etc. */
  href: string;
  title: string;
  /** Short label shown as a badge, e.g. "Deep Dive", "Quick Dive", "Practice Guide". */
  typeLabel: string;
  excerpt?: string;
}

/**
 * Reusable listing card — shared across Researchers, Practitioners, and
 * Stakeholders listing views (Build Checklist 3.4). Keep this the single
 * source of truth for "what a document/resource looks like in a list" so
 * the three sections stay visually consistent.
 */
export function DocumentCard({
  href,
  title,
  typeLabel,
  excerpt,
}: DocumentCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-neutral/20 bg-neutral-white p-5 transition-shadow hover:shadow-md"
    >
      <span className="inline-block rounded-full bg-primary-light/40 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-primary-dark">
        {typeLabel}
      </span>
      <h3 className="mt-3 font-heading text-lg font-semibold text-neutral-black group-hover:text-primary">
        {title}
      </h3>
      {excerpt && (
        <p className="mt-2 line-clamp-3 text-sm text-neutral">{excerpt}</p>
      )}
    </Link>
  );
}
