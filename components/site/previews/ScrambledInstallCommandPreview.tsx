"use client";

import { useState } from "react";
import {
  ScrambledInstallCommand,
  PkgManager,
} from "@/components/ui/ScrambledInstallCommand";

export default function ScrambledInstallCommandPreview() {
  const [pkgManager, setPkgManager] = useState<PkgManager>("npm");

  const getCommand = (pm: PkgManager) => {
    switch (pm) {
      case "pnpm":
        return "pnpm dlx shadcn@latest add http://localhost:3000/r/install-command.json";
      case "bun":
        return "bunx --bun shadcn@latest add http://localhost:3000/r/install-command.json";
      case "yarn":
      case "npm":
      default:
        return "npx shadcn@latest add http://localhost:3000/r/install-command.json";
    }
  };
  const installCommand = getCommand(pkgManager);

  return (
    <div className="flex w-full items-center justify-center p-12">
      <div className="w-full max-w-2xl">
        <ScrambledInstallCommand
          installCommand={installCommand}
          pkgManager={pkgManager}
          setPkgManager={setPkgManager}
        />
      </div>
    </div>
  );
}
