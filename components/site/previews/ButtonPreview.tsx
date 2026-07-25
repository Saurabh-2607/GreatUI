import Button from "@/components/ui/Button";

export default function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" isLoading>
        Loading
      </Button>
    </div>
  );
}
