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
  // mark which slides have been seen to trigger animations/mounts only once
  const [seen, setSeen] = React.useState<Record<number, boolean>>({ 0: true });
  const [firstTextFinished, setFirstTextFinished] = React.useState(false);
  const [secondTextFinished, setSecondTextFinished] = React.useState(false);
  const [thirdTextFinished, setThirdTextFinished] = React.useState(false);

  // Lock page scroll only while this component is mounted
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

        /* Snappy + smooth wheel behavior (no grain) */
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

        onSlideChange={(sw) => setSeen((s) => ({ ...s, [sw.activeIndex]: true }))}
        className="landing-swiper-instance"
      >
        <SwiperSlide>
          <div className="slide-content">
            <div className="landing-minipage">
              <div className="landing-header big-text">
                <AnimatedText
                  lines={['Bringing', 'Legacy', 'Applications', 'Back to Life']}
                  visible={!!seen[0]}
                  onComplete={() => setFirstTextFinished(true)}
                />
              </div>
              <div className="minipage-visual">
                <ImageComparison startPct={98} animateOnFinish={firstTextFinished} />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* middle slide flips header/visual on wide screens */}
        <SwiperSlide>
          <div className="slide-content">
            <div className="landing-minipage flip-on-wide">
              <div className="landing-header big-text">
                <AnimatedText
                  lines={['Scaling', 'Services', 'to Enterprise', 'Demands']}
                  visible={!!seen[1]}
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
                  lines={['Leading', 'Optimization', 'That Delivers', 'Real Results']}
                  visible={!!seen[2]}
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
