import Link from "next/link";
import { components } from "@/lib/registry";

export default function Sidebar({
  activeSlug,
  onClose,
}: {
  activeSlug: string;
  onClose?: () => void;
}) {
  return (
    <aside className="flex h-full w-full flex-col bg-[#141414] px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="px-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
          Components
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="flex cursor-pointer items-center justify-center rounded-md border border-white/[0.05] bg-white/[0.02] p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white"
            aria-label="Close sidebar"
          >
            X
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-0.5">
        {components.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              onClick={onClose}
              className={`flex items-center gap-2.5 rounded-md px-3.5 py-2 text-sm ${
                active
                  ? "bg-white/[0.04] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {c.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
