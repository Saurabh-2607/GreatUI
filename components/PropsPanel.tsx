import { type Component } from "@/lib/registry";

export default function PropsPanel({ component }: { component: Component }) {
  return (
    <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-white/6 bg-[#141414] px-6 py-8 xl:flex xl:flex-col">
      {/* Name */}
      <p className="mb-3 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
        {component.name.toUpperCase()}
      </p>

      {/* Description */}
      <p className="text-xl font-semibold leading-snug text-white">
        {component.description}
      </p>

      {/* Dependencies */}
      {component.dependencies.length > 0 && (
        <div className="mt-8">
          <p className="mb-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
            Dependencies
          </p>
          <div className="flex flex-wrap gap-2">
            {component.dependencies.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
              >
                <span className="text-zinc-500">▲</span>
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interaction type */}
      <div className="mt-8">
        <p className="mb-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
          Interaction Type
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          {component.interactionType}
        </p>
      </div>

      {/* Props */}
      {component.props.length > 0 && (
        <div className="mt-8">
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
            Props
          </p>
          <p className="mb-4 text-xs text-zinc-600">
            Options you can pass to customize this component.
          </p>

          {/* Header row */}
          <div className="mb-2 grid grid-cols-[80px_80px_1fr] gap-2 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
            <span>Prop</span>
            <span>Type</span>
            <span>Description</span>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.05]">
            {component.props.map((prop) => (
              <div
                key={prop.name}
                className="grid grid-cols-[80px_80px_1fr] gap-2 py-3 text-xs"
              >
                <code className="self-start rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-zinc-300">
                  {prop.name}
                </code>
                <div className="flex flex-col gap-1">
                  {prop.type.map((t) => (
                    <span key={t} className="text-zinc-500">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="leading-relaxed text-zinc-400">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Installation placeholder */}
      <div className="mt-8">
        <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
          Installation
        </p>
      </div>
    </aside>
  );
}
