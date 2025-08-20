import "./styles.css";
import React from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const CodeTyper: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const codeRef = React.useRef<HTMLDivElement>(null);

  const fullCode = `name: Deploy Frontend to Azure Static Web App
on:
  push:
    branches: [ main ]
    paths:
      - 'src/frontend/**'
  workflow_dispatch:

env:
  NODE_VERSION: '20.x'
  APP_DIR: 'src/frontend'        
  DIST_DIR: 'src/frontend/dist'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false

      - name: Setup Node
        uses: actions/setup-node@v4
        with:`;

  const generateSequence = (code: string) => {
    const lines = code.split('\n');
    const sequence: (string | number)[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const currentCode = lines.slice(0, i + 1).join('\n');
      sequence.push(currentCode);
      sequence.push(400); 
    }
    
    return sequence;
  };

  const codeSequence = generateSequence(fullCode);

  return (
    <div 
      ref={codeRef}
      style={{ 
        fontFamily: 'Fira Code, Consolas, Monaco, monospace',
        fontSize: '13px',
        lineHeight: '1.4',
        color: '#d4d4d4',
        whiteSpace: 'pre-wrap',
        margin: 0,
        padding: '12px',
        minHeight: '200px'
      }}
    >
      {isVisible && (
        <TypeAnimation
          sequence={codeSequence}
          speed={75}
          cursor={true}
          repeat={0}
          style={{ display: 'block' }}
        />
      )}
    </div>
  );
};

const Portfolio: React.FC = () => {
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const ideRef = React.useRef<HTMLDivElement>(null);
  const dashboardRef = React.useRef<HTMLDivElement>(null);

  const split = useMotionValue(98);

  const oldClip     = useTransform(split, v => `inset(0 ${100 - v}% 0 0)`); 
  const modernClip  = useTransform(split, v => `inset(0 0 0 ${v}%)`);      
  const dividerLeft = useTransform(split, v => `${v}%`);

  const [labelPct, setLabelPct] = React.useState(98);
  useMotionValueEvent(split, "change", (v) => setLabelPct(Math.round(v)));

  const [finished, setFinished] = React.useState(false);
  const [ideVisible, setIdeVisible] = React.useState(false);
  const [dashboardVisible, setDashboardVisible] = React.useState(false);
  const [secondTextVisible, setSecondTextVisible] = React.useState(false);
  const [thirdTextVisible, setThirdTextVisible] = React.useState(false);
  const [secondTextFinished, setSecondTextFinished] = React.useState(false);
  
  React.useEffect(() => {
    if (!finished) return;
    const start = split.get();
    animate(split, [start, 2], {
      duration: 1.6,
      times: [0, 0.65, 1],
      ease: ["easeOut", "easeOut"],
    });
  }, [finished, split]);

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

  // Intersection Observer for third text visibility
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setThirdTextVisible(true);
        }
      },
      { threshold: 0.1 } // Lower threshold for mobile
    );

    const thirdTextElement = document.querySelector('.third-portfolio-header');
    if (thirdTextElement) {
      observer.observe(thirdTextElement);
    }

    return () => observer.disconnect();
  }, []);

  function moveTo(clientX: number) {
    const rect = widgetRef.current?.querySelector('.site-compare-inner')?.getBoundingClientRect();
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

      <div className="site-compare-widget" ref={widgetRef}>
        <div className="site-compare-inner">
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

      <div className="mock-ide" ref={ideRef}>
        <div className="mockNav">
          <div className="ide-title-bar">
            <div className="window-controls">
              <span className="control close"></span>
              <span className="control minimize"></span>
              <span className="control maximize"></span>
            </div>
            <div className="file-tabs">
              <div className="tab active">Portfolio.tsx</div>
              <div className="tab">styles.css</div>
            </div>
          </div>
        </div>
        <div className="ide-content">
          <div className="mockSidebar">
            <div className="sidebar-header">EXPLORER</div>
            <div className="file-tree">
              <div className="folder expanded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                src
              </div>
              <div className="file-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                Portfolio.tsx
              </div>
              <div className="file-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                styles.css
              </div>
              <div className="folder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6L10 4z"/>
                </svg>
                components
              </div>
              <div className="folder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6L10 4z"/>
                </svg>
                assets
              </div>
            </div>
          </div>
          <div className="mockEditorBody">
            <div className="line-numbers">
              {Array.from({ length: 27 }, (_, i) => (
                <div key={i + 1} className="line-number">{i + 1}</div>
              ))}
            </div>
            <div className="code-content">
              <CodeTyper isVisible={ideVisible} />
            </div>
          </div>
        </div>
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
            "Scaling", 100,
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

      <div className="mock-dashboard" ref={dashboardRef}>
        <div className="dashboard-header">
          <div className="dashboard-title">
            <svg className="dashboard-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Analytics Dashboard
          </div>
          <div className="dashboard-time">Last updated: 2 minutes ago</div>
        </div>
        <div className="dashboard-content">
          <div className="metric-cards">
            <div className="metric-card">
              <div className="metric-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                </svg>
              </div>
              <div className="metric-value">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={dashboardVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  80%
                </motion.span>
              </div>
              <div className="metric-label">Faster Database Loads</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="metric-value">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={dashboardVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  5,000
                </motion.span>
              </div>
              <div className="metric-label">Page Views</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div className="metric-value">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={dashboardVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  40%
                </motion.span>
              </div>
              <div className="metric-label">Fewer Manual Changes</div>
            </div>
          </div>
          
          <div className="charts-section">
            <div className="chart-container">
              <div className="chart-title">Performance Over Time</div>
              <div className="line-chart">
                <svg width="100%" height="120" viewBox="0 0 300 120">
                  <motion.path
                    d="M 20 100 Q 80 80 150 40 T 280 20"
                    stroke="#00d4aa"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#00d4aa" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 20 100 Q 80 80 150 40 T 280 20 L 280 100 L 20 100"
                    fill="url(#chartGradient)"
                    initial={{ pathLength: 0 }}
                    animate={dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 2.5, duration: 2, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>
            
            <div className="gauge-container">
              <div className="chart-title">System Health</div>
              <div className="gauge">
                <svg width="120" height="80" viewBox="0 0 120 80">
                  <path
                    d="M 20 60 A 40 40 0 0 1 100 60"
                    stroke="#333"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.path
                    d="M 20 60 A 40 40 0 0 1 100 60"
                    stroke="#00d4aa"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="125.6"
                    initial={{ strokeDashoffset: 125.6 }}
                    animate={dashboardVisible ? { strokeDashoffset: 25.1 } : { strokeDashoffset: 125.6 }}
                    transition={{ delay: 3, duration: 2, ease: "easeInOut" }}
                  />
                </svg>
                <div className="gauge-value">98%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
