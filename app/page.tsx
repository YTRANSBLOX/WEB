'use client';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [showSocial, setShowSocial] = useState(false);

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
        html,body{width:100%;height:100%;background:#050505;color:var(--white);font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;height:56px;display:flex;align-items:center;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(5,5,5,0.92);backdrop-filter:blur(20px);}
        .logo{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:4px;color:var(--white);cursor:pointer;user-select:none;}
        .logo span{color:var(--green);}
        .nav-links{display:flex;gap:16px;list-style:none;margin-left:auto;}
        .nav-links a{font-family:'Syne',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--grey);text-decoration:none;cursor:pointer;transition:color 0.2s;position:relative;}
        .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--green);transition:width 0.3s;}
        .nav-links a:hover{color:var(--white);}
        .nav-links a:hover::after{width:100%;}
        .nav-links a.active{color:var(--green);}
        .nav-links a.active::after{width:100%;}
        .home-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:80px 24px 40px;max-width:640px;margin:0 auto;width:100%;text-align:center;}
        .home-eyebrow{font-size:0.55rem;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--green);margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:12px;}
        .home-eyebrow::before,.home-eyebrow::after{content:'';width:28px;height:1px;background:rgba(0,255,135,0.3);}
        .home-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(60px,15vw,128px);line-height:0.82;letter-spacing:2px;}
        .home-title em{font-style:normal;color:transparent;-webkit-text-stroke:2px var(--green);display:block;}
        .home-sub{font-size:0.82rem;color:var(--grey);line-height:1.8;margin-top:16px;font-weight:500;}
        .home-cta{display:flex;gap:12px;justify-content:center;margin-top:28px;}
        .btn{padding:13px 28px;font-family:'Syne',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;transition:all 0.2s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);}
        .btn-primary{background:var(--green);color:#000;}
        .btn-primary:hover{background:var(--green2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,255,135,0.3);}
        .btn-outline{background:transparent;color:var(--white);border:1px solid #333;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);}
        .btn-outline:hover{border-color:var(--green);color:var(--green);transform:translateY(-2px);}
        .home-social{display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap;}
        .social-pill{display:flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid var(--line);border-radius:50px;background:var(--surface);text-decoration:none;transition:all 0.22s;cursor:pointer;}
        .social-pill:hover{transform:translateY(-2px);}
        .social-pill.yt{color:#ff3b3b;border-color:rgba(255,59,59,0.2);}
        .social-pill.yt:hover{border-color:#ff3b3b;background:rgba(255,59,59,0.06);}
        .social-pill.tt{color:rgba(255,255,255,0.7);}
        .social-pill.tt:hover{border-color:var(--white);background:rgba(255,255,255,0.04);}
        .social-pill.mail{color:var(--green);border-color:rgba(0,255,135,0.2);}
        .social-pill.mail:hover{border-color:var(--green);background:rgba(0,255,135,0.05);}
        .social-pill-label{font-size:0.58rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
        .home-notice{width:100%;max-width:480px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;margin-bottom:20px;}
        .notice-title{font-size:0.52rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.35);text-align:center;margin-bottom:12px;}
        .notice-item{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
        .notice-item:last-child{border-bottom:none;padding-bottom:0;}
        .notice-flag{font-size:1rem;flex-shrink:0;line-height:1.4;}
        .notice-text{font-size:0.62rem;color:rgba(244,244,244,0.55);line-height:1.7;font-weight:500;}
        .notice-text em{font-style:italic;color:rgba(244,244,244,0.8);}
        .deco-line{display:flex;align-items:center;gap:12px;font-size:0.52rem;letter-spacing:3px;text-transform:uppercase;color:var(--grey);white-space:nowrap;margin-top:32px;}
        .deco-line::before,.deco-line::after{content:'';width:32px;height:1px;background:#2a2a2a;}
        .blob{position:fixed;border-radius:50%;filter:blur(100px);opacity:0.045;animation:drift 10s ease-in-out infinite alternate;pointer-events:none;z-index:0;}
        .blob-1{width:520px;height:520px;background:#6d28d9;top:-120px;left:-120px;}
        .blob-2{width:380px;height:380px;background:#0d9488;bottom:-100px;right:-80px;animation-delay:-4s;}
        .blob-3{width:300px;height:300px;background:#064e3b;top:40%;left:50%;transform:translate(-50%,-50%);animation-delay:-7s;}
        @keyframes drift{from{transform:translate(0,0) scale(1);}to{transform:translate(40px,30px) scale(1.1);}}
      `}</style>

      {/* Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Nav */}
      <nav>
        <span className="logo">RANS<span>BLOX</span></span>
        <ul className="nav-links">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/executor">Executor</a></li>
          <li><a href="/stats">Stats</a></li>
          <li><a href="/legal">Legal</a></li>
        </ul>
      </nav>

      {/* Home */}
      <div className="home-wrap" style={{position:'relative',zIndex:1}}>
        <div className="home-notice">
          <div className="notice-title">Notice</div>
          <div className="notice-item">
            <span className="notice-flag">🇺🇸</span>
            <span className="notice-text">This site uses ads to keep all scripts free and support future development. Redirects are normal — we will <em>never</em> ask you to download anything, with the exception of the executor, which is entirely optional.</span>
          </div>
          <div className="notice-item">
            <span className="notice-flag">🇧🇷</span>
            <span className="notice-text">Este site usa anúncios para manter todos os scripts gratuitos e apoiar o desenvolvimento futuro. Redirecionamentos são normais — nunca solicitaremos que você baixe nada, com exceção do executor, que é totalmente opcional.</span>
          </div>
          <div className="notice-item">
            <span className="notice-flag">🇮🇩</span>
            <span className="notice-text">Situs ini menggunakan iklan agar semua script tetap gratis dan mendukung pengembangan ke depannya. Redirect itu normal — kami tidak akan pernah meminta Anda mengunduh apapun, kecuali executor yang sepenuhnya opsional.</span>
          </div>
        </div>

        <div className="home-cta">
          <button className="btn btn-primary" onClick={() => window.location.href='/scripts'}>Explore Scripts</button>
          <button className="btn btn-outline" onClick={() => setShowSocial(!showSocial)}>Our Socials</button>
        </div>

        {showSocial && (
          <div className="home-social">
            <a href="https://youtube.com/@YTRANSBLOX" target="_blank" className="social-pill yt">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#050505" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              <span className="social-pill-label">YouTube</span>
            </a>
            <a href="https://tiktok.com/@ransblox" target="_blank" className="social-pill tt">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              <span className="social-pill-label">TikTok</span>
            </a>
            <a onClick={() => window.open('mailto:giranmaulana404@gmail.com')} className="social-pill mail" style={{cursor:'pointer'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span className="social-pill-label">Email</span>
            </a>
          </div>
        )}

        <div className="deco-line">© 2026 RANSBLOX — ALL RIGHTS RESERVED</div>
      </div>
    </>
  );
}


