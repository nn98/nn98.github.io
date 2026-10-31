import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Print from './Print.jsx'

// #print는 제출용 PDF 화면
function Root() {
  const [print, setPrint] = useState(location.hash === '#print')
  useEffect(() => {
    const f = () => setPrint(location.hash === '#print')
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  return print ? <Print /> : <App />
}

createRoot(document.getElementById('root')).render(<StrictMode><Root /></StrictMode>)
