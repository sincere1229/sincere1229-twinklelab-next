'use client'
import { useState, useRef } from 'react'

export default function TesouPage() {
  const [imageL, setImageL] = useState<string | null>(null)
  const [imageR, setImageR] = useState<string | null>(null)
  const [mimeTypeL, setMimeTypeL] = useState('image/jpeg')
  const [mimeTypeR, setMimeTypeR] = useState('image/jpeg')
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [paymentSuccess] = useState(
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('payment') === 'success'
  )

  const handleImage = (side: 'L' | 'R', file: File) => {
    if (!file.type.startsWith('image/')) { setError('画像ファイルを選択してください'); return }
    if (file.size > 10 * 1024 * 1024) { setError('10MB以下の画像を選択してください'); return }
    const reader = new FileReader()
    reader.onload = e => {
      const dataUrl = e.target?.result as string
      const base64 = dataUrl.split(',')[1]
      if (side === 'L') { setImageL(base64); setMimeTypeL(file.type) }
      else { setImageR(base64); setMimeTypeR(file.type) }
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!imageL && !imageR) return
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch('/api/uranai/tesou', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageL, imageR, mimeTypeL, mimeTypeR, memo }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '鑑定に失敗しました')
      setResult(data.result)
    } catch (err: any) {
      setError(err.message || '鑑定中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const reset = () => {
    setImageL(null); setImageR(null); setMemo(''); setResult(''); setError('')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1a0a10,#2a1020,#1a0818)', padding: '40px 20px 80px', fontFamily: "'Noto Serif JP',serif", color: '#fdf6f0' }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.3em', color: '#d4a843', textTransform: 'uppercase', marginBottom: 12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 300, marginBottom: 8 }}>
            手相<span style={{ color: '#f0d080', fontStyle: 'italic' }}>詳細診断</span>
          </h1>
          <div style={{ width: 70, height: 1, background: 'linear-gradient(90deg,transparent,#d4a843,transparent)', margin: '12px auto' }} />
          <p style={{ fontSize: 12, color: 'rgba(253,246,240,0.5)', lineHeight: 1.8 }}>あなたの手が語る、本来の姿と今の流れ</p>
        </div>

        {/* Payment banner */}
        {paymentSuccess && (
          <div style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.3)', borderRadius: 12, padding: '14px 18px', textAlign: 'center', fontSize: 13, color: '#f0d080', marginBottom: 24 }}>
            ✨ お支払いが完了しました。手相画像をアップロードして鑑定をお受けください。
          </div>
        )}

        {/* Card */}
        <div style={{ background: 'rgba(253,246,240,0.04)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 20, padding: '32px 28px', backdropFilter: 'blur(10px)' }}>

          {!result && !loading && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: '#f0d080', marginBottom: 6 }}>🤚 手相画像をアップロード</div>
                <p style={{ fontSize: 12, color: 'rgba(253,246,240,0.45)', lineHeight: 1.7 }}>両手のひらの写真をご用意ください<br />明るい場所で撮影すると精度が上がります</p>
              </div>

              {/* Upload grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {(['L', 'R'] as const).map(side => (
                  <div key={side}>
                    <div style={{ fontSize: 11, color: 'rgba(253,246,240,0.45)', textAlign: 'center', marginBottom: 6 }}>
                      {side === 'L' ? '🤚 左手' : '🤚 右手'}
                    </div>
                    {(side === 'L' ? imageL : imageR) ? (
                      <div style={{ position: 'relative' }}>
                        <img src={`data:${side === 'L' ? mimeTypeL : mimeTypeR};base64,${side === 'L' ? imageL : imageR}`}
                          style={{ width: '100%', borderRadius: 10, border: '1px solid rgba(212,168,67,0.3)', maxHeight: 160, objectFit: 'cover' }} alt="" />
                        <button onClick={() => side === 'L' ? setImageL(null) : setImageR(null)}
                          style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(200,96,122,0.8)', border: 'none', color: 'white', width: 24, height: 24, borderRadius: '50%', cursor: 'pointer', fontSize: 12 }}>✕</button>
                      </div>
                    ) : (
                      <label style={{ border: '2px dashed rgba(212,168,67,0.3)', borderRadius: 14, padding: '24px 10px', textAlign: 'center', cursor: 'pointer', display: 'block', background: 'rgba(212,168,67,0.02)', transition: 'all 0.3s' }}>
                        <input type="file" accept="image/*" style={{ display: 'none' }}
                          onChange={e => e.target.files?.[0] && handleImage(side, e.target.files[0])} />
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{side === 'L' ? '✋' : '🤚'}</div>
                        <div style={{ fontSize: 11, color: 'rgba(253,246,240,0.6)' }}>タップして選択</div>
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(253,246,240,0.3)', textAlign: 'center', marginBottom: 16 }}>※片手のみでも鑑定できます</div>

              {/* Memo */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: 'rgba(253,246,240,0.5)', marginBottom: 6 }}>💭 気になることがあればお書きください（任意）</div>
                <textarea value={memo} onChange={e => setMemo(e.target.value)}
                  placeholder="例：恋愛のこと、仕事のこと、最近気になっていること"
                  style={{ width: '100%', background: 'rgba(253,246,240,0.04)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 12, padding: 12, color: '#fdf6f0', fontFamily: "'Noto Serif JP',serif", fontSize: 13, lineHeight: 1.7, resize: 'none', height: 80, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {error && (
                <div style={{ background: 'rgba(200,96,122,0.1)', border: '1px solid rgba(200,96,122,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 12, color: '#f0a8c0', textAlign: 'center', marginBottom: 12 }}>{error}</div>
              )}

              <button onClick={analyze} disabled={!imageL && !imageR}
                style={{ width: '100%', padding: 16, border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#c8607a,#f0d080)', color: 'white', fontFamily: "'Noto Serif JP',serif", fontSize: 14, letterSpacing: '0.1em', cursor: (!imageL && !imageR) ? 'not-allowed' : 'pointer', opacity: (!imageL && !imageR) ? 0.4 : 1, transition: 'all 0.3s' }}>
                ✨ AI手相鑑定をはじめる
              </button>
            </>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 20, animation: 'float 2s ease-in-out infinite' }}>🔮</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: '#f0d080', marginBottom: 8 }}>手相を読み解いています…</div>
              <div style={{ fontSize: 12, color: 'rgba(253,246,240,0.4)', lineHeight: 2 }}>あなたの手が語る言葉に<br />静かに耳を傾けています</div>
            </div>
          )}

          {result && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>✨</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: '#f0d080' }}>鑑定結果</div>
              </div>
              <div style={{ width: 70, height: 1, background: 'linear-gradient(90deg,transparent,#d4a843,transparent)', margin: '0 auto 20px' }} />
              <div style={{ background: 'rgba(253,246,240,0.04)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: 14, padding: 22, fontSize: 13, lineHeight: 2, color: 'rgba(253,246,240,0.85)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: 16 }}>
                {result}
              </div>
              <button onClick={copy} style={{ width: '100%', padding: 13, border: `1px solid ${copied ? 'rgba(240,168,192,0.5)' : 'rgba(212,168,67,0.4)'}`, borderRadius: 12, background: 'transparent', color: copied ? '#f0a8c0' : '#f0d080', fontFamily: "'Noto Serif JP',serif", fontSize: 13, cursor: 'pointer', marginBottom: 10, transition: 'all 0.3s' }}>
                {copied ? '✅ コピーしました！' : '📋 テキストをコピー'}
              </button>
              <button onClick={reset} style={{ width: '100%', padding: 11, border: 'none', borderRadius: 10, background: 'rgba(253,246,240,0.04)', color: 'rgba(253,246,240,0.4)', fontFamily: "'Noto Serif JP',serif", fontSize: 12, cursor: 'pointer' }}>
                別の手相で再鑑定する
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 14, background: 'rgba(240,168,192,0.04)', borderRadius: 12, fontSize: 11, color: 'rgba(253,246,240,0.3)', lineHeight: 1.9, textAlign: 'center' }}>
          ご入力いただいた画像は鑑定後に保持されません<br />
          結果はコピーして保存してください
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </div>
  )
}
