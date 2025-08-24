import React from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import './styles.css';

interface ImageComparisonProps {
  startPct?: number;
  animateOnFinish?: boolean;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  startPct = 98,
  animateOnFinish,
}) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const animationRef = React.useRef<any>(null);

  // Start animation when animateOnFinish is true
  React.useEffect(() => {
    if (!animateOnFinish) return;
    setIsAnimating(true);
  }, [animateOnFinish]);

  // Looping animation effect
  React.useEffect(() => {
    if (!isAnimating) return;
    let running = true;
    function loop() {
      if (!running) return;
      const start = split.get();
      const end = start < 50 ? 98 : 2;
      animationRef.current = animate(split, [start, end], {
        duration: 2.5,
        ease: 'easeInOut',
        onComplete: () => {
          setTimeout(loop, 2500);
        },
      });
    }
    loop();
    return () => {
      running = false;
      if (animationRef.current) animationRef.current.stop();
    };
  }, [isAnimating]);
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const split = useMotionValue(startPct);

  const oldClip = useTransform(split, v => `inset(0 ${100 - v}% 0 0)`);
  const modernClip = useTransform(split, v => `inset(0 0 0 ${v}%)`);
  const dividerLeft = useTransform(split, v => `${v}%`);

  const [labelPct, setLabelPct] = React.useState(startPct);
  useMotionValueEvent(split, 'change', v => setLabelPct(Math.round(v)));

  function moveTo(clientX: number) {
    const rect = widgetRef.current
      ?.querySelector('.image-comparison-inner')
      ?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    // If user interacts, stop animation
    setIsAnimating(false);
    if (animationRef.current) animationRef.current.stop();
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
