export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <img src="/Great-UI-logo.svg" alt="Great UI" className="h-14 w-14" />
        <span className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Great UI
        </span>
      </div>

      {/* Badge */}
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Open source · Early access
      </span>

      {/* Headline */}
      <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl dark:text-zinc-50">
        Beautiful components,{" "}
        <span className="text-zinc-400 dark:text-zinc-500">your way.</span>
      </h1>

      {/* Sub-headline */}
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
        Great UI is a collection of clean, accessible, and composable React
        components built with Tailwind CSS. Copy, paste, ship.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/components/folder"
          className="bg-brand rounded-full px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e0731a]"
        >
          Browse components →
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-200 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          GitHub
        </a>
      </div>

      {/* Divider */}
      <div className="mt-24 w-full max-w-3xl border-t border-zinc-100 dark:border-zinc-900" />

      {/* Feature row */}
      <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-8 text-left sm:grid-cols-3">
        {[
          {
            title: "Copy & paste",
            body: "No npm install headaches. Grab the code, drop it in your project, make it yours.",
          },
          {
            title: "Accessible",
            body: "Every component follows WAI-ARIA patterns so your users never get left behind.",
          },
          {
            title: "Tailwind-first",
            body: "Built with Tailwind CSS v4. Utility classes all the way down — easy to restyle.",
          },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
