import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpiderWebBg from '../components/SpiderWebBg';
import { events } from '../data/events';
import { bndLogo } from '../assets/images';
import { useSwing } from '../context/TransitionContext';

/* ── Spider-Man themed SVG icons ───────────────────────────── */
const WebShooterIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="contact-icon">
    <circle cx="20" cy="20" r="19" stroke="#e62429" strokeWidth="2" fill="#1a0000" />
    <line x1="20" y1="4" x2="20" y2="36" stroke="#e62429" strokeWidth="1.2" opacity="0.5" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="#e62429" strokeWidth="1.2" opacity="0.5" />
    <line x1="8" y1="8" x2="32" y2="32" stroke="#e62429" strokeWidth="1.2" opacity="0.4" />
    <line x1="32" y1="8" x2="8" y2="32" stroke="#e62429" strokeWidth="1.2" opacity="0.4" />
    <ellipse cx="20" cy="20" rx="8" ry="8" stroke="#e62429" strokeWidth="1" fill="none" opacity="0.6" />
    <ellipse cx="20" cy="20" rx="13" ry="13" stroke="#e62429" strokeWidth="1" fill="none" opacity="0.4" />
    <path d="M14 14c2-2 4-2 5 0l1.5 2.5c.5 1 0 2-.8 2.5l-1 .6c.4 1.2 1.2 2.5 2.2 3.5s2.3 1.8 3.5 2.2l.6-1c.5-.8 1.5-1.3 2.5-.8L30 25c2 1 2 3 0 5-3 2-8 1-12-3s-5-9-3-12" fill="#e62429" />
  </svg>
);

const SpiderWebIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="contact-icon">
    <circle cx="20" cy="20" r="19" stroke="#e62429" strokeWidth="2" fill="#1a0000" />
    <line x1="20" y1="4" x2="20" y2="36" stroke="#e62429" strokeWidth="1.2" opacity="0.5" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="#e62429" strokeWidth="1.2" opacity="0.5" />
    <line x1="8" y1="8" x2="32" y2="32" stroke="#e62429" strokeWidth="1.2" opacity="0.4" />
    <line x1="32" y1="8" x2="8" y2="32" stroke="#e62429" strokeWidth="1.2" opacity="0.4" />
    <ellipse cx="20" cy="20" rx="5" ry="5" stroke="#e62429" strokeWidth="1" fill="none" opacity="0.8" />
    <ellipse cx="20" cy="20" rx="9" ry="9" stroke="#e62429" strokeWidth="1" fill="none" opacity="0.6" />
    <ellipse cx="20" cy="20" rx="13" ry="13" stroke="#e62429" strokeWidth="1" fill="none" opacity="0.4" />
    <path d="M11 15h18v12H11z" stroke="#e62429" strokeWidth="1.5" fill="none" />
    <path d="M11 15l9 7 9-7" stroke="#e62429" strokeWidth="1.5" fill="none" />
  </svg>
);

const WebStrandIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="contact-icon">
    <circle cx="20" cy="20" r="19" stroke="#e62429" strokeWidth="2" fill="#1a0000" />
    <line x1="20" y1="4" x2="20" y2="36" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="8" x2="32" y2="32" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="8" x2="8" y2="32" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <path d="M20 10c-5.5 0-10 4-10 9 0 2 .7 4 1.8 5.5L10 30l5.8-1.6C17.1 29 18.5 29.4 20 29.4c5.5 0 10-4 10-9S25.5 10 20 10z" fill="#e62429" opacity="0.9" />
    <line x1="20" y1="8" x2="20" y2="4" stroke="#e62429" strokeWidth="1.5" />
    <line x1="24" y1="9" x2="28" y2="5" stroke="#e62429" strokeWidth="1.5" />
    <line x1="16" y1="9" x2="12" y2="5" stroke="#e62429" strokeWidth="1.5" />
  </svg>
);

const SpiderSymbolIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="contact-icon">
    <circle cx="20" cy="20" r="19" stroke="#e62429" strokeWidth="2" fill="#1a0000" />
    <line x1="20" y1="4" x2="20" y2="36" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="8" x2="32" y2="32" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="8" x2="8" y2="32" stroke="#e62429" strokeWidth="1" opacity="0.3" />
    <ellipse cx="20" cy="18" rx="4" ry="3" fill="#e62429" />
    <ellipse cx="20" cy="24" rx="3" ry="4" fill="#e62429" />
    <line x1="16" y1="17" x2="9" y2="13" stroke="#e62429" strokeWidth="1.5" />
    <line x1="16" y1="19" x2="8" y2="19" stroke="#e62429" strokeWidth="1.5" />
    <line x1="16" y1="21" x2="9" y2="25" stroke="#e62429" strokeWidth="1.5" />
    <line x1="24" y1="17" x2="31" y2="13" stroke="#e62429" strokeWidth="1.5" />
    <line x1="24" y1="19" x2="32" y2="19" stroke="#e62429" strokeWidth="1.5" />
    <line x1="24" y1="21" x2="31" y2="25" stroke="#e62429" strokeWidth="1.5" />
    <ellipse cx="18" cy="17" rx="1.2" ry="1" fill="white" />
    <ellipse cx="22" cy="17" rx="1.2" ry="1" fill="white" />
  </svg>
);

