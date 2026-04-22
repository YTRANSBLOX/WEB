'use client';
import { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://bkhdyrrtvafaiadtgyht.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJraGR5cnJ0dmFmYWlhZHRneWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MTIzMjEsImV4cCI6MjA4OTI4ODMyMX0.g0wE4UG-vXsGlgNQkzF8NBbcHWMq-CNQ4oBgCcs9Ios';

type Script = {
  id: string;
  title: string;
  game: string;
  thumbnail?: string;
  platform?: string;
  key_system?: boolean;
  slug?: string;
  created_at: string;
};

export default function Scripts() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyFilter, setKeyFilter] = useState('all');

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/scripts?is_public=eq.true&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    })
      .then(r => r.json())
      .then(data => { setScripts(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = scripts.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.game.toLowerCase().includes(search.toLowerCase());
    const matchKey = keyFilter === 'all' ? true :
      keyFilter === 'nokey' ? !s.key_system : s.key_system;
    return matchSearch && matchKey;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --green:#00ff87;--green2:#00cc6a;
          --dark:#050505;--surface:#0c0c0c;--surface2:#121212;
          --line:#1e1e1e;--line2:#2a2a2a;
          --white:#f4f4f4;--grey:#5a5a5a;--yellow:#febc2e;
        }
        html,body{width:100%;background:#050505;color:var(--white);font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;height:56px;display:flex;align-items:center;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(5,5,5,0.92);backdrop-filter:blur(20px);}
        .logo{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:4px;color:var(--white);cursor:pointer;user-select:none;}
        .logo span{color:var(--green);}
        .nav-links{display:flex;gap:16px;list-style:none;margin-left:auto;}
        .nav-links a{font-size:0.62rem;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--grey);text-decoration:none;transition:color 0.2s;}
        .nav-links a:hover{color:var(--white);}
        .nav-links a.active{color:var(--green);}
        .wrap{padding:80px 20px 40px;max-width:680px;margin:0 auto;}
        .page-label{font-size:0.52rem;letter-spacing:4px;text-transform:uppercase;color:var(--green);margin-bottom:6px;font-weight:700;display:flex;align-items:center;gap:8px;}
        .page-label::before{content:'';width:14px;height:1px;background:rgba(0,255,135,0.4);}
        .page-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,12vw,104px);line-height:0.9;letter-spacing:2px;margin-bottom:20px;}
        .page-title em{font-style:normal;color:transparent;-webkit-text-stroke:2px var(--green);}
        .search-wrap{display:flex;align-items:stretch;border-radius:10px;overflow:hidden;border:1px solid var(--green);width:100%;margin-bottom:12px;}
        .search-input{flex:1;padding:13px 13px 13px 16px;background:var(--surface);border:none;color:var(--white);font-family:'Syne',sans-serif;font-size:14px;outline:none;}
        .search-input::placeholder{color:var(--grey);}
        .search-btn{padding:0 20px;background:var(--green);border:none;color:#000;font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;letter-spacing:1px;cursor:pointer;}
        .filter-group{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
        .filter-btn{padding:5px 12px;background:transparent;border:1px solid var(--line2);border-radius:5px;color:var(--grey);font-family:'Syne',sans-serif;font-size:0.57rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all 0.18s;}
        .filter-btn.active{border-color:var(--green);color:#000;background:var(--green);}
        .scripts-count{font-size:0.72rem;color:var(--grey);margin-bottom:10px;font-weight:600;}
        .scripts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
        .script-card{background:var(--surface);border:1px solid var(--line2);border-radius:6px;padding:10px;cursor:pointer;transition:border-color 0.2s,transform 0.2s;overflow:hidden;}
        .script-card:hover{border-color:rgba(0,255,135,0.4);transform:translateY(-3px);}
        .card-thumb{width:100%;aspect-ratio:16/9;background:var(--surface2);border-radius:4px;overflow:hidden;margin-bottom:8px;}
        .card-thumb img{width:100%;height:100%;object-fit:cover;display:block;}
        .card-thumb-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--surface2),#0e0e0e);}
        .card-tag{font-size:0.42rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--green);margin-bottom:3px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .card-name{font-family:'Bebas Neue',sans-serif;font-size:0.75rem;letter-spacing:0.5px;color:var(--white);line-height:1.1;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .card-badges{display:flex;gap:3px;flex-wrap:wrap;}
        .badge{font-size:0.38rem;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;padding:1px 4px;border-radius:2px;border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.3);}
        .badge.nokey{color:var(--green);border-color:rgba(0,255,135,0.2);background:rgba(0,255,135,0.05);}
        .badge.key{color:var(--yellow);border-color:rgba(254,188,46,0.2);background:rgba(254,188,46,0.05);}
        .badge.platform{color:#a78bfa;border-color:rgba(167,139,250,0.2);background:rgba(167,139,250,0.05);}
        .loading{text-align:center;padding:60px 20px;color:var(--grey);font-size:0.8rem;}
        .no-results{text-align:center;padding:40px 20px;color:var(--grey);font-size:0.7rem;grid-column:1/-1;}
        @media(min-width:768px){.scripts-grid{grid-template-columns:repeat(5,1fr);}.wrap{max-width:1100px;padding:80px 48px 60px;}}
      `}</style>

      <nav>
        <span className="logo">RANS<span>BLOX</span></span>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/executor">Executor</a></li>
          <li><a href="/stats">Stats</a></li>
          <li><a href="/legal">Legal</a></li>
        </ul>
      </nav>

      <div className="wrap">
        <div className="page-label">All Showcased</div>
        <h1 className="page-title">SCRIPTS<br /><em>LIBRARY</em></h1>

        <div className="search-wrap">
          <input
            className="search-input"
            type="text"
            placeholder="Search scripts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>

        <div className="filter-group">
          <button className={`filter-btn ${keyFilter==='all'?'active':''}`} onClick={()=>setKeyFilter('all')}>All</button>
          <button className={`filter-btn ${keyFilter==='nokey'?'active':''}`} onClick={()=>setKeyFilter('nokey')}>No Key</button>
          <button className={`filter-btn ${keyFilter==='key'?'active':''}`} onClick={()=>setKeyFilter('key')}>Key</button>
        </div>

        {loading ? (
          <div className="loading">Loading scripts...</div>
        ) : (
          <>
            <div className="scripts-count">{filtered.length} scripts</div>
            <div className="scripts-grid">
              {filtered.length === 0 ? (
                <div className="no-results">No scripts found</div>
              ) : filtered.map(s => (
                <div key={s.id} className="script-card" onClick={() => s.slug && window.location.assign(`/${s.slug}`)}>
                  <div className="card-thumb">
                    {s.thumbnail
                      ? <img src={s.thumbnail} alt={s.title} />
                      : <div className="card-thumb-ph" />
                    }
                  </div>
                  <div className="card-tag">{s.game}</div>
                  <div className="card-name">{s.title}</div>
                  <div className="card-badges">
                    <span className={`badge ${s.key_system ? 'key' : 'nokey'}`}>{s.key_system ? 'Key' : 'No Key'}</span>
                    {s.platform && <span className="badge platform">{s.platform}</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
