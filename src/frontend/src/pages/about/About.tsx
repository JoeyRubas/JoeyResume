import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import GitHubCalendar from 'react-github-calendar';

const About: React.FC = () => {
  const [calendarLoading, setCalendarLoading] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (calendarRef.current) {
      const observer = new MutationObserver((mutations) => {
        const hasSvg = mutations.some(mutation => 
          Array.from(mutation.addedNodes).some(node => 
            node.nodeName === 'SVG' || 
            (node instanceof Element && node.querySelector('svg'))
          )
        );
        
        if (hasSvg) {
          setCalendarLoading(false);
          observer.disconnect();
        }
      });
      
      observer.observe(calendarRef.current, { 
        childList: true, 
        subtree: true 
      });
      
      const timer = setTimeout(() => {
        setCalendarLoading(false);
      }, 3000);
      
      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="hero-left">
          <div className="brand-row">
            <img
              src="/carmax2.jpg"
              alt="CarMax logo"
              className="brand-logo"
              width={80}
              height={80}
            />
            <h1 className="hero-name">Joey Rubas</h1>
          </div>

          <h2 className="hero-title">Building Reliable, Scalable Web Apps</h2>
          <p className="hero-subhead">Software Engineer I — CarMax</p>

          <p className="hero-body">
            Full-stack developer focused on clean architecture, real-world
            reliability, and shipping product fast. UVA grad in CS + Math.
            Currently growing enterprise skills, one release at a time.
          </p>

          <div className="cta-row">
            <a
              className="btn primary"
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
            <a className="btn ghost" href="https://www.linkedin.com/in/joeymrubas/">
              Contact
            </a>
          </div>

          <div className="social-row">
            <a
              href="https://github.com/JoeyRubas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <img
                src="/github.svg"
                alt="GitHub"
                className="social-icon"
                width={36}
                height={36}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/joeymrubas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/linkedin.png"
                alt=""
                className="social-icon"
                width={36}
                height={36}
              />
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="photo-wrap">
            <img
              src="/college-graduate.png"
              alt="Joey portrait"
              className="hero-photo"
              width={350}
              height={350}
            />
          </div>
        </div>
      </section>
      <section className="gh-calender">
        {calendarLoading && (
          <div className="calendar-loading" style={{
            height: '120px',
            width: '100%',
            borderRadius: '8px',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div className="spinner"></div>
            <span style={{ color: '#667085', fontSize: '14px', fontWeight: 500 }}>
              Loading contributions...
            </span>
          </div>
        )}
        <div style={{ display: calendarLoading ? 'none' : 'block' }} ref={calendarRef}>
          <GitHubCalendar 
            username="JoeyRubas"
          />
        </div>
      </section>
      <section className="quick-facts">
        <div className="fact">
          <span className="fact-kicker">Core</span>
          <span className="fact-text">
            Python • Django • DotNET • TypeScript
          </span>
        </div>
        <div className="fact">
          <span className="fact-kicker">Cloud</span>
          <span className="fact-text">Azure • AWS • CI/CD</span>
        </div>
        <div className="fact">
          <span className="fact-kicker">Focus</span>
          <span className="fact-text">
            Reliability • Performance • Developer Experience
          </span>
        </div>
      </section>
    </main>
  );
};

export default About;
