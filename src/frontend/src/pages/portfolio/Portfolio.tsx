import "./styles.css";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import MockIDE from "./components/mockIde";
import MockDashboard from "./components/mockDashboard";
import ImageComparison from "./components/ImageComparison";


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
      setFirstTextVisible(true);
      const timer1 = setTimeout(() => setSecondTextVisible(true), 2000);
      const timer2 = setTimeout(() => setThirdTextVisible(true), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setFirstTextVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (firstSectionRef.current) {
        observer.observe(firstSectionRef.current);
      }

      return () => observer.disconnect();
    }
  }, [isLandscapeTablet]);

  React.useEffect(() => {
    if (isLandscapeTablet) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSecondTextVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => observer.disconnect();
  }, [isLandscapeTablet]);

  React.useEffect(() => {
    if (isLandscapeTablet) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setThirdTextVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (thirdSectionRef.current) {
      observer.observe(thirdSectionRef.current);
    }

    return () => observer.disconnect();
  }, [isLandscapeTablet]);

  return (
    <div className="portfolio-background">
      <div className="portfolio-header" ref={firstSectionRef}>
        {firstTextVisible && (
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
              () => setFirstTextFinished(true),
            ]}
          />
        )}
        <div className="big-text typing-smooth" style={{ 
          visibility: 'hidden', 
          position: 'absolute',
          pointerEvents: 'none',
          whiteSpace: 'pre-line'
        }}>
          Bringing<br />Legacy<br />Applications<br />Back to Life
        </div>
      </div>

      <ImageComparison startPct={98} animateOnFinish={firstTextFinished} />

      <div className="second-portfolio-header big-text" ref={secondSectionRef}>
        {secondTextVisible && (
          <TypeAnimation
            className="typing-smooth"
            speed={35}          
            cursor={false}
            repeat={0}
            sequence={[
              "Scaling", 100,
              "Scaling\nServices", 100,
              "Scaling\nServices\nto Enterprise", 100,
              "Scaling\nServices\nto Enterprise\nDemands", 100,
              () => setSecondTextFinished(true),
            ]}
          />
        )}
        <div className="typing-smooth" style={{ 
          visibility: 'hidden', 
          position: 'absolute',
          pointerEvents: 'none',
          whiteSpace: 'pre-line'
        }}>
          Scaling<br />Services<br />to Enterprise<br />Demands
        </div>
      </div>

      {secondTextVisible && <MockIDE ideVisible={secondTextVisible} />}

      <div className="third-portfolio-header big-text" ref={thirdSectionRef}>
        {thirdTextVisible && (
          <TypeAnimation
            className="typing-smooth"
            speed={35}          
            cursor={false}
            repeat={0}
            sequence={[
              "Data-Driven", 100,
              "Data-Driven\nOptimization", 100,
              "Data-Driven\nOptimization\nDelivers", 100,
              "Data-Driven\nOptimization\nDelivers\nResults", 100,
              () => setThirdTextFinished(true),
            ]}
          />
        )}
        <div className="typing-smooth" style={{ 
          visibility: 'hidden', 
          position: 'absolute',
          pointerEvents: 'none',
          whiteSpace: 'pre-line'
        }}>
          Data-Driven<br />Optimization<br />Delivers<br />Results
        </div>
      </div>

      {thirdTextVisible && <MockDashboard dashboardVisible={thirdTextVisible} />}
    </div>
  );
};

export default Portfolio;
