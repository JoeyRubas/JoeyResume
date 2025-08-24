import React from 'react';
import './styles.css';
import { motion } from 'framer-motion';

interface MockDashboardProps {
  dashboardVisible: boolean;
  dashboardRef?: React.RefObject<HTMLDivElement | null>;
}

const MockDashboard: React.FC<MockDashboardProps> = ({
  dashboardVisible,
  dashboardRef,
}) => (
  <div className="mock-dashboard" ref={dashboardRef}>
    <div className="dashboard-header">
      <div className="dashboard-title">
        <svg
          className="dashboard-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
        Analytics Dashboard
      </div>
      <div className="dashboard-time">Last updated: 2 minutes ago</div>
    </div>
    <div className="dashboard-content">
      <div className="metric-cards">
        <div className="metric-card">
          <div className="metric-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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
                animate={
                  dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }
                }
                transition={{ delay: 2, duration: 2, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient
                  id="chartGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 20 100 Q 80 80 150 40 T 280 20 L 280 100 L 20 100"
                fill="url(#chartGradient)"
                initial={{ pathLength: 0 }}
                animate={
                  dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }
                }
                transition={{ delay: 2.5, duration: 2, ease: 'easeInOut' }}
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
                animate={
                  dashboardVisible
                    ? { strokeDashoffset: 25.1 }
                    : { strokeDashoffset: 125.6 }
                }
                transition={{ delay: 3, duration: 2, ease: 'easeInOut' }}
              />
            </svg>
            <div className="gauge-value">98%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MockDashboard;
