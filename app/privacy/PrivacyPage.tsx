"use client";

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Noto Sans JP', sans-serif; background: #faf7f2; color: #1a1a2e; }

        .pp-header {
          background: linear-gradient(135deg, #0f1f3d 0%, #1a3160 100%);
          color: #fff;
          padding: 3rem 1.5rem 2.5rem;
          text-align: center;
        }
        .pp-header h1 {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .pp-header p {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.65);
        }

        .pp-main {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        .pp-section {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 0.8rem;
          padding: 1.75rem;
          margin-bottom: 1.25rem;
        }
        .pp-section h2 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f1f3d;
          margin-bottom: 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 2px solid #c9973a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .pp-section p, .pp-section li {
          font-size: 0.875rem;
          line-height: 1.85;
          color: #374151;
        }
        .pp-section ul {
          padding-left: 1.25rem;
          margin-top: 0.5rem;
        }
        .pp-section ul li { margin-bottom: 0.3rem; }
        .pp-section a {
          color: #c9973a;
          text-decoration: underline;
        }
        .pp-note {
          background: #f0f4ff;
          border-left: 3px solid #3b5bdb;
          padding: 0.75rem 1rem;
          border-radius: 0 0.4rem 0.4rem 0;
          margin-top: 0.75rem;
          font-size: 0.82rem;
          color: #1e3a8a;
          line-height: 1.7;
        }
        .pp-updated {
          text-align: center;
          font-size: 0.78rem;
          color: #9ca3af;
          margin-top: 2rem;
        }
        .pp-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #0f1f3d;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 2rem;
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.4rem;
          background: #fff;
          transition: background 0.15s;
        }
        .pp-back:hover { background: #f9fafb; }
      `}</style>

      <div className="pp-header">
        <h1>プライバシーポリシー</h1>
        <p>Privacy Policy</p>
      </div>

      <div className="pp-main">
        <a href="/" className="pp-back">← トップページへ戻る</a>

        <div className="pp-section">
          <h2>📋 基本方針</h2>
          <p>
            Twinkle Lab（以下「当サイト」）は、ユーザーの個人情報の保護を重要な責務と考え、
            個人情報保護法その他の関連法令を遵守し、適切に取り扱います。
          </p>
        </div>

        <div className="pp-section">
          <h2>📊 アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleが提供するアクセス解析ツール「Googleアナリティクス」を使用しています。
            Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <div className="pp-note">
            Cookieを無効にすることで収集を拒否することが可能です。詳しくはお使いのブラウザの設定をご確認ください。
            Googleアナリティクスの利用規約については
            <a href="https://www.google.com/analytics/terms/jp.html" target="_blank" rel="noopener noreferrer">こちら</a>
            をご確認ください。
          </div>
        </div>

        <div className="pp-section">
          <h2>📢 広告について（Google AdSense）</h2>
          <p>
            当サイトでは、Google LLC（以下「Google」）が提供する広告配信サービス
            「Google AdSense」を利用しています。
            Google AdSenseは、ユーザーの興味に応じた広告を表示するためにCookieを使用します。
          </p>
          <ul>
            <li>Cookieを使用することで、ユーザーが過去に当サイトやその他のサイトを訪問した情報に基づいて広告が配信されます</li>
            <li>Googleによるデータ収集・使用方法については
              <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">こちら</a>
              をご確認ください
            </li>
            <li>広告のCookieを無効にする場合は
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Googleの広告設定ページ</a>
              からオプトアウトできます
            </li>
          </ul>
        </div>

        <div className="pp-section">
          <h2>🛒 Amazonアソシエイトについて</h2>
          <p>
            当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、
            Amazonアソシエイト・プログラムの参加者です。
          </p>
          <div className="pp-note">
            当サイト内に掲載されているAmazonへのリンクは、アフィリエイトリンクです。
            リンクを経由してご購入いただいた場合、当サイトに紹介料が支払われます。
            購入者様の費用が増加することは一切ありません。
          </div>
        </div>

        <div className="pp-section">
          <h2>🤖 AIサービスの利用について</h2>
          <p>
            当サイトでは、Anthropic社が提供するAI「Claude」のAPIを使用してコンテンツを生成しています。
            ユーザーが入力したキーワードはAI処理のために送信されますが、個人を特定する情報は収集しません。
            入力内容はAI応答の生成にのみ使用され、当サイトに保存されることはありません。
          </p>
        </div>

        <div className="pp-section">
          <h2>💬 コメント機能について</h2>
          <p>
            当サイトのコメント機能では、投稿されたニックネームとコメント内容を保存します。
            保存期間は投稿から90日間です。個人を特定できる情報の入力はお控えください。
          </p>
        </div>

        <div className="pp-section">
          <h2>🔒 個人情報の収集と利用</h2>
          <p>当サイトでは、以下の場合に個人情報を収集することがあります。</p>
          <ul>
            <li>お問い合わせフォームからのご連絡</li>
            <li>メールマガジン等へのご登録</li>
          </ul>
          <p style={{marginTop: "0.75rem"}}>
            収集した個人情報は、お問い合わせへの回答やサービス提供の目的にのみ使用し、
            ご本人の同意なく第三者に提供することはありません。
          </p>
        </div>

        <div className="pp-section">
          <h2>⚠️ 免責事項</h2>
          <p>
            当サイトに掲載されている情報は、できる限り正確な情報の提供を心がけておりますが、
            正確性・安全性を保証するものではありません。
            当サイトの情報を基に行動した結果について、当サイトは一切の責任を負いかねます。
            また、当サイトからリンクされた外部サイトの内容については責任を負いかねます。
          </p>
        </div>

        <div className="pp-section">
          <h2>📝 プライバシーポリシーの変更</h2>
          <p>
            当サイトは、法令の改正や運営方針の変更等に伴い、本プライバシーポリシーを予告なく変更することがあります。
            変更後のポリシーは本ページに掲載した時点から効力を生じます。
          </p>
        </div>

        <div className="pp-section">
          <h2>📬 お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。
          </p>
          <div className="pp-note">
            運営者：Twinkle Lab<br />
            メールアドレス：twinklelab2026@gmail.com<br />
            ウェブサイト：https://www.twinkle-lab.jp
          </div>
        </div>

        <p className="pp-updated">制定日：2026年5月5日　最終更新：2026年5月5日</p>
      </div>
    </>
  );
}
