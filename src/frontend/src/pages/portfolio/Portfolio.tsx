import "./styles.css";
import React from "react";
import { motion } from "framer-motion";
import MockCode from "../../components/MockIDE/MockCode";
import MockDashboard from "../../components/MockDashboard/mockDashboard";
import ImageComparison from "../../components/ImageCompare/ImageComparison";

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(8px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.5,
      ease: "easeOut" as const
    }
  }
};

const AnimatedText: React.FC<{ 
  lines: string[], 
  visible: boolean, 
  onComplete?: () => void 
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
      animate={shouldStayVisible ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (shouldStayVisible && onComplete) {
          onComplete();
        }
      }}
    >
      {lines.map((line, index) => (
        <div key={index} className="text-line">
          {line}
        </div>
      ))}
    </motion.div>
  );
};


const Portfolio: React.FC = () => {
  const firstSectionRef = React.useRef<HTMLDivElement>(null);
  const secondSectionRef = React.useRef<HTMLDivElement>(null);
  const thirdSectionRef = React.useRef<HTMLDivElement>(null);
  
  const [firstTextVisible, setFirstTextVisible] = React.useState(false);
  const [secondTextVisible, setSecondTextVisible] = React.useState(false);
  const [thirdTextVisible, setThirdTextVisible] = React.useState(false);
  
  const [firstTextFinished, setFirstTextFinished] = React.useState(false);
  const [secondTextFinished, setSecondTextFinished] = React.useState(false);
  const [thirdTextFinished, setThirdTextFinished] = React.useState(false);

  const [firstTriggered, setFirstTriggered] = React.useState(false);
  const [secondTriggered, setSecondTriggered] = React.useState(false);
  const [thirdTriggered, setThirdTriggered] = React.useState(false);

  const [isLandscapeTablet, setIsLandscapeTablet] = React.useState(false);

  React.useEffect(() => {
    const checkLayout = () => {
      const isLandscape = window.matchMedia('(max-width: 1024px) and (orientation: landscape)').matches;
      setIsLandscapeTablet(isLandscape);
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    window.addEventListener('orientationchange', checkLayout);

    return () => {
      window.removeEventListener('resize', checkLayout);
      window.removeEventListener('orientationchange', checkLayout);
    };
  }, []);

  React.useEffect(() => {
    if (isLandscapeTablet) {
      if (!firstTriggered) {
        setFirstTextVisible(true);
        setFirstTriggered(true);
      }
      const timer1 = setTimeout(() => {
        if (!secondTriggered) {
          setSecondTextVisible(true);
          setSecondTriggered(true);
        }
      }, 2000);
      const timer2 = setTimeout(() => {
        if (!thirdTriggered) {
          setThirdTextVisible(true);
          setThirdTriggered(true);
        }
      }, 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (!firstTriggered) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setFirstTextVisible(true);
            setFirstTriggered(true);
            observer.disconnect(); 
          }
        },
        { threshold: 0.3 }
      );

      if (firstSectionRef.current) {
        observer.observe(firstSectionRef.current);
      }

      return () => observer.disconnect();
    }
  }, [isLandscapeTablet, firstTriggered]);

  React.useEffect(() => {
    if (isLandscapeTablet || secondTriggered) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSecondTextVisible(true);
          setSecondTriggered(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.3 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => observer.disconnect();
  }, [isLandscapeTablet, secondTriggered]);

  React.useEffect(() => {
    if (isLandscapeTablet || thirdTriggered) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setThirdTextVisible(true);
          setThirdTriggered(true);
          observer.disconnect(); // Disconnect immediately after triggering
        }
      },
      { threshold: 0.3 }
    );

    if (thirdSectionRef.current) {
      observer.observe(thirdSectionRef.current);
    }

    return () => observer.disconnect();
  }, [isLandscapeTablet, thirdTriggered]);

  return (
    <div className="portfolio-background">
      <div className="portfolio-minipage">
      <div className="portfolio-header big-text" ref={firstSectionRef}>
        <AnimatedText 
          lines={["Bringing", "Legacy", "Applications", "Back to Life"]}
          visible={firstTextVisible}
          onComplete={() => setFirstTextFinished(true)}
        />
        </div>
      <div className="minipage-visual">
      <ImageComparison startPct={98} animateOnFinish={firstTextFinished} />
        </div>
        </div>
      
      <div className="portfolio-minipage">
      <div className="portfolio-header big-text" ref={secondSectionRef}>
        <AnimatedText 
          lines={["Scaling", "Services", "to Enterprise", "Demands"]}
          visible={secondTextVisible}
          onComplete={() => setSecondTextFinished(true)}
        />
      </div>
        <div className="minipage-visual">
      {secondTextVisible && <MockCode ideVisible={secondTextVisible} />}
      </div>
        </div>

      <div className="portfolio-minipage">
      <div className="portfolio-header big-text" ref={thirdSectionRef}>
        <AnimatedText 
          lines={["Leading", "Optimization", "That Delivers", "Real Results"]}
          visible={thirdTextVisible}
          onComplete={() => setThirdTextFinished(true)}
        />
      </div>

      <div className="minipage-visual">
      {thirdTextVisible && <MockDashboard dashboardVisible={thirdTextVisible} />}
      </div>
      </div>
    </div>
  );
};

export default Portfolio;
