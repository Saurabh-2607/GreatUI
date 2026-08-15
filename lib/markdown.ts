import { Component } from "./registry";

export function getComponentMarkdown(component: Component): string {
  const currentOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://great-ui.com";
  const registryUrl = `${currentOrigin}/r/${component.slug}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  let md = `# ${component.name}\n\n`;
  md += `${component.description}\n\n`;

  md += `## Installation\n\n`;
  md += `\`\`\`bash\n${npxCommand}\n\`\`\`\n\n`;

  if (component.dependencies && component.dependencies.length > 0) {
    md += `## Dependencies\n\n`;
    component.dependencies.forEach((dep) => {
      md += `- \`${dep}\`\n`;
    });
    md += `\n`;
  }

  if (component.usageCode) {
    md += `## Usage\n\n`;
    md += `\`\`\`tsx\n${component.usageCode}\n\`\`\`\n\n`;
  }

  if (component.code) {
    md += `## Code\n\n`;
    md += `\`\`\`tsx\n${component.code}\n\`\`\`\n\n`;
  }

  if (component.props && component.props.length > 0) {
    md += `## Props\n\n`;
    md += `| Name | Type | Default | Description |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    component.props.forEach((prop) => {
      const pType = prop.type.map((t) => `\`${t}\``).join(" \\| ");
      const pDefault = prop.default ? `\`${prop.default}\`` : "-";
      md += `| ${prop.name} | ${pType} | ${pDefault} | ${prop.description} |\n`;
    });
    md += `\n`;
  }

  if (component.dependencyNotes) {
    md += `## Keep in mind\n\n`;
    md += `${component.dependencyNotes}\n\n`;
  }

  if (component.inspiration) {
    md += `## Inspiration & Source\n\n`;
    md += `Inspired by or sourced from: ${component.inspiration}\n\n`;
  }

  md += `## License\n\n`;
  md += `Released under the MIT License.\n\n`;

  return md;
}
