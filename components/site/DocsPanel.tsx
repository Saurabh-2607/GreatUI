import { type Component } from "@/lib/registry";

export default function DocsPanel({ component }: { component: Component }) {
  return (
    <aside className="flex flex-col text-neutral-900 dark:text-white">
      <span className="mb-2 text-xs font-bold tracking-widest text-[#f6821f] uppercase">
        {component.category}
      </span>

      <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {component.name}
      </h2>

      <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        {component.description}
      </p>

      {component.dependencies.length > 0 && (
        <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <p className="mb-2.5 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            Dependencies
          </p>
          <div className="flex flex-wrap gap-2">
            {component.dependencies.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 font-mono text-sm font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <p className="mb-1.5 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
          Interaction
        </p>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {component.interactionType}
        </p>
      </div>

      {component.props.length > 0 && (
        <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <p className="mb-1.5 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            Props API
          </p>
          <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
            Configurable properties for {component.name}.
          </p>

          <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800/80">
            {component.props.map((prop) => (
              <div
                key={prop.name}
                className="flex flex-col gap-1.5 py-3.5 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <code className="rounded-lg bg-neutral-100 px-2 py-0.5 font-mono text-sm font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                    {prop.name}
                  </code>
                  <span className="font-mono text-xs font-medium text-[#f6821f]">
                    {prop.type.join(" | ")}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {prop.description}
                  {prop.default && (
                    <span className="ml-1.5 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                      (default: {prop.default})
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
