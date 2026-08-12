import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { events } from '../data/events';

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (event) document.title = `${event.name} — VENTORA Brand New Day 2026`;
  }, [event]);

  if (!event) {
    return (
      <main className="section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '48px', color: 'var(--primary-glow)', letterSpacing: '3px' }}>
            Event Not Found
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '16px' }}>
            The event you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: '24px' }}>
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-enter">
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '60px' }}>

        {/* Back link */}
        <Link to="/#events" className="back-link">
          ← Back to Events
        </Link>

        {/* Hero Image */}
        <div className="event-detail-hero">
          <img src={event.image} alt={event.name} />
        </div>

        {/* Title */}
        <h1 className="event-detail-title">{event.name}</h1>
        {event.tagline && <p className="event-detail-sub">{event.tagline}</p>}

        {/* Stat Cards */}
        <div className="detail-cards-grid">
          <div className="detail-stat-card">
            <h3>Registration Fee</h3>
            <p>{event.fee}</p>
          </div>
          <div className="detail-stat-card">
            <h3>Registration Ends</h3>
            <p>{event.registrationEnd}</p>
          </div>
          <div className="detail-stat-card">
            <h3>Prizes</h3>
            <p>{event.prizes}</p>
          </div>
        </div>

        {/* Description / Rounds */}
        <div className="event-description">
          {event.description && <p>{event.description}</p>}

          {event.rounds?.map((round, i) => (
            <div key={i}>
              <h3>{round.title}</h3>
              {round.content?.map((item, j) => (
                <p key={j}>
                  <strong>{item.label}:</strong> {item.text}
                </p>
              ))}
              {round.bullets && (
                <ul>
                  {round.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Register Button */}
        <div className="register-row">
          <a
            className="btn btn-primary"
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🕷 Register Now
          </a>
        </div>

        {/* Footer credits */}
        <div style={{ textAlign: 'center', marginTop: '48px', color: 'var(--muted)', fontSize: '13px', borderTop: '1px solid rgba(204,0,0,0.1)', paddingTop: '20px' }}>
          © <strong style={{ color: 'var(--primary-glow)' }}>VENTORA Brand New Day 2026</strong> — The Commerce Carnival · Christ College (Autonomous), Irinjalakuda
        </div>
      </div>
    </main>
  );
};

export default EventDetail;