const Home = () => {
  const location = useLocation();
  const { swingTo } = useSwing();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
  };

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section id="home" className="hero-section">
        <SpiderWebBg />
        <div className="container">
          <div className="hero-center">

            <div className="hero-eyebrow">
              <span /> B.Com Professional · Christ College Irinjalakuda
            </div>

            <h1 className="hero-logo-heading">
              <img
                src={bndLogo}
                alt="VENTORA Brand New Day"
                className="hero-logo-main"
              />
            </h1>

            <p className="hero-subtitle">
              The Commerce Carnival presented by the Department of B.Com Professional,
              Christ College (Autonomous) Irinjalakuda — a power-packed fest with vibrant
              events, thrilling competitions, and electrifying performances.
            </p>

            <div className="hero-date">
              <div className="hero-date-badge">📅 Sept 2026</div>
              <div>· Christ College, Irinjalakuda</div>
            </div>

            <div className="cta-row cta-row--center">
              <button className="btn btn-primary" onClick={() => scrollTo('events')}>
                🕷 Explore Events
              </button>
              <a className="btn btn-outline" href="/pdf.pdf" target="_blank" rel="noopener">
                📄 Download Brochure
              </a>
            </div>

          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag" />
            <h2 className="section-title">About <span className="accent">Us</span></h2>
          </div>

          <div className="about-card">
            <h4>Learn about Christ College (Autonomous), Irinjalakuda and Ventora 2026 — The Commerce Carnival</h4>

            <h5>About Our College</h5>
            <p>
              <strong>Christ College (Autonomous), Irinjalakuda</strong> is a distinguished Syro-Malabar Catholic
              institution run by the Carmelites of Mary Immaculate (CMI). Founded in 1956 by{' '}
              <strong>Fr. Gabriel Chiramel CMI</strong>, it was inaugurated the following year and initially
              affiliated to the University of Kerala, later transitioning to the University of Calicut.
            </p>
            <p>
              In 2015, it was granted autonomous status, and in 2022, it proudly became the first institution
              in Thrissur district to be accredited with an A++ grade by NAAC. Guided by its motto{' '}
              <strong>"Jeevitha Prabha"</strong> ("Light of Life"), Christ College continues to inspire excellence
              in academics, research, and holistic development under the leadership of{' '}
              <strong>Rev. Dr. Jolly Andrews CMI</strong>, Principal.
            </p>
            <p>
              Among its most dynamic departments is the <strong>B.Com Professional Department</strong>, a vibrant
              hub for aspiring commerce professionals at Christ College (Autonomous), Irinjalakuda. Established in
              2017 under the Self-Financing Commerce wing, the department was designed to provide a strong academic
              foundation for students aiming to excel in competitive professional qualifications such as CA, CMA,
              ACCA and CS. The department thrives under the guidance of Dr. K O Francis, Head of the Department
              (B.Com Professional).
            </p>
            <p>
              With a curriculum that blends rigorous theoretical knowledge and practical skill-building, the
              department offers a three-year undergraduate program affiliated to the University of Calicut.
            </p>

            <h5>Goal of VENTORA 2026</h5>
            <ul className="about-list">
              <li><strong>Unshakable Spirit (Resilience):</strong> The arena tests more than skill; it tests grit. Participants face rapid shifts, high-pressure challenges, and unexpected twists, proving that true champions adapt, endure, and rise stronger each time.</li>
              <li><strong>The Strategist's Mind (Critical Thinking):</strong> Every decision is a move on the grand chessboard of commerce. Quick logic, sharp analysis, and the ability to spot hidden opportunities set the victors apart.</li>
              <li><strong>Power in Unity (Collaboration):</strong> No empire is built alone. Diverse talents join forces, combining strengths, perspectives, and expertise to conquer challenges and craft success stories together.</li>
              <li><strong>The Spark of Creation (Innovation):</strong> Ideas are currency and originality is power. From daring solutions to disruptive concepts, innovation fuels the future of commerce in ways the world hasn't seen before.</li>
            </ul>

            <h5>VENTORA 2026 — Brand New Day</h5>
            <p>
              Ventora 2026 — Brand New Day, themed <strong>"Igniting Minds, Shaping Futures"</strong>, isn't just
              another business fest — it's a living arena where ambition meets action. The moment you step in,
              you're no longer just a participant; you're a strategist, a negotiator, a visionary. Every event is
              a pressure chamber — markets rise and fall in minutes, alliances are built and broken, innovations
              are born from thin air.
            </p>
            <p>
              Here, resilience isn't just a word — it's your lifeline when the odds tilt against you. Critical
              thinking is the compass that guides you through complex business mazes. Collaboration turns
              competitors into allies when the stakes demand it. And innovation? That's your weapon to rewrite
              the rules before anyone else does.
            </p>
            <p>
              Ventora 2026 is where the future of commerce is not just discussed — it's forged in real time,
              by those bold enough to shape it.
            </p>

            <h5>Why Ventora is Different</h5>
            <ul className="about-list">
              <li><strong>A Strong, Unifying Theme:</strong> "Brand New Day" — a bold new chapter for commerce.</li>
              <li><strong>Commerce Meets Creativity:</strong> A fusion of business acumen with artistic expression.</li>
              <li><strong>Real-World Skill Testing:</strong> Simulations of real business crises, not just textbook cases.</li>
              <li><strong>Immersive Set &amp; Experience:</strong> Film-like production quality in stage design, props, and lighting.</li>
              <li><strong>National-Level Participation:</strong> Drawing top talent from across India.</li>
              <li><strong>Balanced Entertainment &amp; Learning:</strong> Skills, perspectives, and networks alongside memories.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── EVENTS ────────────────────────────────────────── */}
      <section id="events" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag" />
            <h2 className="section-title">Our <span className="accent">Events</span></h2>
          </div>

          <div className="events-grid">
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card"
                aria-label={`Open ${event.name}`}
                role="button"
                tabIndex={0}
                onClick={() => swingTo(`/event/${event.id}`)}
                onKeyDown={(e) => e.key === 'Enter' && swingTo(`/event/${event.id}`)}
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="event-card-img"
                  loading="lazy"
                />
                <div className="event-card-overlay" />
                <div className="event-card-body">
                  <div className="event-card-name">{event.name}</div>
                  <div className="event-card-arrow">View Details →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag" />
            <h2 className="section-title">Contact <span className="accent">Us</span></h2>
          </div>

          <div className="contact-grid">
            <div className="contact-card">

              {/* Phone — Web-Shooter icon */}
              <div className="contact-item">
                <WebShooterIcon />
                <div>
                  <div className="contact-label">Phone</div>
                  <a href="tel:+917034103039" className="contact-value" style={{ display: 'block' }}>Aryan K Manoj: 7034103039</a>
                  <a href="tel:+918921900821" className="contact-value" style={{ display: 'block' }}>Niranjana K Jayaram: 8921900821</a>
                  <a href="tel:+917736115650" className="contact-value" style={{ display: 'block' }}>Edrin Anto P: 7736115650</a>
                </div>
              </div>

              {/* Email — Spider Web icon */}
              <div className="contact-item">
                <SpiderWebIcon />
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:ventora.bcp@gmail.com" className="contact-value">ventora.bcp@gmail.com</a>
                </div>
              </div>

              {/* WhatsApp — Web Strand icon */}
              <div className="contact-item">
                <WebStrandIcon />
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <a href="https://wa.me/+91 7736115650" target="_blank" rel="noopener noreferrer" className="contact-value">7736115650</a>
                </div>
              </div>

              {/* Instagram — Spider Symbol icon */}
              <div className="contact-item">
                <SpiderSymbolIcon />
                <div>
                  <div className="contact-label">Instagram</div>
                  <a
                    href="https://www.instagram.com/ventora.2026?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value"
                  >
                    @ventora.2026
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
