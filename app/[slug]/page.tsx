export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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
  loadstring?: string;
  description?: string;
  status?: string;
  created_at: string;
};
export default function ScriptDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`${SUPABASE_URL}/rest/v1/scripts?slug=eq.${slug}&is_public=eq.true&limit=1`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) setScript(data[0]);
        else setNotFound(true);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  function copyScript() {
    if (!script?.loadstring) return;
    navigator.clipboard.writeText(script.loadstring);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --green:#00ff87;--green2:#00cc6a;
          --dark:#050505;--surface:#0c0c0c;--surface2:#121212;
          --line:#1e1e1e;--line2:#2a2a2a;
          --white:#f4f4f4;--grey:#5a5a5a;--yellow:#febc2e;--red:#ff3b3b;
        }
        html,body{width:100%;background:#050505;color:var(--white);font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;height:56px;display:flex;align-items:center;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(5,5,5,0.92);backdrop-filter:blur(20px);}
        .logo{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:4px;color:var(--white);cursor:pointer;}
        .logo span{color:var(--green);}
        .nav-links{display:flex;gap:16px;list-style:none;margin-left:auto;}
        .nav-links a{font-size:0.62rem;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--grey);text-decoration:none;transition:color 0.2s;}
        .nav-links a:hover{color:var(--white);}
        .wrap{padding:80px 20px 60px;max-width:640px;margin:0 auto;}
        .back-btn{background:none;border:none;color:var(--grey);cursor:pointer;display:flex;align-items:center;gap:6px;font-family:'Syne',sans-serif;font-size:0.58rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 0;margin-bottom:16px;transition:color 0.18s;}
        .back-btn:hover{color:var(--white);}
        .sp-thumb{width:100%;aspect-ratio:16/9;border-radius:10px;background:var(--surface2);margin-bottom:16px;overflow:hidden;border:1px solid var(--line);}
        .sp-thumb img{width:100%;height:100%;object-fit:cover;display:block;border-radius:9px;}
        .sp-thumb-empty{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--grey);font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;}
        .badges{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;}
        .badge{font-size:0.52rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:3px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.55);}
        .badge.game{color:var(--green);border-color:rgba(0,255,135,0.2);background:rgba(0,255,135,0.05);}
        .badge.working{color:var(--green);border-color:rgba(0,255,135,0.2);}
        .badge.broken{color:var(--red);border-color:rgba(255,59,59,0.2);}
        .badge.key{color:var(--yellow);border-color:rgba(245,158,11,0.2);background:rgba(245,158,11,0.05);}
        .badge.nokey{color:var(--green);border-color:rgba(0,255,135,0.2);background:rgba(0,255,135,0.05);}
        .badge.platform{color:#a78bfa;border-color:rgba(167,139,250,0.2);background:rgba(167,139,250,0.05);}
        .sp-title{font-family:'Bebas Neue',sans-serif;font-size:1.9rem;letter-spacing:2px;line-height:1;color:var(--white);margin-bottom:14px;}
        .ls-block{background:#0e0e0e;border:1px solid rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;margin-bottom:10px;}
        .ls-bar{display:flex;align-items:center;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.05);background:#141414;}
        .ls-dots{display:flex;gap:5px;margin-right:8px;}
        .ls-dot{width:8px;height:8px;border-radius:50%;}
        .ls-dot:nth-child(1){background:#ff5f57;}
        .ls-dot:nth-child(2){background:#febc2e;}
        .ls-dot:nth-child(3){background:#28c840;}
        .ls-bar-label{font-size:0.52rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.22);font-family:'JetBrains Mono',monospace;}
        .ls-content{padding:14px 16px;font-family:'JetBrains Mono',monospace;font-size:0.76rem;color:#cbd5e1;line-height:1.8;word-break:break-all;max-height:150px;overflow-y:auto;}
        .copy-btn{width:100%;padding:14px;background:var(--green);border:none;border-radius:10px;color:#000;font-family:'Syne',sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s;margin-bottom:20px;}
        .copy-btn:hover{background:var(--green2);}
        .copy-btn.done{background:var(--surface2);color:var(--green);border:1px solid rgba(0,255,135,0.25);}
        .loading{text-align:center;padding:100px 20px;color:var(--grey);}
        .not-found{text-align:center;padding:100px 20px;}
        .not-found h2{font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--green);margin-bottom:8px;}
        .not-found p{color:var(--grey);font-size:0.8rem;}
      `}</style>

      <nav>
        <span className="logo">RANS<span>BLOX</span></span>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/scripts">Scripts</a></li>
          <li><a href="/executor">Executor</a></li>
          <li><a href="/legal">Legal</a></li>
        </ul>
      </nav>

      <div className="wrap">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>

        {loading && <div className="loading">Loading...</div>}

        {notFound && (
          <div className="not-found">
            <h2>404</h2>
            <p>Script not found.</p>
          </div>
        )}

        {script && (
          <>
            <div className="sp-thumb">
              {script.thumbnail
                ? <img src={script.thumbnail} alt={script.title} />
                : <div className="sp-thumb-empty">No Preview</div>
              }
            </div>

            <div className="badges">
              <span className="badge game">{script.game}</span>
              <span className={`badge ${script.status === 'broken' ? 'broken' : 'working'}`}>
                {script.status === 'broken' ? 'Broken' : 'Working'}
              </span>
              <span className={`badge ${script.key_system ? 'key' : 'nokey'}`}>
                {script.key_system ? 'Key Required' : 'No Key'}
              </span>
              {script.platform && <span className="badge platform">{script.platform}</span>}
            </div>

            <h1 className="sp-title">{script.title}</h1>

            {script.loadstring && (
              <>
                <div className="ls-block">
                  <div className="ls-bar">
                    <div className="ls-dots">
                      <div className="ls-dot" />
                      <div className="ls-dot" />
                      <div className="ls-dot" />
                    </div>
                    <span className="ls-bar-label">Loadstring</span>
                  </div>
                  <div className="ls-content">{script.loadstring}</div>
                </div>
                <button className={`copy-btn ${copied ? 'done' : ''}`} onClick={copyScript}>
                  {copied ? '✓ Copied!' : 'Copy Script'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
