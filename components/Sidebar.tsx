import Link from "next/link";
import { components } from "@/lib/registry";

export default function Sidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#141414] px-4 py-6">
      <p className="mb-4 px-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
        Components
      </p>
      <nav className="flex flex-col gap-0.5">
        {components.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
                active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  active ? "bg-red-500" : ""
                }`}
              />
              {c.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
