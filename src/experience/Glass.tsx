import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** A static, rim-only displacement map. Computed on resize, never per frame. */
function lensMap(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const c = canvas.getContext("2d");
  if (!c) return "";
  const pixels = c.createImageData(w, h),
    radius = h / 2,
    bezel = 10;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const px = x - w / 2,
        py = y - h / 2,
        qx = Math.abs(px) - (w / 2 - radius),
        qy = Math.abs(py);
      const dx = Math.max(qx, 0),
        d = Math.hypot(dx, qy),
        depth = radius - d;
      const bend =
        depth > 0 && depth < bezel ? Math.pow(1 - depth / bezel, 2) : 0;
      const i = (y * w + x) * 4;
      pixels.data[i] = 128 - Math.sign(px) * (d ? dx / d : 0) * bend * 80;
      pixels.data[i + 1] = 128 - Math.sign(py) * (d ? qy / d : 0) * bend * 80;
      pixels.data[i + 2] = 128;
      pixels.data[i + 3] = 255;
    }
  c.putImageData(pixels, 0, 0);
  return canvas.toDataURL();
}
export function Glass({
  children,
  className = "",
  optical = false,
}: {
  children: ReactNode;
  className?: string;
  optical?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null),
    id = "lens-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(
    null,
  );
  useEffect(() => {
    const el = root.current!;
    const media = matchMedia(
      "(pointer:fine) and (prefers-reduced-motion:no-preference)",
    );
    const move = (e: PointerEvent) => {
      if (!media.matches) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--light-x",
        `${((e.clientX - r.left) / r.width) * 100}%`,
      );
      el.style.setProperty(
        "--light-y",
        `${((e.clientY - r.top) / r.height) * 100}%`,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      el.dataset.inView = String(entry.isIntersecting);
    });
    observer.observe(el);
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("pointermove", move);
    };
  }, []);
  useEffect(() => {
    if (
      !optical ||
      !/Chrome|Chromium/.test(navigator.userAgent) ||
      matchMedia("(prefers-reduced-transparency:reduce)").matches
    )
      return;
    const el = root.current!;
    let timer: ReturnType<typeof setTimeout>;
    const build = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const w = Math.round(el.offsetWidth),
          h = Math.round(el.offsetHeight);
        if (w && h && w < 800) setMap({ url: lensMap(w, h), w, h });
      }, 100);
    };
    const observer = new ResizeObserver(build);
    observer.observe(el);
    build();
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [optical]);
  return (
    <div
      ref={root}
      className={`liquid-glass ${className}`}
      style={
        map
          ? ({
              "--lens-filter": `url(#${id}) blur(10px) saturate(135%)`,
            } as CSSProperties)
          : undefined
      }
    >
      {map && (
        <svg className="glass-filter" aria-hidden="true" width="0" height="0">
          <defs>
            <filter
              id={id}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={map.url}
                width={map.w}
                height={map.h}
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale="13"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <div className="glass-content">{children}</div>
    </div>
  );
}
