export default function Home() {
  const characters = [
    {
      id: "serena",
      name: "Serena",
      nameJp: "セレナ",
      title: "心を整えるヒーリングガイド",
      quote: "大丈夫。少しずつ進んでいきましょう。",
      tags: ["ヒーリング", "感情整理", "パワーストーン"],
      color: "#c06090",
      colorLight: "rgba(220,130,170,0.12)",
      colorBorder: "rgba(200,100,150,0.35)",
      img: "/serena.png",
      href: "/serena",
    },
    {
      id: "lumina",
      name: "Lumina",
      nameJp: "ルミナ",
      title: "未来を照らす星とタロットの案内人",
      quote: "未来はまだ白紙の物語です。",
      tags: ["タロット", "才能診断", "使命診断"],
      color: "#c9a84c",
      colorLight: "rgba(201,168,76,0.1)",
      colorBorder: "rgba(201,168,76,0.4)",
      img: "/lumina.png",
      href: "/lumina",
    },
    {
      id: "chrono",
      name: "Chrono",
      nameJp: "クロノ",
      title: "キャリアと未来設計のパートナー",
      quote: "未来は行動によって変えられます。",
      tags: ["転職・副業", "キャリア設計", "AI活用"],
      color: "#4a8fd4",
      colorLight: "rgba(74,143,212,0.1)",
      colorBorder: "rgba(74,143,212,0.4)",
      img: "/chrono.png",
      href: "/chrono",
    },
    {
      id: "mana",
      name: "まな先生",
      nameJp: "Mana",
      title: "学びを支える先生",
      quote: "わからないを、できた！に変えよう。",
      tags: ["学習ナビ", "九九・計算", "日本語学習"],
      color: "#3aaecc",
      colorLight: "rgba(58,174,204,0.1)",
      colorBorder: "rgba(58,174,204,0.4)",
      img: "/mana.png",
      href: "/mana",
    },
    {
      id: "minori",
      name: "みのり",
      nameJp: "Minori",
      title: "暮らしと実家相談のナビゲーター",
      quote: "ひとつずつ整理していきましょう。",
      tags: ["実家問題", "引越し", "相続"],
      color: "#5aaa72",
      colorLight: "rgba(90,170,114,0.1)",
      colorBorder: "rgba(90,170,114,0.4)",
      img: "/minori.png",
      href: "/minori",
    },
    {
      id: "akari",
      name: "あかり",
      nameJp: "Akari",
      title: "介護をやさしく案内するサポーター",
      quote: "ひとりで抱え込まなくて大丈夫です。",
      tags: ["介護保険", "施設探し", "在宅介護"],
      color: "#e07aaa",
      colorLight: "rgba(224,122,170,0.1)",
      colorBorder: "rgba(224,122,170,0.4)",
      img: "/akari.png",
      href: "/akari",
    },
    {
      id: "shizuku",
      name: "しずく",
      nameJp: "Shizuku",
      title: "終活・葬儀をやさしく案内するサポーター",
      quote: "大切な想いを未来へつなぎましょう。",
      tags: ["終活", "葬儀・お墓", "エンディングノート"],
      color: "#9a7fcc",
      colorLight: "rgba(154,127,204,0.1)",
      colorBorder: "rgba(154,127,204,0.4)",
      img: "/shizuku.png",
      href: "/shizuku",
    },
    {
      id: "waka",
      name: "和花",
      nameJp: "Waka",
      title: "日本文化ナビゲーター",
      quote: "日本の素敵な文化をご案内します。",
      tags: ["百人一首", "神社・仏閣", "和文化"],
      color: "#d47a8a",
      colorLight: "rgba(212,122,138,0.1)",
      colorBorder: "rgba(212,122,138,0.4)",
      img: "/waka.png",
      href: "/waka",
    },
  ];

  const serviceLinks = [
    { href: "/star", icon: "🔮", label: "Twinkle Star Oracle" },
    { href: "/heart", icon: "🐣", label: "Twinkle Heart" },
    { href: "/kids", icon: "📚", label: "Twinkle Kids" },
    { href: "/sukinavi", icon: "🔍", label: "好きナビ" },
    { href: "/study", icon: "📖", label: "勉強ナビ" },
    { href: "/company", icon: "✨", label: "About" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;500&display=swap');

        :root {
          --navy:    #090d1a;
          --navy2:   #111829;
          --navy3:   #1a2540;
          --gold:    #c9a84c;
          --gold2:   #e8c97a;
          --gold3:   #f5e0a0;
          --white:   #ffffff;
          --silver:  #b8c4d8;
          --text:    #e8eaf0;
          --text-s:  #8892aa;
        }

        * { margin:0; padding:0; box-sizing:border-box; }

        body {
          background: var(--navy);
          color: var(--text);
          font-family: 'Noto Sans JP', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Stars background ── */
        .stars-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30,45,90,0.9) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(20,35,70,0.6) 0%, transparent 60%);
        }
        .stars-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 8%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 55% 15%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 5%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 45%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 25% 60%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 55%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 85%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 80%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(2px 2px at 70% 35%, rgba(201,168,76,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 20% 35%, rgba(201,168,76,0.4) 0%, transparent 100%);
        }

        /* ── Layout wrapper ── */
        .page-wrap {
          position: relative;
          z-index: 1;
        }

        /* ── Hero ── */
        .hero {
          text-align: center;
          padding: 90px 24px 70px;
          position: relative;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 300px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .lab-badge {
          display: inline-block;
          border: 1px solid rgba(201,168,76,0.4);
          color: var(--gold);
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          padding: 5px 18px;
          border-radius: 20px;
          margin-bottom: 28px;
          background: rgba(201,168,76,0.06);
        }

        .logo {
          font-family: 'Cinzel', serif;
          font-size: clamp(36px, 7vw, 72px);
          font-weight: 700;
          letter-spacing: 0.12em;
          background: linear-gradient(135deg, var(--gold2) 0%, var(--gold) 50%, var(--gold3) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
          line-height: 1.1;
        }

        .logo-sub {
          font-size: 11px;
          color: var(--silver);
          letter-spacing: 0.45em;
          margin-bottom: 32px;
        }

        .gold-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 0 auto 32px;
          max-width: 320px;
        }
        .gold-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .gold-divider-line:last-child {
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .gold-divider-star {
          color: var(--gold);
          font-size: 14px;
        }

        .tagline {
          font-size: clamp(14px, 2vw, 17px);
          color: var(--silver);
          line-height: 2.0;
          font-weight: 300;
          letter-spacing: 0.05em;
        }
        .tagline strong {
          color: var(--gold2);
          font-weight: 500;
        }

        /* ── Characters section ── */
        .section-label {
          text-align: center;
          padding: 64px 24px 40px;
        }
        .section-en {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: var(--gold);
          letter-spacing: 0.4em;
          margin-bottom: 10px;
        }
        .section-jp {
          font-size: 20px;
          font-weight: 500;
          color: var(--text);
          letter-spacing: 0.08em;
        }

        /* ── Character grid ── */
        .char-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px 80px;
        }
        @media (min-width: 640px) {
          .char-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 0 24px 80px; }
        }
        @media (min-width: 960px) {
          .char-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        }

        /* ── Character card ── */
        .char-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .char-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .char-card:hover {
          transform: translateY(-6px);
        }

        .char-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
        }
        .char-img-wrap img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.4s ease;
        }
        .char-card:hover .char-img-wrap img {
          transform: scale(1.05);
        }
        .char-img-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(to top, rgba(9,13,26,0.95) 0%, transparent 100%);
          z-index: 1;
        }

        .char-body {
          padding: 16px 16px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .char-name-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .char-name-en {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .char-name-jp {
          font-size: 10px;
          color: var(--text-s);
          letter-spacing: 0.2em;
        }

        .char-title {
          font-size: 11px;
          color: var(--silver);
          line-height: 1.6;
          letter-spacing: 0.03em;
        }

        .char-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .char-tag {
          font-size: 9.5px;
          padding: 3px 9px;
          border-radius: 10px;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .char-quote {
          font-size: 10.5px;
          color: var(--text-s);
          line-height: 1.6;
          font-style: italic;
          border-left: 2px solid;
          padding-left: 10px;
          margin-top: auto;
        }

        .char-btn {
          display: block;
          margin: 14px 16px 18px;
          text-align: center;
          padding: 10px;
          border-radius: 10px;
          font-size: 12px;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.12em;
          text-decoration: none;
          color: var(--navy);
          font-weight: 700;
          transition: opacity 0.2s, transform 0.2s;
        }
        .char-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* ── Service links ── */
        .service-section {
          border-top: 1px solid rgba(201,168,76,0.15);
          padding: 60px 24px 72px;
          max-width: 900px;
          margin: 0 auto;
        }

        .service-en {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          color: var(--text-s);
          letter-spacing: 0.4em;
          text-align: center;
          margin-bottom: 32px;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .service-grid { grid-template-columns: repeat(6, 1fr); }
        }

        .service-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 18px 8px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          text-decoration: none;
          color: var(--text-s);
          font-size: 10.5px;
          letter-spacing: 0.05em;
          background: rgba(255,255,255,0.02);
          transition: all 0.25s;
        }
        .service-link:hover {
          color: var(--gold);
          border-color: rgba(201,168,76,0.3);
          background: rgba(201,168,76,0.05);
        }
        .service-link-icon { font-size: 22px; }

        /* ── Footer ── */
        footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 28px 24px;
          text-align: center;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .footer-links a {
          font-size: 11px;
          color: var(--text-s);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.05em;
        }
        .footer-links a:hover { color: var(--gold); }
        .copyright {
          font-size: 11px;
          color: rgba(136,146,170,0.4);
          font-family: 'Cinzel', serif;
          letter-spacing: 0.2em;
        }

        /* no-img placeholder */
        .char-img-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 56px;
        }
      `}</style>

      <div className="stars-bg" />

      <div className="page-wrap">
        {/* ── Hero ── */}
        <section className="hero">
          <div className="lab-badge">✦ TWINKLE LAB ✦</div>
          <h1 className="logo">Twinkle Lab</h1>
          <p className="logo-sub">トゥインクル ラボ</p>
          <div className="gold-divider">
            <span className="gold-divider-line" />
            <span className="gold-divider-star">✦</span>
            <span className="gold-divider-line" />
          </div>
          <p className="tagline">
            AIキャラクターと一緒に、<br />
            <strong>学び・仕事・心・暮らし</strong>をもっと楽しく。
          </p>
        </section>

        {/* ── Characters ── */}
        <div className="section-label">
          <p className="section-en">OUR CHARACTERS</p>
          <h2 className="section-jp">キャラクターを選んでください</h2>
        </div>

        <div className="char-grid">
          {characters.map((c) => (
            <div
              key={c.id}
              className="char-card"
              style={{
                borderColor: c.colorBorder,
                boxShadow: `0 4px 24px ${c.colorLight}`,
              }}
            >
              {/* Image */}
              <div className="char-img-wrap">
                <img
                  src={c.img}
                  alt={c.name}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const placeholder = target.nextElementSibling as HTMLElement | null;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div
                  className="char-img-placeholder"
                  style={{ display: "none", background: c.colorLight }}
                >
                  ✦
                </div>
                <div className="char-img-gradient" />
              </div>

              {/* Body */}
              <div className="char-body">
                <div className="char-name-row">
                  <span className="char-name-en" style={{ color: c.color }}>
                    {c.name}
                  </span>
                  <span className="char-name-jp">{c.nameJp}</span>
                </div>
                <p className="char-title">{c.title}</p>
                <div className="char-tags">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="char-tag"
                      style={{ background: c.colorLight, color: c.color, border: `1px solid ${c.colorBorder}` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="char-quote" style={{ borderColor: c.colorBorder, color: c.color + "99" }}>
                  「{c.quote}」
                </p>
              </div>

              {/* Button */}
              <a
                href={c.href}
                className="char-btn"
                style={{
                  background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`,
                }}
              >
                部屋へ →
              </a>
            </div>
          ))}
        </div>

        {/* ── Service Links ── */}
        <div className="service-section">
          <p className="service-en">SERVICE LINKS</p>
          <div className="service-grid">
            {serviceLinks.map((s) => (
              <a key={s.href} href={s.href} className="service-link">
                <span className="service-link-icon">{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer>
          <div className="footer-links">
            <a href="/privacy">プライバシーポリシー</a>
            <a href="/tokusho">特定商取引法に基づく表記</a>
            <a href="/tos">利用規約</a>
            <a href="/contact">お問い合わせ</a>
          </div>
          <p className="copyright">© 2026 Twinkle Lab. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
