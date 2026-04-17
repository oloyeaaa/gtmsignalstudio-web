export default function AffiliateDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-cream border border-light-border rounded-lg px-4 py-3 text-xs text-text-muted ${className}`}>
      <p>
        <strong className="text-text-body">Disclosure:</strong> Some links on this page are affiliate links.
        We may earn a small commission if you purchase through them, at no extra cost to you.
        We only recommend tools we have tested and believe deliver genuine value for AI visibility.
      </p>
    </div>
  );
}
