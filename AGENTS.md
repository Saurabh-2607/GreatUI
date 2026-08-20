<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Creating and Registering Components

When adding a new component to this codebase, follow these rules:

1. **Component File**:
   - Save UI library components under `components/ui/[ComponentName].tsx`.
   - Save site-specific components (e.g., used only for the landing page/website) under `components/site/[ComponentName].tsx`.
   - Ensure the component utilizes the `cn` utility from `lib/utils.ts` for class merging and styling.
   - Make sure the component is fully customizable using props (e.g., data arrays, classNames, optional toggles) rather than hardcoded values.
   - always use "motion/react" never use "framer-motion"
   - Remove any incorrect, placeholder, or temporary comments.
   - You **MUST** ask the user to enter their name and social link (e.g., X profile URL), and then append the following Great UI disclaimer block (with their details dynamically filled in, defaulting to "Saurabh Sharma" and "https://x.com/srbh_here" if not specified) at the end of the file:
     ```typescript
     /**
      * Great UI Component
      *
      * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
      * Designed to be accessible, customizable, and production-ready.
      *
      * Website: https://great-ui.com
      * GitHub: https://github.com/Saurabh-2607/GreatUI
      * X (Great UI): https://x.com/GreatUIHQ
      *
      * Released under the MIT License.
      * Contributions, issues, and feature requests are always welcome.
      *
      * Author: [User's Name] (Default: Saurabh Sharma)
      * X: [User's Social Link] (Default: https://x.com/srbh_here)
      */
     ```

2. **Preview File**:
   - Save the preview file under `components/site/previews/[ComponentName]Preview.tsx`.
   - The preview file should demonstrate how the component works.

3. **Image Assets**:
   - If the component or its preview file requires any image assets (e.g. user avatars, placeholder photos, backgrounds), do **NOT** use external third-party URLs.
   - Upload those image assets to ImageKit using the helper script:
     ```bash
     node scripts/upload-imagekit.js <file_path>
     ```
   - Use the returned ImageKit public URLs in your component/preview code.

4. **Registry Update**:
   - Register the component in `lib/registry.ts`.
   - Add a new object representing the component to the `components` array:
     ```typescript
     {
       slug: "component-slug",
       name: "ComponentName",
       description: "A description of what the component does.",
       interactionType: "Details of animations or interactions.",
       dependencies: [], // e.g. ["motion"] for Framer Motion, or ["lucide"] for Lucide
       previewFile: "ComponentNamePreview",
       previewImage: "/imaegpath.png",
       props: [
         {
           name: "propName",
           type: ["string", "number", etc.],
           description: "Description of the prop.",
           default: "default-value" // optional
         }
       ]
     }
     ```

5. **Changelog Update**:
   - Update `lib/changelog.ts`.
   - Prepend a new entry (or update the latest entry if it's the same date) detailing the addition or modification of the component in the following format:
     ```typescript
     {
       date: "Month Day, Year",
       features: [
         "Added [ComponentName](/components/component-slug) component featuring...",
       ],
     }
     ```
