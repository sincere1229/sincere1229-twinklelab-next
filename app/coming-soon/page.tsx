import Link from "next/link";

export const metadata = {
  title: "近日公開 | Twinkle Lab",
  description: "現在準備中です。公開までしばらくお待ちください。",
};

export default function ComingSoonPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Noto+Sans+JP:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{
          font-family:'Noto Sans JP',sans-serif;
          background:#090d1a;
          color:#e8eaf0;
          min-height:100vh;
          overflow-x:hidden;
        }
        .stars{
          position:fixed;inset:0;pointer-events:none;z-index:0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%,rgba(30,45,90,0.9) 0%,transparent 70%);
        }
        .stars::before{
          content:'';position:absolute;inset:0;
          background-image:
            radial-gradient(1px 1px at 12% 18%,rgba(255,255,255,0.8) 0%,transparent 100%),
            radial-gradient(1px 1px at 33% 9%,rgba(255,255,255,0.6) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 54% 14%,rgba(255,255,255,0.9) 0%,transparent 100%),
            radial-gradient(1px 1px at 74% 6%,rgba(255,255,255,0.7) 0%,transparent 100%),
            radial-gradient(1px 1px at 88% 22%,rgba(255,255,255,0.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 8%  44%,rgba(255,255,255,0.4) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 24% 58%,rgba(255,255,255,0.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 62% 72%,rgba(255,255,255,0.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 82% 52%,rgba(255,255,255,0.7) 0%,transparent 100%),
            radial-gradient(2px 2px at 68% 32%,rgba(201,168,76,0.6) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 18% 38%,rgba(201,168,76,0.4) 0%,transparent 100%);
        }
        .page{
          position:relative;z-index:1;
          min-height:100vh;
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          padding:40px 24px;
          text-align:center;
        }
        .badge{
          display:inline-block;
          border:1px solid rgba(201,168,76,0.4);
          color:#c9a84c;
          font-family:'Cinzel',serif;
          font-size:9px;letter-spacing:0.4em;
          padding:5px 18px;border-radius:20px;
          margin-bottom:32px;
          background:rgba(201,168,76,0.06);
        }
        .icon{
          font-size:72px;margin-bottom:28px;
          display:block;
          filter:drop-shadow(0 0 20px rgba(201,168,76,0.4));
        }
        .title{
          font-family:'Cinzel',serif;
          font-size:clamp(24px,5vw,42px);
          font-weight:700;
          letter-spacing:0.08em;
          background:linear-gradient(135deg,#e8c97a,#c9a84c,#f5e0a0);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          margin-bottom:8px;
        }
        .title-jp{
          font-size:clamp(18px,3vw,26px);
          color:#e8eaf0;font-weight:500;
          letter-spacing:0.08em;margin-bottom:24px;
        }
        .divider{
          display:flex;align-items:center;justify-content:center;
          gap:14px;margin:0 auto 32px;max-width:280px;
        }
        .divider-line{
          flex:1;height:1px;
          background:linear-gradient(90deg,transparent,#c9a84c);
        }
        .divider-line:last-child{
          background:linear-gradient(90deg,#c9a84c,transparent);
        }
        .divider-star{color:#c9a84c;font-size:14px;}
        .desc{
          font-size:clamp(14px,2vw,16px);
          color:#8892aa;line-height:2;
          max-width:480px;margin:0 auto 48px;
          letter-spacing:0.04em;
        }
        .desc strong{color:#b8c4d8;}
        .btns{
          display:flex;flex-wrap:wrap;
          gap:14px;justify-content:center;
        }
        .btn-gold{
          display:inline-block;
          padding:14px 32px;
          background:linear-gradient(135deg,#c9a84c,#a07830);
          color:#090d1a;
          border-radius:10px;
          font-size:13px;font-weight:700;
          letter-spacing:0.1em;
          text-decoration:none;
          transition:all 0.3s;
          box-shadow:0 4px 16px rgba(201,168,76,0.3);
        }
        .btn-gold:hover{
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(201,168,76,0.4);
        }
        .btn-outline{
          display:inline-block;
          padding:13px 28px;
          border:1px solid rgba(184,196,216,0.3);
          color:#b8c4d8;
          border-radius:10px;
          font-size:13px;
          letter-spacing:0.08em;
          text-decoration:none;
          transition:all 0.3s;
          background:rgba(255,255,255,0.04);
        }
        .btn-outline:hover{
          border-color:rgba(201,168,76,0.5);
          color:#c9a84c;
          background:rgba(201,168,76,0.06);
        }
        .footer-note{
          margin-top:56px;
          font-family:'Cinzel',serif;
          font-size:10px;color:rgba(136,146,170,0.35);
          letter-spacing:0.25em;
        }
      `}</style>

      <div className="stars" />

      <div className="page">
        <div className="badge">✦ TWINKLE LAB ✦</div>
        <span className="icon">🌟</span>
        <p className="title">Coming Soon</p>
        <p className="title-jp">現在準備中です</p>

        <div className="divider">
          <span className="divider-line" />
          <span className="divider-star">✦</span>
          <span className="divider-line" />
        </div>

        <p className="desc">
          Twinkle Labでは<strong>新しいコンテンツを制作中</strong>です。<br />
          公開までしばらくお待ちください。<br />
          準備ができ次第、このページが更新されます。
        </p>

        <div className="btns">
          <Link href="/" className="btn-gold">
            ✦ トップへ戻る
          </Link>
          <Link href="javascript:history.back()" className="btn-outline">
            ← キャラクタールームへ戻る
          </Link>
        </div>

        <p className="footer-note">© 2026 Twinkle Lab. All rights reserved.</p>
      </div>
    </>
  );
}
