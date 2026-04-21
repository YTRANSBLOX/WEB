'use client';
import { useState } from 'react';

export default function Legal() {
  const [modal, setModal] = useState<'terms'|'privacy'|null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
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
        .wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:80px 24px 40px;}
        .legal-label{font-size:0.52rem;letter-spacing:4px;text-transform:uppercase;color:var(--green);margin-bottom:12px;font-weight:700;display:flex;align-items:center;gap:10px;}
        .legal-label::before,.legal-label::after{content:'';width:20px;height:1px;background:rgba(0,255,135,0.3);}
        .legal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,13vw,116px);line-height:0.9;letter-spacing:2px;text-align:center;margin-bottom:32px;}
        .legal-title em{font-style:normal;color:transparent;-webkit-text-stroke:2px var(--green);}
        .legal-cards{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
        .legal-card{flex:1;min-width:140px;max-width:200px;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px;text-align:center;cursor:pointer;transition:all 0.22s;}
        .legal-card:hover{border-color:rgba(0,255,135,0.3);transform:translateY(-4px);background:rgba(0,255,135,0.03);}
        .legal-card-icon{margin-bottom:10px;color:var(--green);}
        .legal-card-title{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:2px;color:var(--white);margin-bottom:4px;}
        .legal-card-sub{font-size:0.55rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--grey);}
        .modal-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);display:flex;align-items:flex-end;justify-content:center;}
        .modal-box{width:100%;max-width:640px;max-height:82vh;background:var(--surface);border:1px solid var(--line2);border-bottom:none;border-radius:16px 16px 0 0;display:flex;flex-direction:column;overflow:hidden;}
        .modal-handle{width:36px;height:4px;background:var(--line2);border-radius:2px;margin:12px auto 0;flex-shrink:0;}
        .modal-header{display:flex;align-items:center;justify-content:space-between;padding:13px 20px 11px;border-bottom:1px solid var(--line);flex-shrink:0;}
        .modal-title{font-family:'Bebas Neue',sans-serif;font-size:1.25rem;letter-spacing:3px;color:var(--white);}
        .modal-title span{color:var(--green);}
        .modal-close{width:26px;height:26px;border-radius:50%;background:transparent;border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--grey);transition:all 0.18s;font-size:12px;}
        .modal-close:hover{border-color:#ff4444;color:#ff4444;}
        .modal-body{padding:16px 20px 28px;overflow-y:auto;}
        .modal-date{font-size:0.5rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--grey);margin-bottom:14px;display:flex;align-items:center;gap:6px;}
        .modal-date::after{content:'';flex:1;height:1px;background:var(--line);}
        .modal-section{margin-bottom:14px;}
        .modal-section-title{font-size:0.56rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--green);margin-bottom:8px;display:flex;align-items:center;gap:8px;}
        .modal-section-title::before{content:'';width:3px;height:3px;border-radius:50%;background:var(--green);}
        .modal-item{background:var(--surface2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin-bottom:6px;}
        .modal-item-num{font-family:'JetBrains Mono',monospace;font-size:0.5rem;color:var(--grey);margin-bottom:3px;}
        .modal-item-label{font-size:0.68rem;font-weight:700;color:var(--white);margin-bottom:3px;}
        .modal-item-text{font-size:0.65rem;color:rgba(244,244,244,0.48);line-height:1.7;font-weight:500;}
      `}</style>

      <nav>
        <span className="logo">RANS<span>BLOX</span></span>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/scripts">Scripts</a></li>
          <li><a href="/executor">Executor</a></li>
          <li><a href="/legal" className="active">Legal</a></li>
        </ul>
      </nav>

      <div className="wrap">
        <div className="legal-label">RANSBLOX</div>
        <h1 className="legal-title">TERMS &<br /><em>PRIVACY</em></h1>
        <div className="legal-cards">
          <div className="legal-card" onClick={() => setModal('terms')}>
            <div className="legal-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div className="legal-card-title">Terms</div>
            <div className="legal-card-sub">of Service</div>
          </div>
          <div className="legal-card" onClick={() => setModal('privacy')}>
            <div className="legal-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="legal-card-title">Privacy</div>
            <div className="legal-card-sub">Policy</div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) setModal(null); }}>
          <div className="modal-box">
            <div className="modal-handle" />
            <div className="modal-header">
              <div className="modal-title">
                {modal === 'terms' ? <>TERMS <span>OF SERVICE</span></> : <>PRIVACY <span>POLICY</span></>}
              </div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-date">Last updated: April 2026</div>
              {modal === 'terms' ? (
                <>
                  <div className="modal-section">
                    <div className="modal-section-title">General</div>
                    <div className="modal-item"><div className="modal-item-num">01</div><div className="modal-item-label">Content Purpose</div><div className="modal-item-text">RANSBLOX is a script showcase channel. All scripts featured may belong to their respective creators.</div></div>
                    <div className="modal-item"><div className="modal-item-num">02</div><div className="modal-item-label">No Warranty</div><div className="modal-item-text">All content is provided "as is." RANSBLOX is not responsible for any bans, data loss, or issues.</div></div>
                    <div className="modal-item"><div className="modal-item-num">03</div><div className="modal-item-label">Roblox Rules</div><div className="modal-item-text">Using scripts may violate Roblox's Terms of Service. RANSBLOX is not liable for any consequences.</div></div>
                    <div className="modal-item"><div className="modal-item-num">04</div><div className="modal-item-label">Brand Usage</div><div className="modal-item-text">You may not use the RANSBLOX name or brand without prior permission.</div></div>
                  </div>
                  <div className="modal-section">
                    <div className="modal-section-title">Executor</div>
                    <div className="modal-item"><div className="modal-item-num">05</div><div className="modal-item-label">Official Sources Only</div><div className="modal-item-text">All executor download links on RANSBLOX redirect to their respective official sources. We do not host, modify, or distribute any executor files directly.</div></div>
                    <div className="modal-item"><div className="modal-item-num">06</div><div className="modal-item-label">No Liability</div><div className="modal-item-text">RANSBLOX is not responsible for any issues arising from third-party executor software, including but not limited to malware, viruses, account bans, or data loss.</div></div>
                    <div className="modal-item"><div className="modal-item-num">07</div><div className="modal-item-label">No Affiliation</div><div className="modal-item-text">RANSBLOX is not affiliated with, endorsed by, or responsible for any executor developers or their platforms. Use at your own risk on alt accounts only.</div></div>
                  </div>
                </>
              ) : (
                <div className="modal-section">
                  <div className="modal-section-title">Data & Privacy</div>
                  <div className="modal-item"><div className="modal-item-num">01</div><div className="modal-item-label">YouTube</div><div className="modal-item-text">Our YouTube channel follows YouTube's own privacy policy regarding comments, views, and interactions.</div></div>
                  <div className="modal-item"><div className="modal-item-num">02</div><div className="modal-item-label">Scripts</div><div className="modal-item-text">RANSBLOX does not distribute scripts that collect user data or personal information.</div></div>
                  <div className="modal-item"><div className="modal-item-num">03</div><div className="modal-item-label">Third-party Links</div><div className="modal-item-text">RANSBLOX uses Linkvertise as a link monetization service. Linkvertise has its own privacy policy and may collect data.</div></div>
                  <div className="modal-item"><div className="modal-item-num">04</div><div className="modal-item-label">Executor Links</div><div className="modal-item-text">Executor download links redirect to official third-party sources. RANSBLOX does not control, monitor, or take responsibility for the content, privacy practices, or safety of those external platforms.</div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
