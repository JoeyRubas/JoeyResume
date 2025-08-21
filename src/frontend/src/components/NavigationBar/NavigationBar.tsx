import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, Link } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import "./styles.css";

type NavItem = { to: string; label: string; match?: "exact" | "startsWith" };

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", match: "exact" },
  { to: "/skills", label: "Skills", match: "startsWith" },
  { to: "/resume", label: "Resume", match: "startsWith" },
  { to: "/portfolio", label: "Portfolio", match: "startsWith" },
];

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const linksRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  const activePath = useMemo(() => {
    const path = location.pathname;
    for (const item of NAV_ITEMS) {
      if (item.match === "startsWith") {
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
      setIndicator((s) => ({ ...s, visible: false }));
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
    window.addEventListener("resize", handle, { passive: true });
    // Recompute on font load / images / route change
    const t = setTimeout(handle, 50);
    return () => {
      window.removeEventListener("resize", handle);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
  };

  return (
    <div className="nav-wrapper">
      
      <div className="nav-rail nav-rail-left" aria-hidden="true" />
      <div className="nav-rail nav-rail-right" aria-hidden="true" />

      <nav className="navigation_container" aria-label="Primary">
        
        <div className="nav-inner">
          <div className="nav-links" ref={linksRef}>
            
            <span
              className={`active-indicator ${indicator.visible ? "show" : ""}`}
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
              aria-hidden="true"
            />
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.match === "startsWith"
                  ? location.pathname.startsWith(item.to)
                  : location.pathname === item.to;
              return (
                <span
                  key={item.to}
                  ref={(el) => (itemRefs.current[item.to] = el)}
                  style={{ display: "inline-block" }}
                >
                  <Link
                    to={item.to}
                    className={`link ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </span>
              );
            })}
            {isAuthenticated ? (
              <a href="/logout" className="link auth-link" onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <span
                ref={(el) => (itemRefs.current["/login"] = el)}
                style={{ display: "inline-block" }}
              >
                <Link
                  to="/login"
                  className={`link auth-link ${location.pathname === "/login" ? "active" : ""}`}
                >
                  Login
                </Link>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
