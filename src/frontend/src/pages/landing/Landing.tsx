import './styles.css';
import React from 'react';
import { motion } from 'framer-motion';
import MockCode from '../../components/MockIDE/MockCode';
import MockDashboard from '../../components/MockDashboard/mockDashboard';
import ImageComparison from '../../components/ImageCompare/ImageComparison';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

const HEADER_PX = 72;

const textVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: 'easeOut' as const },
  },
};

const AnimatedText: React.FC<{
  lines: string[];
  visible: boolean;
  onComplete?: () => void;
}> = ({ lines, visible, onComplete }) => {
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [shouldStayVisible, setShouldStayVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible && !hasAnimated) {
      setHasAnimated(true);
      setShouldStayVisible(true);
    } else if (!visible) {
      setHasAnimated(false);
      setShouldStayVisible(false);
    }
  }, [visible, hasAnimated]);

  return (
    <motion.div
      className="big-text animated-text"
      variants={textVariants}
      initial="hidden"
      animate={shouldStayVisible ? 'visible' : 'hidden'}
      onAnimationComplete={() => {
        if (shouldStayVisible && onComplete) onComplete();
      }}
    >
      {lines.map((line, i) => (
        <div key={i} className="text-line">{line}</div>
      ))}
    </motion.div>
  );
};

const Landing: React.FC = () => {
  const [active, setActive] = React.useState(0);
  const [replay, setReplay] = React.useState<number[]>([0, 0, 0]);
  const [seen, setSeen] = React.useState<Record<number, boolean>>({ 0: true });
  const [firstTextFinished, setFirstTextFinished] = React.useState(false);
  const [secondTextFinished, setSecondTextFinished] = React.useState(false);
  const [thirdTextFinished, setThirdTextFinished] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add('landing-page-active');
    return () => document.body.classList.remove('landing-page-active');
  }, []);

  return (
    <div className="landing-swiper fixed-under-header" data-header-height={HEADER_PX}>
      <Swiper
        modules={[Mousewheel]}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        speed={450}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 1.2,
          thresholdDelta: 20,
          thresholdTime: 50,
          eventsTarget: '.landing-swiper',
        }}
        allowTouchMove
        simulateTouch
        touchRatio={1}
        resistanceRatio={0.6}
        autoHeight={false}
        onSlideChange={(sw) => {
          setActive(sw.activeIndex);
          setSeen((s) => ({ ...s, [sw.activeIndex]: true }));
          setReplay((r) => {
            const n = [...r];
            n[sw.activeIndex] = (n[sw.activeIndex] ?? 0) + 1;
            return n;
          });
        }}
        className="landing-swiper-instance"
      >
        <SwiperSlide>
          <div className="slide-content">
            <div className="landing-minipage">
              <div className="landing-header big-text">
                <AnimatedText
                  key={`text-0-${replay[0]}`}
                  lines={['Bringing', 'Legacy', 'Applications', 'Back to Life']}
                  visible={active === 0}
                  onComplete={() => setFirstTextFinished(true)}
                />
              </div>
              <div className="minipage-visual">
                <ImageComparison startPct={98} animateOnFinish={firstTextFinished} />
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content">
            <div className="landing-minipage flip-on-wide">
              <div className="landing-header big-text">
                <AnimatedText
                  key={`text-1-${replay[1]}`}
                  lines={['Scaling', 'Services', 'to Enterprise', 'Demands']}
                  visible={active === 1}
                  onComplete={() => setSecondTextFinished(true)}
                />
              </div>
              <div className="minipage-visual">
                {seen[1] && <MockCode ideVisible />}
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content">
            <div className="landing-minipage">
              <div className="landing-header big-text">
                <AnimatedText
                  key={`text-2-${replay[2]}`}
                  lines={['Leading', 'Optimization', 'That Delivers', 'Real Results']}
                  visible={active === 2}
                  onComplete={() => setThirdTextFinished(true)}
                />
              </div>
              <div className="minipage-visual">
                {seen[2] && <MockDashboard dashboardVisible />}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Landing;
