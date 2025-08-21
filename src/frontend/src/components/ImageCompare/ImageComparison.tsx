import React from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import "./styles.css";

interface ImageComparisonProps {
  startPct?: number;
  animateOnFinish?: boolean;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ startPct = 98, animateOnFinish }) => {
  React.useEffect(() => {
    if (!animateOnFinish) return;
    const start = split.get();
    animate(split, [start, 2], {
      duration: 1.6,
      times: [0, 0.65, 1],
      ease: ["easeOut", "easeOut"],
    });
  }, [animateOnFinish]);
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const split = useMotionValue(startPct);

  const oldClip     = useTransform(split, v => `inset(0 ${100 - v}% 0 0)`); 
  const modernClip  = useTransform(split, v => `inset(0 0 0 ${v}%)`);      
  const dividerLeft = useTransform(split, v => `${v}%`);

  const [labelPct, setLabelPct] = React.useState(startPct);
  useMotionValueEvent(split, "change", (v) => setLabelPct(Math.round(v)));

  function moveTo(clientX: number) {
    const rect = widgetRef.current?.querySelector('.image-comparison-inner')?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    split.set(Math.max(0, Math.min(100, pct)));
  }
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    moveTo(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) moveTo(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) moveTo(e.touches[0].clientX);
  };

  return (
    <div className="image-comparison-widget" ref={widgetRef}>
      <div className="image-comparison-inner">
        <motion.img
          src="old-site.jpg"
          alt="Old site"
          className="old-site-image"
          style={{ clipPath: oldClip }}
          draggable={false}
        />
        <motion.img
          src="modern-site.jpg"
          alt="Modern site"
          className="modern-site-image"
          style={{ clipPath: modernClip }}
          draggable={false}
        />
        <motion.div
          className="image-comparison-divider"
          style={{ left: dividerLeft }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={labelPct}
          aria-label="Before/after slider"
        >
          <span className="handle" />
        </motion.div>
        <div className="image-comparison-label">{labelPct}%</div>
      </div>
    </div>
  );
};

export default ImageComparison;
