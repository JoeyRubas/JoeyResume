import "./styles.css";
import React from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Portfolio: React.FC = () => {
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const split = useMotionValue(90);

  const oldClip     = useTransform(split, v => `inset(0 ${100 - v}% 0 0)`); 
  const modernClip  = useTransform(split, v => `inset(0 0 0 ${v}%)`);      
  const dividerLeft = useTransform(split, v => `${v}%`);

  const [labelPct, setLabelPct] = React.useState(70);
  useMotionValueEvent(split, "change", (v) => setLabelPct(Math.round(v)));

  const [finished, setFinished] = React.useState(false);
  React.useEffect(() => {
    if (!finished) return;
    const start = split.get();
    animate(split, [start, 5, 10], {
      duration: 1.6,
      times: [0, 0.65, 1],
      ease: ["easeOut", "easeOut"],
    });
  }, [finished, split]);

  function moveTo(clientX: number) {
    const rect = widgetRef.current?.getBoundingClientRect();
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
    <div className="frosted-background">
      <div className="portfolio-header">
        <TypeAnimation
          className="big-text typing-smooth"
          speed={35}          
          cursor={false}
          repeat={0}
          sequence={[
            "Bringing", 100,  
            "Bringing\nLegacy", 100,
            "Bringing\nLegacy\nApplications", 100,
            "Bringing\nLegacy\nApplications\nBack to Life", 100,
            () => setFinished(true),
          ]}
        />


      </div>

      <div className="site-compare-widget" ref={widgetRef}>
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
          className="site-compare-divider"
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

        <div className="site-compare-label">{labelPct}%</div>
      </div>
    </div>
  );
};

export default Portfolio;
