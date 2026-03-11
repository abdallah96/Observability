import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          React & Next.js Runtime Observatory
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Mastery Edition — Make invisible runtime behavior visible.
        </p>
      </header>

      <nav className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Labs
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/lab/render-observatory"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Component Render Observatory
            </Link>
            <span className="text-gray-500 text-sm ml-2">
              — When, why, and how often components render
            </span>
          </li>
          <li>
            <Link
              href="/lab/state-timeline"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              State Change Timeline
            </Link>
            <span className="text-gray-500 text-sm ml-2">
              — State flow and re-render correlation
            </span>
          </li>
          <li>
            <Link
              href="/lab/rendering-strategy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Rendering Strategy Lab (SSR / SSG / ISR)
            </Link>
            <span className="text-gray-500 text-sm ml-2">
              — Compare strategies and cache behavior
            </span>
          </li>
        </ul>
      </nav>
    </main>
  );
}
