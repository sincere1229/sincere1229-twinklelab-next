export default function Tokusho() {
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
        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          color: var(--gold);
          letter-spacing: 0.2em;
          margin: 40px 0 16px;
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
        table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255,248,252,0.9);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(180,120,160,0.1);
          margin-bottom: 32px;
        }
        tr { border-bottom: 1px solid rgba(201,168,76,0.12); }
        tr:last-child { border-bottom: none; }
        th {
          width: 38%;
          padding: 18px 20px;
          background: rgba(201,168,76,0.08);
          font-size: 12px;
          font-weight: 500;
          color: var(--text-s);
          text-align: left;
          vertical-align: top;
          border-right: 1px solid rgba(201,168,76,0.12);
        }
        td {
          padding: 18px 20px;
          font-size: 13px;
          color: var(--text);
          line-height: 1.9;
          vertical-align: top;
        }
        .note-box {
          background: rgba(255,248,252,0.9);
          border: 1px solid rgba(201,168,76,0.2);
          border-left: 3px solid var(--gold);
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          font-size: 13px;
          color: var(--text-s);
          line-height: 2;
          margin-bottom: 32px;
        }
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
        @media(max-width:600px) {
          th { width: 42%; padding: 14px; font-size: 11px; }
          td { padding: 14px; font-size: 12px; }
        }
      `}</style>

      <header className="page-header">
        <a href="/" className="site-name">Twinkle Lab</a>
        <h1 className="page-title">特定商取引法に基づく表記</h1>
        <div className="gold-line"></div>
      </header>

      <main>
        <p className="intro">
          特定商取引に関する法律第11条に基づき、以下の通り表記いたします。<br />
          本サービスをご利用いただく前に必ずご確認ください。
        </p>

        <div className="section-title">販売業者情報</div>
        <table>
          <tbody>
            <tr>
              <th>販売業者名</th>
              <td>Twinkle Lab（トゥウィンクル ラボ）</td>
            </tr>
            <tr>
              <th>運営責任者</th>
              <td>中村 恵子</td>
            </tr>
            <tr>
              <th>所在地</th>
              <td>
                〒355-0211<br />
                埼玉県比企郡嵐山町<br />
                <span style={{fontSize:'11px', color:'var(--text-s)'}}>※番地はお問い合わせいただいた際にお知らせします</span>
              </td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>
                お問い合わせフォームよりご連絡ください<br />
                <span style={{fontSize:'11px', color:'var(--text-s)'}}>※電話でのお問い合わせには対応しておりません</span>
              </td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>お問い合わせフォームよりご連絡ください</td>
            </tr>
            <tr>
              <th>お問い合わせ</th>
              <td><a href="/contact" className="gold-link">お問い合わせフォームはこちら</a></td>
            </tr>
          </tbody>
        </table>

        <div className="section-title">サービス・販売について</div>
        <table>
          <tbody>
            <tr>
              <th>販売サービス名</th>
              <td>
                Twinkle Star Oracle（AIデジタルコンテンツサービス）<br />
                ・無料コンテンツ<br />
                ・タロットカード解析（AI）<br />
                ・数秘術診断<br />
                ・手相画像解析<br />
                ・相性診断<br />
                ・AI総合鑑定
              </td>
            </tr>
            <tr>
              <th>販売価格</th>
              <td>
                各サービスページに表示の金額（税込）<br />
                ¥980〜¥3,980（サービスにより異なります）<br />
                ※無料サービスもございます
              </td>
            </tr>
            <tr>
              <th>お支払い方法</th>
              <td>クレジットカード（VISA・Mastercard・JCB・American Express）</td>
            </tr>
            <tr>
              <th>お支払い時期</th>
              <td>ご購入お手続き完了時</td>
            </tr>
            <tr>
              <th>サービス提供時期</th>
              <td>決済完了後、即時にご利用いただけます</td>
            </tr>
            <tr>
              <th>動作環境</th>
              <td>
                インターネット接続環境が必要です<br />
                対応ブラウザ：Chrome・Safari・Firefox・Edge（最新版推奨）<br />
                スマートフォン・タブレット・PCにてご利用いただけます
              </td>
            </tr>
          </tbody>
        </table>

        <div className="section-title">キャンセル・返金について</div>
        <table>
          <tbody>
            <tr>
              <th>キャンセルポリシー</th>
              <td>
                デジタルコンテンツの性質上、購入完了後のキャンセル・返金は原則承っておりません。<br />
                ご購入前にサービス内容をよくご確認の上お手続きください。
              </td>
            </tr>
            <tr>
              <th>返金対応</th>
              <td>
                システム障害等、当社の責に帰すべき事由によりサービスをご提供できない場合は全額返金いたします。<br />
                <a href="/contact" className="gold-link">お問い合わせフォーム</a>よりご連絡ください。
              </td>
            </tr>
          </tbody>
        </table>

        <div className="section-title">免責事項</div>
        <div className="note-box">
          本サービスは娯楽および自己啓発を目的としたAIによるデジタルコンテンツです。
          診断・解析の結果は参考情報であり、医療・法律・財務等の専門的アドバイスに代わるものではありません。
          サービスの利用結果について、当社は一切の責任を負いかねます。<br /><br />
          AIが生成するコンテンツの性質上、同一の入力に対しても結果が異なる場合があります。
          あらかじめご了承ください。
        </div>

        <p style={{fontSize:'12px', color:'var(--text-s)', textAlign:'right'}}>
          最終更新日：2026年5月
        </p>
      </main>

      <footer>
        <div className="footer-links">
          <a href="/">トップ</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/contact">お問い合わせ</a>
          <a href="/star">占いポータル</a>
        </div>
        © 2026 Twinkle Lab. All rights reserved.
      </footer>
    </>
  )
}
