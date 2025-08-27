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
      <div className="dashboard-time">My Project Metrics</div>
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
          <div className="metric-label">Database Performance</div>
          <div className="metric-description">Improved load times by 80%</div>
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
              15,000+
            </motion.span>
          </div>
          <div className="metric-label">Portfolio Engagement</div>
          <div className="metric-description">Monthly views on my projects</div>
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
          <div className="metric-label">Automation Impact</div>
          <div className="metric-description">Reduced manual config work</div>
        </div>
      </div>
      <div className="charts-section">
        <div className="chart-container large-chart">
          <div className="chart-title">Performance Improvements I've Delivered</div>
          <div className="detailed-chart">
            <svg width="100%" height="200" viewBox="0 0 400 200">
              <defs>
                <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#21262d" strokeWidth="1"/>
                </pattern>
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
                <linearGradient
                  id="secondLineGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#58a6ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3"/>
              
              <text x="15" y="25" fill="#7d8590" fontSize="10" textAnchor="middle">100%</text>
              <text x="15" y="75" fill="#7d8590" fontSize="10" textAnchor="middle">50%</text>
              <text x="15" y="125" fill="#7d8590" fontSize="10" textAnchor="middle">25%</text>
              <text x="15" y="175" fill="#7d8590" fontSize="10" textAnchor="middle">0%</text>
              
              <text x="50" y="195" fill="#7d8590" fontSize="10" textAnchor="middle">Q1</text>
              <text x="150" y="195" fill="#7d8590" fontSize="10" textAnchor="middle">Q2</text>
              <text x="250" y="195" fill="#7d8590" fontSize="10" textAnchor="middle">Q3</text>
              <text x="350" y="195" fill="#7d8590" fontSize="10" textAnchor="middle">Q4</text>
              
              <motion.path
                d="M 40 160 L 80 140 L 120 100 L 160 80 L 200 60 L 240 45 L 280 35 L 320 30 L 360 25"
                stroke="#00d4aa"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={
                  dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }
                }
                transition={{ delay: 2, duration: 2.5, ease: 'easeInOut' }}
              />
              
              {/* Secondary metric line */}
              <motion.path
                d="M 40 170 L 80 155 L 120 130 L 160 110 L 200 90 L 240 75 L 280 65 L 320 55 L 360 50"
                stroke="#58a6ff"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={
                  dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }
                }
                transition={{ delay: 2.5, duration: 2.5, ease: 'easeInOut' }}
              />
              
              {/* Area fills */}
              <motion.path
                d="M 40 160 L 80 140 L 120 100 L 160 80 L 200 60 L 240 45 L 280 35 L 320 30 L 360 25 L 360 175 L 40 175 Z"
                fill="url(#chartGradient)"
                initial={{ pathLength: 0 }}
                animate={
                  dashboardVisible ? { pathLength: 1 } : { pathLength: 0 }
                }
                transition={{ delay: 3, duration: 2, ease: 'easeInOut' }}
              />
              
              {/* Data points */}
              {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => {
                const y = [160, 140, 100, 80, 60, 45, 35, 30, 25][i];
                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#00d4aa"
                    initial={{ scale: 0 }}
                    animate={dashboardVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 3.5 + i * 0.1, duration: 0.3 }}
                  />
                );
              })}
            </svg>
            
            {/* Chart legend */}
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color primary"></div>
                <span>Load Time Optimization</span>
              </div>
              <div className="legend-item">
                <div className="legend-color secondary"></div>
                <span>User Experience Score</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="right-widgets">
          <div className="gauge-container">
            <div className="chart-title">
              Code Quality Standards
              <svg
                className="trend-up-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                <polyline points="17,6 23,6 23,12" />
              </svg>
            </div>
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
          
          <div className="achievements-widget desktop-only">
            <div className="chart-title">Recent Achievements</div>
            <div className="achievement-items">
              {[
                { 
                  title: 'Database Migration', 
                  description: 'Migrated legacy system to modern stack',
                  date: 'Dec 2024',
                  impact: '+80% performance',
                  icon: 'database'
                },
                { 
                  title: 'Automation Pipeline', 
                  description: 'Built CI/CD with automated testing',
                  date: 'Oct 2024',
                  impact: '-40% manual work',
                  icon: 'automation'
                },
                { 
                  title: 'API Redesign', 
                  description: 'RESTful API with improved caching',
                  date: 'Aug 2024',
                  impact: '50ms response time',
                  icon: 'api'
                },
                { 
                  title: 'Security Audit', 
                  description: 'Implemented OAuth 2.0 & encryption',
                  date: 'Jun 2024',
                  impact: 'Zero vulnerabilities',
                  icon: 'security'
                }
              ].map((achievement, i) => (
                <motion.div 
                  key={achievement.title} 
                  className="achievement-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={dashboardVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 4 + i * 0.15, duration: 0.5 }}
                >
                  <div className="achievement-icon">
                    {achievement.icon === 'database' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3"/>
                        <path d="m3 5 0 14c0 1.67 4.03 3 9 3s9-1.33 9-3V5"/>
                        <path d="m3 12c0 1.67 4.03 3 9 3s9-1.33 9-3"/>
                      </svg>
                    )}
                    {achievement.icon === 'automation' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4"/>
                        <path d="m16.2 7.8 2.9-2.9"/>
                        <path d="M18 12h4"/>
                        <path d="m16.2 16.2 2.9 2.9"/>
                        <path d="M12 18v4"/>
                        <path d="m4.9 19.1 2.9-2.9"/>
                        <path d="M2 12h4"/>
                        <path d="m4.9 4.9 2.9 2.9"/>
                      </svg>
                    )}
                    {achievement.icon === 'api' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 10v12"/>
                        <path d="M15 5.88 14 10l5.88.7z"/>
                        <path d="M22 5 12 22 2 5h20z"/>
                      </svg>
                    )}
                    {achievement.icon === 'security' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    )}
                  </div>
                  <div className="achievement-content">
                    <div className="achievement-header">
                      <div className="achievement-title">{achievement.title}</div>
                      <div className="achievement-date">{achievement.date}</div>
                    </div>
                    <div className="achievement-description">{achievement.description}</div>
                    <div className="achievement-impact">{achievement.impact}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MockDashboard;
