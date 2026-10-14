/** The custom SVG is an image surface so its paths are cached, not re-painted as DOM on scroll. */
export function Filament({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={`filament ${className}`}
      src="/filament.svg"
      width="600"
      height="600"
      alt=""
      aria-hidden="true"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
