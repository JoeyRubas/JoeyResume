import React from 'react';
import './styles.css';
import GitHubCalendar from 'react-github-calendar';

const Home: React.FC = () => {
  return (
    <main className="home-page">
      <section className="home-hero">
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
        <GitHubCalendar username="JoeyRubas"/>
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

export default Home;
