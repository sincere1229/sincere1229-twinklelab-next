export default function Tos() {
  return (
    <>
      <style>{`
        :root {
          --gold: #c9a84c;
          --gold2: #e8c97a;
          --pink: #fce8f3;
          --text: #3d1a40;
          --text-s: #8a6a9a;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          background: linear-gradient(160deg,#fce8f3 0%,#fdf0f8 40%,#f8eeff 100%);
          min-height:100vh;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .page-header {
          text-align: center;
          padding: 48px 24px 32px;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .site-name {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: var(--gold);
          letter-spacing: 0.15em;
          text-decoration: none;
          display: block;
          margin-bottom: 16px;
        }
        .page-title {
          font-size: clamp(16px,4vw,24px);
          font-weight: 500;
          color: var(--text);
          letter-spacing: 0.05em;
        }
        .gold-line {
          width: 80px; height: 1px;
          background: linear-gradient(90deg,transparent,var(--gold),transparent);
          margin: 16px auto 0;
        }
        main {
          max-width: 760px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .intro {
          font-size: 13px;
          color: var(--text-s);
          line-height: 2;
          margin-bottom: 40px;
          padding: 20px 24px;
          background: rgba(255,248,252,0.8);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 12px;
        }
        .section {
          margin-bottom: 36px;
        }
        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          color: var(--gold);
          letter-spacing: 0.2em;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent);
        }
        .section-body {
          background: rgba(255,248,252,0.9);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 12px;
          padding: 24px;
          font-size: 13px;
          color: var(--text);
          line-height: 2;
        }
        .section-body p { margin-bottom: 12px; }
        .section-body p:last-child { margin-bottom: 0; }
        .section-body ul {
          padding-left: 20px;
          margin-top: 8px;
        }
        .section-body li { margin-bottom: 6px; }
        .gold-link { color: var(--gold); text-decoration: none; }
        .gold-link:hover { text-decoration: underline; }
        footer {
          text-align: center;
          padding: 24px;
          border-top: 1px solid rgba(201,168,76,0.15);
          font-size: 12px;
          color: rgba(120,80,100,0.4);
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .footer-links a {
          font-size: 0.78rem;
          color: rgba(120,80,100,0.6);
          text-decoration: none;
        }
        .footer-links a:hover { color: var(--gold); }
      `}</style>

      <header className="page-header">
        <a href="/" className="site-name">Twinkle Lab</a>
        <h1 className="page-title">利用規約</h1>
        <div className="gold-line"></div>
      </header>

      <main>
        <p className="intro">
          本利用規約（以下「本規約」）は、Twinkle Lab（以下「当サービス」）が提供するサービスの利用条件を定めるものです。
          ご利用の前に必ずお読みください。サービスをご利用いただいた時点で、本規約に同意いただいたものとみなします。
        </p>

        <div className="section">
          <div className="section-title">第1条　サービスについて</div>
          <div className="section-body">
            <p>本サービスは、AIを活用したデジタルコンテンツ（タロットカード解析・数秘術診断・手相画像解析・相性診断・AI総合鑑定等）を提供する娯楽および自己啓発を目的としたサービスです。</p>
            <p>サービスはインターネットを通じて提供されます。</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第2条　利用条件</div>
          <div className="section-body">
            <p>本サービスは以下の条件を満たす方を対象としています。</p>
            <ul>
              <li>18歳以上の方（未成年の方は保護者の同意が必要です）</li>
              <li>本規約に同意いただける方</li>
              <li>日本国内在住の方</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第3条　禁止事項</div>
          <div className="section-body">
            <p>以下の行為を禁止します。</p>
            <ul>
              <li>コンテンツの無断転載・複製・二次利用</li>
              <li>不正アクセスやサービスの妨害行為</li>
              <li>他のユーザーや第三者への迷惑行為</li>
              <li>法令または公序良俗に違反する行為</li>
              <li>当サービスの運営を妨げる行為</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第4条　料金・決済</div>
          <div className="section-body">
            <p>有料サービスの料金は各サービスページに表示の金額（税込）です。</p>
            <p>お支払いはクレジットカード決済のみとなります。</p>
            <p>デジタルコンテンツの性質上、購入完了後のキャンセル・返金は原則承っておりません。システム障害等、当サービスの責に帰すべき事由によりサービスをご提供できない場合は全額返金いたします。</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第5条　免責事項</div>
          <div className="section-body">
            <p>本サービスのAIが生成するコンテンツはエンターテインメント・自己啓発を目的としたものであり、結果の正確性・完全性を保証するものではありません。</p>
            <p>診断・解析の結果は医療・法律・財務等の専門的アドバイスに代わるものではありません。</p>
            <p>サービスの利用により生じた損害について、当サービスは一切の責任を負いかねます。</p>
            <p>AIが生成するコンテンツの性質上、同一の入力に対しても結果が異なる場合があります。</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第6条　個人情報の取扱い</div>
          <div className="section-body">
            <p>個人情報の取扱いについては、別途定める<a href="/privacy" className="gold-link">プライバシーポリシー</a>に準じます。</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第7条　サービスの変更・終了</div>
          <div className="section-body">
            <p>当サービスは、事前の通知なくサービス内容の変更・停止・終了を行う場合があります。</p>
            <p>サービスの変更・終了により生じた損害について、当サービスは一切の責任を負いかねます。</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">第8条　準拠法・管轄裁判所</div>
          <div className="section-body">
            <p>本規約は日本法に準拠します。</p>
            <p>本規約に関する紛争については、さいたま地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </div>
        </div>

        <p style={{fontSize:'12px', color:'var(--text-s)', textAlign:'right'}}>
          制定日：2026年5月<br/>
          最終更新日：2026年5月
        </p>
      </main>

      <footer>
        <div className="footer-links">
          <a href="/">トップ</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/tokusho">特定商取引法に基づく表記</a>
          <a href="/contact">お問い合わせ</a>
        </div>
        © 2026 Twinkle Lab. All rights reserved.
      </footer>
    </>
  )
}
