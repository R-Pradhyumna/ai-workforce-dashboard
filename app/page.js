import Link from "next/link";

export const metadata = {
  title: "Home",
  description:
    "Centralized analytics platform for monitoring AI usage, workforce efficiency, and operational cost tracking.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-(--bg) text-(--text-primary) flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-(--border)">
        <h1 className="text-lg font-semibold tracking-tight">
          AI Workforce Dashboard
        </h1>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/login"
            className="text-(--text-muted) hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold tracking-tight max-w-3xl">
          Monitor AI Usage. Track Costs. Optimize Workforce Efficiency.
        </h2>

        <p className="mt-6 text-lg text-(--text-muted) max-w-2xl">
          A centralized analytics dashboard for monitoring token consumption,
          employee usage patterns, and operational costs in real-time.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View Dashboard
          </Link>

          <Link
            href="/login"
            className="border border-(--border) px-6 py-3 rounded-lg hover:bg-(--surface) transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="border-t border-(--border) py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg">Real-Time Analytics</h3>
            <p className="mt-3 text-sm text-(--text-muted)">
              Visualize usage trends with dynamic charts and time-based
              filtering.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Cost Monitoring</h3>
            <p className="mt-3 text-sm text-(--text-muted)">
              Track operational expenses and optimize AI resource allocation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Workforce Insights</h3>
            <p className="mt-3 text-sm text-(--text-muted)">
              Identify top contributors and usage distribution across teams.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
