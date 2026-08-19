export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral/20 bg-neutral-white">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-neutral">
        <p>&copy; {year} Learning Library — a BYU-Idaho research lab project.</p>
      </div>
    </footer>
  );
}
