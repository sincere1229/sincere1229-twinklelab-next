"use client";
import { useEffect, useState } from "react";
import type { RoomData } from "@/lib/roomData";

export default function RoomPage({ data }: { data: RoomData }) {
  const [todayMsg, setTodayMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / 86400000) % data.messages.length;
    setTodayMsg(data.messages[dayIndex]);
  }, [data.messages]);

  const tc = data.themeColor;
  const tcd = data.themeColorDark;
  const tcl = data.themeColorLight;
  const ac = data.accentColor;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        :root{
          --tc:${tc};
          --tcd:${tcd};
          --tcl:${tcl};
          --ac:${ac};
          --text-on:${data.textOnTheme};
        }
        html{scroll-behavior:smooth;}
        body{font-family:'Noto Sans JP',sans-serif;color:#2a2a2a;background:#faf9f7;overflow-x:hidden;}

        /* ── Nav ── */
        .room-nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 24px;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(12px);
          border-bottom:1px solid rgba(0,0,0,0.06);
        }
        .nav-back{
          font-size:12px;color:var(--tc);text-decoration:none;
          display:flex;align-items:center;gap:6px;letter-spacing:0.08em;
          transition:opacity 0.2s;
        }
        .nav-back:hover{opacity:0.7;}
        .nav-logo{
          font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.15em;
          color:#333;font-weight:700;
        }
        .nav-logo span{color:var(--tc);}
        .nav-room-name{font-size:11px;color:#888;letter-spacing:0.1em;}

        /* ── Hero ── */
        .hero{
          position:relative;
          height:100vh;min-height:600px;max-height:900px;
          display:flex;align-items:center;
          overflow:hidden;
        }
        .hero-bg{
          position:absolute;inset:0;
          background-image:url('${data.bgImage}');
          background-size:cover;
          background-position:${data.bgPosition ?? "center top"};
          transition:transform 0.5s;
        }
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(
            90deg,
            rgba(0,0,0,0.65) 0%,
            rgba(0,0,0,0.42) 50%,
            rgba(0,0,0,0.08) 100%
          );
        }
        .hero-content{
          position:relative;z-index:2;
          padding:80px 48px 40px;
          max-width:560px;
        }
        @media(max-width:640px){
          .hero{
            height:92vh;
            min-height:640px;
            max-height:none;
            align-items:flex-end;
          }
          .hero-bg{
            background-size:cover;
            background-position:${data.bgPositionSp ?? "60% center"};
          }
          .hero-overlay{
            background:linear-gradient(
              0deg,
              rgba(0,0,0,0.78) 0%,
              rgba(0,0,0,0.50) 40%,
              rgba(0,0,0,0.10) 100%
            );
          }
          .hero-content{
            padding:0 22px 56px;
            max-width:100%;
            width:100%;
          }
          .hero-name-en{
            font-size:clamp(32px,10vw,48px);
          }
          .hero-catchcopy{
            font-size:clamp(16px,5vw,22px);
          }
          .hero-quote{
            font-size:12px;
          }
          .hero-cta{
            flex-direction:column;
          }
          .btn-primary,.btn-outline{
            text-align:center;
          }
          section{padding:60px 20px;}
        }
        .hero-badge{
          display:inline-block;
          border:1px solid rgba(255,255,255,0.4);
          color:rgba(255,255,255,0.85);
          font-size:9px;letter-spacing:0.4em;
          padding:4px 16px;border-radius:20px;
          margin-bottom:20px;
          background:rgba(255,255,255,0.1);
        }
        .hero-name-en{
          font-family:'Cinzel',serif;
          font-size:clamp(36px,6vw,64px);
          font-weight:700;color:#fff;
          letter-spacing:0.06em;line-height:1.1;
          margin-bottom:4px;
        }
        .hero-room{
          font-size:clamp(13px,1.8vw,18px);
          color:rgba(255,255,255,0.7);
          letter-spacing:0.25em;margin-bottom:28px;
        }
        .hero-divider{
          width:60px;height:2px;margin-bottom:24px;
          background:linear-gradient(90deg,var(--tc),var(--ac));
          border-radius:2px;
        }
        .hero-catchcopy{
          font-size:clamp(18px,3vw,28px);
          color:#fff;font-weight:500;
          line-height:1.6;letter-spacing:0.05em;
          margin-bottom:16px;
        }
        .hero-quote{
          font-size:13px;color:rgba(255,255,255,0.65);
          letter-spacing:0.08em;line-height:1.8;
          margin-bottom:36px;
          font-style:italic;
        }
        .hero-cta{
          display:flex;gap:12px;flex-wrap:wrap;
        }
        .btn-primary{
          display:inline-block;padding:13px 28px;
          background:linear-gradient(135deg,var(--tc),var(--tcd));
          color:#fff;border-radius:10px;
          font-size:13px;font-weight:500;letter-spacing:0.08em;
          text-decoration:none;transition:all 0.3s;
          box-shadow:0 4px 16px rgba(0,0,0,0.25);
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.3);}
        .btn-outline{
          display:inline-block;padding:12px 24px;
          border:1px solid rgba(255,255,255,0.5);
          color:rgba(255,255,255,0.9);border-radius:10px;
          font-size:13px;letter-spacing:0.08em;
          text-decoration:none;transition:all 0.3s;
          backdrop-filter:blur(4px);
          background:rgba(255,255,255,0.1);
        }
        .btn-outline:hover{background:rgba(255,255,255,0.2);}
        .hero-scroll{
          position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;
        }
        .hero-scroll span{font-size:9px;color:rgba(255,255,255,0.5);letter-spacing:0.3em;}
        .scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,rgba(255,255,255,0.5),transparent);}
        @media(max-width:640px){
          .hero-scroll{display:none;}
        }

        /* ── Section common ── */
        section{padding:80px 24px;}
        .sec-inner{max-width:900px;margin:0 auto;}
        .sec-label{
          text-align:center;margin-bottom:48px;
        }
        .sec-en{
          font-family:'Cinzel',serif;font-size:10px;
          letter-spacing:0.4em;color:var(--tc);margin-bottom:10px;
        }
        .sec-jp{font-size:22px;font-weight:500;color:#222;letter-spacing:0.06em;}
        .sec-divider{
          width:48px;height:2px;margin:16px auto 0;
          background:linear-gradient(90deg,var(--tc),var(--ac));border-radius:2px;
        }

        /* ── About ── */
        .about-section{background:#fff;}
        .about-grid{
          display:grid;grid-template-columns:1fr 1fr;gap:40px;
          align-items:start;
        }
        @media(max-width:640px){.about-grid{grid-template-columns:1fr;}}
        .about-intro{
          font-size:15px;line-height:2;color:#444;
          letter-spacing:0.04em;
        }
        .about-meta{display:flex;flex-direction:column;gap:16px;}
        .meta-row{display:flex;gap:12px;align-items:flex-start;}
        .meta-label{
          font-size:10px;letter-spacing:0.2em;color:var(--tc);
          min-width:80px;padding-top:2px;font-weight:500;
        }
        .meta-val{font-size:14px;color:#333;line-height:1.8;}
        .likes-list{
          display:flex;flex-wrap:wrap;gap:6px;
        }
        .like-tag{
          font-size:11px;padding:4px 12px;border-radius:20px;
          background:var(--tcl);color:var(--tcd);
          border:1px solid var(--tc);
        }
        .fav-word{
          font-size:16px;color:var(--tcd);font-weight:500;
          font-style:italic;letter-spacing:0.08em;
          padding:16px 20px;
          border-left:3px solid var(--tc);
          background:var(--tcl);border-radius:0 8px 8px 0;
          margin-top:8px;
        }

        /* ── Menu ── */
        .menu-section{background:var(--tcl);}
        .menu-grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:16px;
        }
        @media(min-width:640px){
          .menu-grid{grid-template-columns:repeat(2,1fr);gap:20px;}
        }
        @media(min-width:900px){
          .menu-grid{grid-template-columns:repeat(4,1fr);gap:20px;}
        }
        .menu-card{
          background:#fff;border-radius:16px;padding:28px 20px;
          text-decoration:none;color:inherit;
          border:1px solid rgba(0,0,0,0.06);
          transition:all 0.3s;
          display:block;
        }
        .menu-card:hover{
          transform:translateY(-4px);
          box-shadow:0 12px 32px rgba(0,0,0,0.10);
          border-color:var(--tc);
        }
        .menu-icon{font-size:32px;margin-bottom:14px;display:block;}
        .menu-title{
          font-size:15px;font-weight:500;color:#222;
          margin-bottom:8px;letter-spacing:0.04em;
        }
        .menu-desc{font-size:12px;color:#777;line-height:1.7;}
        .menu-arrow{
          display:inline-block;margin-top:12px;
          font-size:11px;color:var(--tc);letter-spacing:0.1em;
        }

        /* ── Today's message ── */
        .msg-section{
          background:linear-gradient(135deg,var(--tcd) 0%,var(--tc) 100%);
          text-align:center;padding:80px 24px;
        }
        .msg-en{
          font-family:'Cinzel',serif;font-size:10px;
          letter-spacing:0.4em;color:rgba(255,255,255,0.6);
          margin-bottom:24px;
        }
        .msg-box{
          max-width:640px;margin:0 auto;
          background:rgba(255,255,255,0.12);
          border:1px solid rgba(255,255,255,0.25);
          border-radius:20px;padding:48px 40px;
          backdrop-filter:blur(8px);
        }
        .msg-char-name{
          font-size:12px;color:rgba(255,255,255,0.7);
          letter-spacing:0.2em;margin-bottom:24px;
        }
        .msg-text{
          font-size:clamp(18px,3vw,24px);
          color:#fff;font-weight:300;
          line-height:1.9;letter-spacing:0.06em;
        }
        .msg-date{
          font-size:10px;color:rgba(255,255,255,0.45);
          margin-top:24px;letter-spacing:0.2em;
        }

        /* ── Related ── */
        .related-section{background:#fff;}
        .related-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
          gap:16px;
        }
        .related-card{
          border:1px solid rgba(0,0,0,0.08);
          border-radius:14px;padding:24px 18px;
          text-decoration:none;color:inherit;
          transition:all 0.25s;display:block;
          background:#faf9f7;
        }
        .related-card:hover{
          border-color:var(--tc);background:#fff;
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(0,0,0,0.08);
        }
        .related-icon{font-size:28px;margin-bottom:10px;display:block;}
        .related-label{
          font-size:10px;color:var(--tc);letter-spacing:0.2em;margin-bottom:4px;
          display:flex;align-items:center;gap:6px;
        }
        .related-title{font-size:14px;color:#333;font-weight:500;}
        .related-card-cs{opacity:0.72;background:#f8f8f8;}
        .related-card-cs:hover{opacity:1;border-color:var(--tc);background:#fff;}

        /* ── Coming Soon badge ── */
        .cs-badge{
          display:inline-block;
          font-size:9px;padding:2px 7px;
          background:linear-gradient(135deg,var(--tc),var(--tcd));
          color:#fff;border-radius:8px;
          letter-spacing:0.05em;font-weight:600;
          vertical-align:middle;white-space:nowrap;
        }
        .menu-card-cs{opacity:0.76;background:#f8f8f8;}
        .menu-card-cs:hover{opacity:1;border-color:var(--tc);background:#fff;}
        .menu-card-cs .menu-arrow{color:var(--tc);opacity:0.7;}

        /* ── Universe ── */
        .universe-section{background:var(--tcl);}
        .universe-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
          gap:14px;
        }
        .universe-card{
          background:#fff;border-radius:14px;padding:20px 14px;
          text-align:center;text-decoration:none;color:inherit;
          border:1px solid rgba(0,0,0,0.06);
          transition:all 0.25s;
        }
        .universe-card:hover{
          transform:translateY(-3px);
          box-shadow:0 8px 24px rgba(0,0,0,0.1);
        }
        .universe-emoji{font-size:28px;margin-bottom:8px;display:block;}
        .universe-name{font-size:14px;font-weight:500;color:#222;margin-bottom:4px;}
        .universe-title{font-size:10px;color:#888;line-height:1.5;}
        .universe-enter{
          display:inline-block;margin-top:8px;
          font-size:10px;letter-spacing:0.1em;color:var(--tc);
        }

        /* ── Footer ── */
        .room-footer{
          text-align:center;padding:40px 24px;
          border-top:1px solid rgba(0,0,0,0.06);
          background:#fff;
        }
        .footer-links{
          display:flex;justify-content:center;
          gap:20px;flex-wrap:wrap;margin-bottom:16px;
        }
        .footer-links a{
          font-size:11px;color:#888;text-decoration:none;
          transition:color 0.2s;
        }
        .footer-links a:hover{color:var(--tc);}
        .copyright{font-size:11px;color:#bbb;letter-spacing:0.15em;}

      `}</style>

      {/* Nav */}
      <nav className="room-nav">
        <a href="/" className="nav-back">← Twinkle Lab</a>
        <div className="nav-logo">Twinkle <span>Lab</span></div>
        <div className="nav-room-name">{data.roomNameJp}</div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">✦ {data.roomName} ✦</div>
          <h1 className="hero-name-en">{data.nameEn}</h1>
          <p className="hero-room">— {data.roomNameJp} —</p>
          <div className="hero-divider" />
          <p className="hero-catchcopy">{data.catchcopy}</p>
          <p className="hero-quote">「{data.quote}」</p>
          <div className="hero-cta">
            <a href={data.menuItems[0]?.href || "#menu"} className="btn-primary">
              {data.menuItems[0]?.title || "サービスを見る"} →
            </a>
            <a href="#about" className="btn-outline">{data.name}について</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">ABOUT {data.nameEn.toUpperCase()}</p>
            <h2 className="sec-jp">{data.name}について</h2>
            <div className="sec-divider" />
          </div>
          <div className="about-grid">
            <p className="about-intro">{data.about.intro}</p>
            <div className="about-meta">
              <div className="meta-row">
                <span className="meta-label">性　格</span>
                <span className="meta-val">{data.about.personality}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">好きなもの</span>
                <div className="likes-list">
                  {data.about.likes.map((l) => (
                    <span key={l} className="like-tag">{l}</span>
                  ))}
                </div>
              </div>
              <div className="meta-row">
                <span className="meta-label">好きな場所</span>
                <span className="meta-val">{data.about.favoritePlace}</span>
              </div>
              <div>
                <p className="fav-word">「{data.about.favoriteWord}」</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="menu-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">MENU</p>
            <h2 className="sec-jp">担当サービス</h2>
            <div className="sec-divider" />
          </div>
          <div className="menu-grid">
            {data.menuItems.map((item) => {
              const isCS = item.href === "/coming-soon";
              return (
                <a key={item.title} href={item.href} className={`menu-card${isCS ? " menu-card-cs" : ""}`}>
                  <span className="menu-icon">{item.icon}</span>
                  <div className="menu-title">
                    {item.title}
                    {isCS && <span className="cs-badge">近日公開</span>}
                  </div>
                  <p className="menu-desc">{item.desc}</p>
                  <span className="menu-arrow">{isCS ? "近日公開 ✦" : "詳しく見る →"}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Today's Message */}
      <div className="msg-section">
        <p className="msg-en">TODAY'S MESSAGE FROM {data.nameEn.toUpperCase()}</p>
        <div className="msg-box">
          <p className="msg-char-name">✦ {data.name} より ✦</p>
          <p className="msg-text">{todayMsg}</p>
          <p className="msg-date">
            {new Date().toLocaleDateString("ja-JP", {
              year: "numeric", month: "long", day: "numeric",
            })} のメッセージ
          </p>
        </div>
      </div>

      {/* Related */}
      <section className="related-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">RELATED CONTENTS</p>
            <h2 className="sec-jp">関連コンテンツ</h2>
            <div className="sec-divider" />
          </div>
          <div className="related-grid">
            {data.relatedLinks.youtube && (
              <a href={data.relatedLinks.youtube} className="related-card" target="_blank" rel="noopener noreferrer">
                <span className="related-icon">▶️</span>
                <div className="related-label">YOUTUBE</div>
                <div className="related-title">{data.name}の動画チャンネル</div>
              </a>
            )}
            {data.relatedLinks.note && (
              (() => {
                const isCS = data.relatedLinks.note === "/coming-soon";
                return (
                  <a href={data.relatedLinks.note} className={`related-card${isCS ? " related-card-cs" : ""}`} target={isCS ? undefined : "_blank"} rel={isCS ? undefined : "noopener noreferrer"}>
                    <span className="related-icon">📝</span>
                    <div className="related-label">NOTE{isCS && <span className="cs-badge">近日公開</span>}</div>
                    <div className="related-title">{data.name}のnote記事</div>
                  </a>
                );
              })()
            )}
            {data.relatedLinks.kindle && (
              (() => {
                const isCS = data.relatedLinks.kindle === "/coming-soon";
                return (
                  <a href={data.relatedLinks.kindle} className={`related-card${isCS ? " related-card-cs" : ""}`} target={isCS ? undefined : "_blank"} rel={isCS ? undefined : "noopener noreferrer"}>
                    <span className="related-icon">📚</span>
                    <div className="related-label">KINDLE{isCS && <span className="cs-badge">近日公開</span>}</div>
                    <div className="related-title">Kindle本を見る</div>
                  </a>
                );
              })()
            )}
            {data.relatedLinks.articles?.map((art) => {
              const isCS = art.href === "/coming-soon";
              return (
                <a key={art.title} href={art.href} className={`related-card${isCS ? " related-card-cs" : ""}`}>
                  <span className="related-icon">📄</span>
                  <div className="related-label">ARTICLE{isCS && <span className="cs-badge">近日公開</span>}</div>
                  <div className="related-title">{art.title}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Twinkle Universe */}
      <section className="universe-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">TWINKLE UNIVERSE</p>
            <h2 className="sec-jp">他のキャラクターへ</h2>
            <div className="sec-divider" />
          </div>
          <div className="universe-grid">
            {data.otherCharacters.map((c) => (
              <a key={c.id} href={c.href} className="universe-card"
                style={{ borderTopColor: c.color, borderTopWidth: 3, borderTopStyle: "solid" }}>
                <span className="universe-emoji">{c.emoji}</span>
                <div className="universe-name">{c.name}</div>
                <p className="universe-title">{c.title}</p>
                <span className="universe-enter">部屋へ →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="room-footer">
        <div className="footer-links">
          <a href="/">トップへ戻る</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/tokusho">特定商取引法に基づく表記</a>
          <a href="/tos">利用規約</a>
          <a href="/contact">お問い合わせ</a>
        </div>
        <p className="copyright">© 2026 Twinkle Lab. All rights reserved.</p>
      </footer>
    </>
  );
}
