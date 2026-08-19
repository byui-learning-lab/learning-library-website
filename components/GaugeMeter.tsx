export interface GaugeMeterProps {
  label: string;
  /** Rating value, expected 1–5 per the Quick Dive / Practice Guide schemas. */
  value: number;
  max?: number;
}

/**
 * Simple horizontal bar/meter for the 1–5 gauge ratings used by Quick
 * Dives (consensus, assumptions, evidence, disagreement) and Practice
 * Guides (Build Checklist 3.5). Intentionally plain for now — refine
 * visually once real ratings are in front of it.
 */
export function GaugeMeter({ label, value, max = 5 }: GaugeMeterProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = (clamped / max) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm font-medium text-neutral-black">
        <span>{label}</span>
        <span className="text-neutral">
          {clamped} / {max}
        </span>
      </div>
      <div
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral/20"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
