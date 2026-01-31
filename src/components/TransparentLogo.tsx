import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type TransparentLogoProps = {
  src: string;
  alt: string;
  className?: string;
  /** 0..255, higher = removes more background */
  threshold?: number;
  /** 0..255, soft edge range */
  feather?: number;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function colorDistance(a: [number, number, number], b: [number, number, number]) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export default function TransparentLogo({
  src,
  alt,
  className,
  threshold = 42,
  feather = 22,
}: TransparentLogoProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const key = useMemo(() => `${src}::${threshold}::${feather}`, [src, threshold, feather]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setDataUrl(null);

      const img = new Image();
      img.decoding = "async";
      // same-origin since it's bundled
      img.src = src;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load logo image"));
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imageData;

      // Sample corners to infer background color (works for solid-color bg assets)
      const corners: [number, number][] = [
        [0, 0],
        [width - 1, 0],
        [0, height - 1],
        [width - 1, height - 1],
      ];
      const bgSamples: [number, number, number][] = corners.map(([x, y]) => {
        const i = (y * width + x) * 4;
        return [data[i], data[i + 1], data[i + 2]];
      });
      const bg: [number, number, number] = [
        Math.round(bgSamples.reduce((s, c) => s + c[0], 0) / bgSamples.length),
        Math.round(bgSamples.reduce((s, c) => s + c[1], 0) / bgSamples.length),
        Math.round(bgSamples.reduce((s, c) => s + c[2], 0) / bgSamples.length),
      ];

      // Key-out background similar to sampled bg color.
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a === 0) continue;

        const dist = colorDistance([r, g, b], bg);
        if (dist <= threshold) {
          data[i + 3] = 0;
        } else if (dist <= threshold + feather) {
          // Feather edge: fade alpha proportionally
          const t = (dist - threshold) / feather; // 0..1
          data[i + 3] = Math.round(a * clamp01(t));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const url = canvas.toDataURL("image/png");
      if (!cancelled) setDataUrl(url);
    }

    run().catch(() => {
      // Fallback: show raw image if processing fails
      if (!cancelled) setDataUrl(src);
    });

    return () => {
      cancelled = true;
    };
  }, [key, src, threshold, feather]);

  return (
    <img
      src={dataUrl ?? src}
      alt={alt}
      className={cn(className)}
      loading="eager"
      decoding="async"
    />
  );
}
