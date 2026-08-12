import FloatingMenu from "../../ui/FloatingMenu";

const primaryLinks = [
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
];

const secondaryLinks = [
  { label: "News & Insights", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Support", href: "#" },
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function FloatingMenuPreview() {
  return (
    <div className="relative flex min-h-[800px] w-full items-start justify-center p-6">
      <FloatingMenu
        className="absolute top-12"
        title={
          <span className="text-base font-bold text-neutral-900 select-none dark:text-white">
            Great UI
          </span>
        }
        primaryLinks={primaryLinks}
        secondaryLinks={secondaryLinks}
        socialLinks={socialLinks}
      />
    </div>
  );
}
