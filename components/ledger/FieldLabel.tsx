export function FieldLabel({
  children,
  colorClassName = "text-mountain/55",
}: {
  children: React.ReactNode;
  colorClassName?: string;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.09em]">
      <span className="h-px flex-1 bg-mountain/15" />
      <span className={colorClassName}>{children}</span>
      <span className="h-px flex-1 bg-mountain/15" />
    </div>
  );
}
