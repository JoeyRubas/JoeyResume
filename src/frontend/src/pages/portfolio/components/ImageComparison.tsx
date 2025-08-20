import React from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface ImageComparisonProps {
  onAnimationComplete: () => void;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({ onAnimationComplete }) => {
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(100);
  
  const oldImageClip = useTransform(sliderPosition, v => `inset(0 ${100 - v}% 0 0)`);
  const modernImageClip = useTransform(sliderPosition, v => `inset(0 0 0 ${v}%)`);
  const dividerPosition = useTransform(sliderPosition, v => `${v}%`);
  
  const [percentageLabel, setPercentageLabel] = React.useState(70);
  const [showShimmer, setShowShimmer] = React.useState(false);
  const shimmerTimeoutRef = React.useRef<number>();
  
  useMotionValueEvent(sliderPosition, "change", (value) => {
    setPercentageLabel(Math.round(value));
    
    // Trigger shimmer effect on slider movement
    setShowShimmer(true);
    console.log("Shimmer triggered!"); // Debug log
    
    // Clear existing timeout
    if (shimmerTimeoutRef.current) {
      clearTimeout(shimmerTimeoutRef.current);
    }
    
    // Remove shimmer after animation completes
    shimmerTimeoutRef.current = setTimeout(() => {
      setShowShimmer(false);
      console.log("Shimmer removed!"); // Debug log
    }, 800);
  });

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (shimmerTimeoutRef.current) {
        clearTimeout(shimmerTimeoutRef.current);
      }
    };
  }, []);

  const updateSliderPosition = (clientX: number) => {
    const rect = widgetRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    sliderPosition.set(Math.max(0, Math.min(100, percentage)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
  };

  return (
    <div className="site-compare-widget" ref={widgetRef}>
      <motion.img
        src="old-site.jpg"
        alt="Legacy application interface"
        className="old-site-image"
        style={{ clipPath: oldImageClip }}
        draggable={false}
      />
      <motion.img
        src="modern-site.jpg"
        alt="Modernized application interface"
        className={`modern-site-image ${showShimmer ? 'shimmer-effect' : ''}`}
        style={{ clipPath: modernImageClip }}
        draggable={false}
      />
      
      <motion.div
        className="site-compare-divider"
        style={{ left: dividerPosition }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentageLabel}
        aria-label="Before and after comparison slider"
      >
        <span className="handle" />
      </motion.div>
      
      <div className="site-compare-label">{percentageLabel}%</div>
    </div>
  );
};
