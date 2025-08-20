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

  const split = useMotionValue(100);

  const oldClip     = useTransform(split, v => `inset(0 ${100 - v}% 0 0)`); 
  const modernClip  = useTransform(split, v => `inset(0 0 0 ${v}%)`);      
  const dividerLeft = useTransform(split, v => `${v}%`);

  const [labelPct, setLabelPct] = React.useState(70);
  useMotionValueEvent(split, "change", (v) => setLabelPct(Math.round(v)));

  const [finished, setFinished] = React.useState(false);
  const [ideVisible, setIdeVisible] = React.useState(false);
  const [secondTextVisible, setSecondTextVisible] = React.useState(false);
  const [secondTextFinished, setSecondTextFinished] = React.useState(false);
  
  React.useEffect(() => {
    if (!finished) return;
    const start = split.get();
    animate(split, [start, 0], {
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
      { threshold: 0.3 }
    );

    if (ideRef.current) {
      observer.observe(ideRef.current);
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
      { threshold: 0.3 }
    );

    const secondTextElement = document.querySelector('.second-portfolio-header');
    if (secondTextElement) {
      observer.observe(secondTextElement);
    }

    return () => observer.disconnect();
  }, []);

  function moveTo(clientX: number) {
    const rect = widgetRef.current?.getBoundingClientRect();
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
              <div className="folder expanded">📁 src</div>
              <div className="file-item">📄 Portfolio.tsx</div>
              <div className="file-item">📄 styles.css</div>
              <div className="folder">📁 components</div>
              <div className="folder">📁 assets</div>
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
            Scaling Services to Enterprise Demands
      </div>
    </div>
  );
};

export default Portfolio;
