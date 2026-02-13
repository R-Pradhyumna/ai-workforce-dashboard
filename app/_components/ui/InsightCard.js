export default function InsightCard({ title, children }) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface) p-6 flex flex-col justify-center">
      <h4 className="text-sm font-semibold text-(--text-muted) mb-4">
        {title}
      </h4>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
