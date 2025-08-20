import "./styles.css";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import MockIDE from "./components/mockIde";
import MockDashboard from "./components/mockDashboard";
import ImageComparison from "./components/ImageComparison";


const Portfolio: React.FC = () => {
  const ideRef = React.useRef<HTMLDivElement>(null);
  const dashboardRef = React.useRef<HTMLDivElement>(null);
  const [finished, setFinished] = React.useState(false);
  const [ideVisible, setIdeVisible] = React.useState(false);
  const [dashboardVisible, setDashboardVisible] = React.useState(false);
  const [secondTextVisible, setSecondTextVisible] = React.useState(false);
  const [thirdTextVisible, setThirdTextVisible] = React.useState(false);
  const [secondTextFinished, setSecondTextFinished] = React.useState(false);

  // Intersection Observer for IDE visibility
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIdeVisible(true);
        }
      },
      { threshold: 0.1 } // Lower threshold for mobile
    );

    if (ideRef.current) {
      observer.observe(ideRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for dashboard visibility
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDashboardVisible(true);
        }
      },
      { threshold: 0.1 } // Lower threshold for mobile
    );

    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for second text visibility
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSecondTextVisible(true);
        }
      },
      { threshold: 0.1 } // Lower threshold for mobile
    );

    const secondTextElement = document.querySelector('.second-portfolio-header');
    if (secondTextElement) {
      observer.observe(secondTextElement);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setThirdTextVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const thirdTextElement = document.querySelector('.third-portfolio-header');
    if (thirdTextElement) {
      observer.observe(thirdTextElement);
    }

    return () => observer.disconnect();
  }, []);

  // ...existing code...

  return (
    <div className="portfolio-background">
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

      <ImageComparison startPct={98} animateOnFinish={finished} />

      {/* ...existing code... */}
      <div ref={ideRef}>
        {ideVisible && <MockIDE ideVisible={ideVisible} />}
      </div>

      <div className="second-portfolio-header big-text">
        <TypeAnimation
          className="typing-smooth"
          speed={35}          
          cursor={false}
          repeat={0}
          sequence={[
            () => {
              if (!secondTextVisible) {
                return;
              }
            },
            "Scaling\n\n\n", 100,
            "Scaling\nServices", 100,
            "Scaling\nServices\nto Enterprise", 100,
            "Scaling\nServices\nto Enterprise\nDemands", 100,
            () => setSecondTextFinished(true),
          ]}
        />
      </div>

      <div className="third-portfolio-header big-text">
        <TypeAnimation
          className="typing-smooth"
          speed={35}          
          cursor={false}
          repeat={0}
          sequence={[
            () => {
              if (!thirdTextVisible) {
                return;
              }
            },
            "Data-Driven", 100,
            "Data-Driven\nOptimization", 100,
            "Data-Driven\nOptimization\nDelivers", 100,
            "Data-Driven\nOptimization\nDelivers\nResults", 100,
          ]}
        />
      </div>

      <div ref={dashboardRef}>
        {dashboardVisible && <MockDashboard dashboardVisible={dashboardVisible} />}
      </div>
    </div>
  );
};

export default Portfolio;
