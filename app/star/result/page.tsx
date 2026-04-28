import { Suspense } from 'react'
import ResultContent from './ResultContent'

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{background:'#0a0e1a',color:'#f0eadc',fontFamily:'Noto Serif JP,serif',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
        <div style={{width:'60px',height:'60px',border:'3px solid rgba(201,168,76,0.2)',borderTopColor:'#c9a84c',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
        <div style={{fontFamily:'Cinzel,serif',fontSize:'14px',color:'#c9a84c',letterSpacing:'3px'}}>✦ 鑑定文を生成しています ✦</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    }>
      <ResultContent"" />
    </Suspense>
  )
}
