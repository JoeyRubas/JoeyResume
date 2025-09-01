import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, Link } from '@tanstack/react-router';
import './styles.css';

type NavItem = { to: string; label: string; match?: 'exact' | 'startsWith' };

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', match: 'exact' },
  { to: '/About', label: 'About Me', match: 'startsWith' },
  { to: '/skills', label: 'Skills', match: 'startsWith' },
  { to: '/projects', label: 'Projects', match: 'startsWith' },
  { to: '/resume', label: 'Resume', match: 'startsWith' },
];

const NavigationBar: React.FC = () => {
  const location = useLocation();

  const linksRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    visible: boolean;
  }>({
    left: 0,
    width: 0,
    visible: false,
  });

  const activePath = useMemo(() => {
    const path = location.pathname;
    for (const item of NAV_ITEMS) {
      if (item.match === 'startsWith') {
        if (path.startsWith(item.to)) return item.to;
      } else {
        if (path === item.to) return item.to;
      }
    }
    return path; // fallback
  }, [location.pathname]);

  const updateIndicator = () => {
    const container = linksRef.current;
    const activeEl = itemRefs.current[activePath];
    if (!container || !activeEl) {
      setIndicator(s => ({ ...s, visible: false }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    const left = aRect.left - cRect.left + container.scrollLeft;
    const width = aRect.width;
    setIndicator({ left, width, visible: true });
  };

  useEffect(() => {
    updateIndicator();
    const handle = () => updateIndicator();
    window.addEventListener('resize', handle, { passive: true });
    // Recompute on font load / images / route change
    const t = setTimeout(handle, 50);
    return () => {
      window.removeEventListener('resize', handle);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath]);

  return (
    <>
      {/* need to keep, empty spacer for nav bar */}
      <div className="nav-wrapper">
        <div className="nav-rail nav-rail-left" aria-hidden="true" />
        <div className="nav-rail nav-rail-right" aria-hidden="true" />

        <nav className="navigation_container" aria-label="Primary">
          <div className="nav-inner">
            <div className="nav-links" ref={linksRef}>
              <span
                className={`nav-active-indicator ${indicator.visible ? 'show' : ''}`}
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: indicator.width,
                }}
                aria-hidden="true"
              />
              {NAV_ITEMS.map(item => {
                const isActive =
                  item.match === 'startsWith'
                    ? location.pathname.startsWith(item.to)
                    : location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`link ${isActive ? 'active' : ''}`}
                    ref={(el: HTMLAnchorElement | null) => {
                      itemRefs.current[item.to] = el;
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Sticky elements that move with content */}
      <div className="nav-sticky-line" aria-hidden="true" />
      <div
        className="nav-sticky-rail nav-sticky-rail-left"
        aria-hidden="true"
      />
      <div
        className="nav-sticky-rail nav-sticky-rail-right"
        aria-hidden="true"
      />
    </>
  );
};

export default NavigationBar;
