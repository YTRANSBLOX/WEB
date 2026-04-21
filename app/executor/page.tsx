'use client';
import { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://bkhdyrrtvafaiadtgyht.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJraGR5cnJ0dmFmYWlhZHRneWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MTIzMjEsImV4cCI6MjA4OTI4ODMyMX0.g0wE4UG-vXsGlgNQkzF8NBbcHWMq-CNQ4oBgCcs9Ios';

type Executor = {
  id: string;
  name: string;
  icon_url?: string;
  platform: string;
  linkvertise_url: string;
  last_updated?: string;
};

export default function Executor() {
  const [executors, setExecutors] = useState<Executor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/executors?order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    })
      .then(r => r.json())
      .then(data => { setExecutors(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --green:#00ff87;--green2:#00cc6a;
          --dark:#050505;--surface:#0c0c0c;--surface2:#121212;
          --line:#1e1e1e;--line2:#2a2a2a;
          --white:#f4f4f4;--grey:#5a5a5a;
        }
        html,body{width:100%;background:#050505;color:var(--white);font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;height:56px;display:flex;align-items:center;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(5,5,5,0.92);backdrop-filter:blur(20px);}
        .logo{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:4px;color:var(--white);cursor:pointer;}
        .logo span{color:var(--green);}
        .nav-links{display:flex;gap:16px;list-style:none;margin-left:auto;}
        .nav-links a{font-size:0.62rem;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--grey);text-decoration:none;transition:color 0.2s;}
        .nav-links a:hover{color:var(--white);}
        .nav-links a.active{color:var(--green);}
        .wrap{padding:80px 20px 60px;max-width:680px;margin:0 auto;}
        .exec-count{font-size:0.65rem;color:var(--grey);margin-bottom:12px;font-weight:600;}
        .exec-list{display:flex;flex-direction:column;gap:10px;}
        .exec-card{background:var(--surface);border:1px solid var(--line2);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px;transition:border-color 0.2s,transform 0.2s;}
        .exec-card:hover{border-color:rgba(0,255,135,0.35);transform:translateY(-2px);}
        .exec-card-icon{width:48px;height:48px;border-radius:10px;flex-shrink:0;overflow:hidden;border:1px solid var(--line2);background:var(--surface2);display:flex;align-items:center;justify-content:center;}
        .exec-card-icon img{width:100%;height:100%;object-fit:contain;}
        .exec-card-icon-ph{font-size:0.42rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(0,255,135,0.25);}
        .exec-card-info{flex:1;min-width:0;}
        .exec-card-name{font-family:'Bebas Neue',sans-serif;font-size:1.05rem;letter-spacing:1px;color:var(--white);line-height:1;margin-bottom:6px;}
        .exec-card-badges{display:flex;gap:5px;flex-wrap:wrap;}
        .exec-badge{font-size:0.38rem;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;padding:2px 6px;border-radius:3px;border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.3);}
        .exec-badge.platform{color:#a78bfa;border-color:rgba(167,139,250,0.2);background:rgba(167,139,250,0.05);}
        .exec-badge.free{color:var(--green);border-color:rgba(0,255,135,0.2);background:rgba(0,255,135,0.05);}
        .exec-card-updated{font-size:0.5rem;color:#888;margin-top:5px;letter-spacing:0.5px;}
        .exec-card-btn{flex-shrink:0;padding:9px 18px;background:var(--green);border:none;border-radius:6px;color:#000;font-family:'Syne',sans-serif;font-size:0.6rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
        .exec-card-btn:hover{background:var(--green2);transform:translateY(-1px);}
        .loading{text-align:center;padding:60px 20px;color:var(--grey);font-size:0.8rem;}
        .empty{text-align:center;padding:40px 20px;color:var(--grey);font-size:0.7rem;}
      `}</style>

      <nav>
        <span className="logo">RANS<span>BLOX</span></span>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/scripts">Scripts</a></li>
          <li><a href="/executor" className="active">Executor</a></li>
          <li><a href="/legal">Legal</a></li>
        </ul>
      </nav>

      <div className="wrap">
        {loading ? (
          <div className="loading">Loading executors...</div>
        ) : executors.length === 0 ? (
          <div className="empty">No executors available yet.</div>
        ) : (
          <>
            <div className="exec-count">{executors.length} Executor{executors.length !== 1 ? 's' : ''} Available</div>
            <div className="exec-list">
              {executors.map(ex => {
                const platform = ex.platform === 'both' ? 'Mobile/PC' : ex.platform === 'mobile' ? 'Mobile' : 'PC';
                return (
                  <div key={ex.id} className="exec-card">
                    <div className="exec-card-icon">
                      {ex.icon_url
                        ? <img src={ex.icon_url} alt={ex.name} />
                        : <span className="exec-card-icon-ph">{ex.name.slice(0,2).toUpperCase()}</span>
                      }
                    </div>
                    <div className="exec-card-info">
                      <div className="exec-card-name">{ex.name}</div>
                      <div className="exec-card-badges">
                        <span className="exec-badge platform">{platform}</span>
                        <span className="exec-badge free">Free</span>
                      </div>
                      {ex.last_updated && (
                        <div className="exec-card-updated">
                          Last updated: {new Date(ex.last_updated).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
                        </div>
                      )}
                    </div>
                    <button className="exec-card-btn" onClick={() => window.open(ex.linkvertise_url, '_blank')}>
                      Download
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
