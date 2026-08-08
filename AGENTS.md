<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Creating and Registering Components

When adding a new component to this codebase, follow these rules:

1. **Component File**:
   - Save the component file under `components/ui/[ComponentName].tsx`.
   - Ensure the component utilizes the `cn` utility from `lib/utils.ts` for class merging and styling.
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

3. **Registry Update**:
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

4. **Changelog Update**:
   - Update `lib/changelog.ts`.
   - Prepend a new entry (or update the latest entry if it's the same date) detailing the addition or modification of the component in the following format:
     ```typescript
     {
       date: "Month Day, Year",
       description: "A short description of what was changed or added.",
       features: [
         "Added [ComponentName](/components/component-slug) component featuring...",
       ],
     }
     ```
