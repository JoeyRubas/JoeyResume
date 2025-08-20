import "./styles.css";
import React from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";

const Portfolio: React.FC = () => {
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const split = useMotionValue(90);

  const oldClip     = useTransform(split, v => `inset(0 ${100 - v}% 0 0)`);
  const modernClip  = useTransform(split, v => `inset(0 0 0 ${v}%)`);      
  const dividerLeft = useTransform(split, v => `${v}%`);

  const [labelPct, setLabelPct] = React.useState(70);
  useMotionValueEvent(split, "change", (v) => setLabelPct(Math.round(v)));

  const headerLines = ["Bringing", "Legacy", "Applications", "Back to Life"];
  const [currentLine, setCurrentLine] = React.useState(0);
  const [doneLines, setDoneLines] = React.useState<string[]>([]);
  const [finished, setFinished] = React.useState(false);
  const currentText = headerLines[currentLine] ?? "";
  const charCount = currentText.length;
  const durationSec = Math.max(0.03 * charCount + 0.4, 0.7);

  // Keyframed bounce when typing finishes: current -> 25 -> 30
  React.useEffect(() => {
    if (!finished) return;
    const start = split.get();
    animate(split, [start, 5, 10], {
      duration: 1.6,
      times: [0, 0.65, 1],
      ease: ["easeOut", "easeOut"] // smooth snap, then settle
    });
  }, [finished, split]);

  // Pointer-driven drag (no Framer drag transform -> no offset)
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return; // only while pressed
    moveTo(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) moveTo(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) moveTo(e.touches[0].clientX);
  };

  function moveTo(clientX: number) {
    const rect = widgetRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    split.set(Math.max(0, Math.min(100, pct)));
  }

  return (
    <div className="frosted-background">
      <div className="portfolio-header">
        <h4 className="big-text typing">
          {doneLines.map((line, idx) => (
            <div key={idx} className="done-line">{line}</div>
          ))}
          {currentLine < headerLines.length && (
            <div
              key={currentLine}
              className="typing-line"
              style={{
                ["--target-width" as any]: `${charCount}ch`,
                ["--duration" as any]: `${durationSec}s`,
                ["--steps" as any]: charCount,
              }}
              onAnimationEnd={(e: React.AnimationEvent<HTMLDivElement>) => {
                if (e.animationName !== "typing") return;
                if (currentLine === headerLines.length - 1) setFinished(true);
                setDoneLines(prev => [...prev, currentText]);
                setCurrentLine(i => i + 1);
              }}
            >
              {currentText}
            </div>
          )}
        </h4>
      </div>

      <div className="site-compare-widget" ref={widgetRef}>
        {/* Left image (old) */}
        <motion.img
          src="old-site.jpg"
          alt="Old site"
          className="old-site-image"
          style={{ clipPath: oldClip }}
          draggable={false}
        />

        {/* Right image (modern) */}
        <motion.img
          src="modern-site.jpg"
          alt="Modern site"
          className="modern-site-image"
          style={{ clipPath: modernClip }}
          draggable={false}
        />

        {/* Divider — positioned purely with left%, no transform */}
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
