"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Formspreeのエンドポイントに送信（YOUR_FORM_IDを実際のIDに置き換えてください）
      const res = await fetch("https://formspree.io/f/mvzlbwep", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Noto+Sans+JP:wght@300;400;500&display=swap');

        .contact-root {
          min-height: 100vh;
          background: #0a0415;
          background-image:
            radial-gradient(ellipse at 20% 20%, rgba(120, 40, 180, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(200, 130, 255, 0.10) 0%, transparent 55%);
          color: #f0e6ff;
          font-family: 'Noto Sans JP', sans-serif;
          padding: 60px 20px 80px;
          position: relative;
          overflow: hidden;
        }

        /* 星のキラキラ */
        .stars {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .contact-inner {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
        }

        /* ヘッダー */
        .contact-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .contact-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          color: #c084fc;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 400;
          color: #f5eeff;
          letter-spacing: 0.05em;
          margin: 0 0 16px;
          line-height: 1.2;
        }
        .contact-sub {
          font-size: 0.88rem;
          color: #b89fd4;
          line-height: 1.8;
          font-weight: 300;
        }

        /* デコライン */
        .deco-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c084fc, transparent);
          margin: 20px auto;
        }

        /* フォームカード */
        .contact-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(192,132,252,0.2);
          border-radius: 16px;
          padding: 40px 36px;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 40px rgba(120,40,180,0.15);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-card { padding: 28px 20px; }
        }

        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          color: #c084fc;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .form-label span {
          color: #f472b6;
          margin-left: 4px;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(192,132,252,0.25);
          border-radius: 8px;
          color: #f0e6ff;
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 0.92rem;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(176,153,212,0.5);
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #c084fc;
          background: rgba(192,132,252,0.08);
          box-shadow: 0 0 0 3px rgba(192,132,252,0.12);
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c084fc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }
        .form-select option {
          background: #1a0530;
          color: #f0e6ff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 140px;
          line-height: 1.7;
        }

        /* 送信ボタン */
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #9333ea, #c026d3);
          border: none;
          border-radius: 10px;
          color: white;
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(147,51,234,0.4);
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(147,51,234,0.55);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ステータスメッセージ */
        .status-msg {
          margin-top: 18px;
          padding: 14px 18px;
          border-radius: 8px;
          font-size: 0.88rem;
          text-align: center;
          line-height: 1.6;
        }
        .status-success {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          color: #86efac;
        }
        .status-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        /* info */
        .contact-info {
          margin-top: 32px;
          text-align: center;
          font-size: 0.8rem;
          color: rgba(176,153,212,0.7);
          line-height: 1.8;
        }
        .contact-info a {
          color: #c084fc;
          text-decoration: none;
        }
        .contact-info a:hover { text-decoration: underline; }
      `}</style>

      {/* 星の背景 */}
      <div className="stars">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              ["--dur" as string]: `${Math.random() * 3 + 2}s`,
              ["--delay" as string]: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="contact-root">
        <div className="contact-inner">
          {/* ヘッダー */}
          <div className="contact-header">
            <p className="contact-label">✦ Contact ✦</p>
            <h1 className="contact-title">お問い合わせ</h1>
            <div className="deco-line" />
            <p className="contact-sub">
              ご質問・ご意見・ご要望など、お気軽にお送りください。<br />
              通常2〜3営業日以内にご返信いたします。
            </p>
          </div>

          {/* フォーム */}
          <div className="contact-card">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  お名前<span>*</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="山田 花子"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  メールアドレス<span>*</span>
                </label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">お問い合わせ種別</label>
              <select
                className="form-select"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                <option value="サービスについて">サービスについて</option>
                <option value="鑑定結果について">鑑定結果について</option>
                <option value="お支払い・課金について">お支払い・課金について</option>
                <option value="不具合・技術的な問題">不具合・技術的な問題</option>
                <option value="コラボ・取材のご依頼">コラボ・取材のご依頼</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                メッセージ<span>*</span>
              </label>
              <textarea
                className="form-textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="お問い合わせ内容をご記入ください..."
                required
              />
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
            >
              {status === "sending" ? "送信中..." : "✦ 送信する ✦"}
            </button>

            {status === "success" && (
              <div className="status-msg status-success">
                ✨ お問い合わせを受け付けました。<br />
                2〜3営業日以内にご返信いたします。
              </div>
            )}
            {status === "error" && (
              <div className="status-msg status-error">
                送信に失敗しました。時間をおいて再度お試しいただくか、<br />
                直接メールでお問い合わせください。
              </div>
            )}
          </div>

          <div className="contact-info">
            メールでのお問い合わせ：
            <a href="mailto:twinklelab2026@gmail.com">twinklelab2026@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
