// 제출용 PDF 화면(#print). 웹과 같은 content.js, data.js를 읽고, A4 한 장마다 내용이 끝나게 나눈다.
// 브라우저 인쇄(PDF로 저장)로 내보낸다. 장이 넘치면 화면에서 빨간 테두리로 보인다
import { useEffect, useRef } from 'react'
import { experiences, projects, IMG } from './data.js'
import { profile, awards, olderProjects, diagrams, skillGroups, projectResume, woowaResume } from './content.js'

const proj = t => ({ ...projects.find(p => p.title === t), ...projectResume[t] })
const SE = proj('SaveEats')
const TB = proj('Turbom (터봄)')
const [woowa, baton, ta] = experiences
const SITE = 'https://nn98.github.io/'

// **굵게**, `코드`만 살린다
function R({ t }) {
  return t.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((p, i) =>
    p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p.startsWith('`') ? <code key={i}>{p.slice(1, -1)}</code> : p)
}

// "주제어: 문장"을 굵은 주제어와 문장으로 나눈다
const split = s => { const m = s.match(/^([^:：]{2,12}):\s*(.+)$/); return m ? [m[1], m[2]] : [null, s] }

function Page({ n, label, children }) {
  return (
    <section className="page">
      <header className="ph"><span>{label}</span><span>김윤서 · Server Developer</span></header>
      <div className="body">{children}</div>
      <footer className="pf"><span>{SITE}</span><span>{n} / 6</span></footer>
    </section>
  )
}

const Stats = ({ xs }) => <div className="stats">{xs.map(([n, l]) => <div key={l} className="stat"><b>{n}</b><span>{l}</span></div>)}</div>
const Chips = ({ xs }) => <div className="chips">{xs.map(t => <span key={t}>{t}</span>)}</div>
const Bul = ({ xs }) => <ul>{xs.map(x => <li key={x}><R t={x} /></li>)}</ul>

function Flow({ f }) {
  return (
    <div className="flow"><em>{f.label}</em>
      {f.nodes.map((n, k) => typeof n === 'string'
        ? <i key={k}>{n && <small>{n}</small>}→</i>
        : <span key={k} className={n[2] ? 'key' : ''}>{n[0]}{n[1] && <small>{n[1]}</small>}</span>)}
    </div>
  )
}

// 트러블슈팅은 상황, 해결, 배움으로 줄인다. short면 해결만
function Trouble({ t, short }) {
  if (short) return <div className="tr"><h4>{t.issue}</h4><p><R t={t.solution} /></p></div>
  return (
    <div className="tr">
      <h4>{t.issue}</h4>
      <p><em>상황</em><R t={t.context} /></p>
      <p><em>해결</em><R t={t.solution} /></p>
      <p><em>배움</em><R t={t.learning} /></p>
    </div>
  )
}

function ProjectHead({ p, sub }) {
  return (
    <div className="phd">
      <div><h2>{p.title}<small>{p.summary}</small></h2><div className="meta">{p.period} · {p.team} · {p.role}</div></div>
      {sub && <div className="tag">{sub}</div>}
    </div>
  )
}

export default function Print() {
  const root = useRef(null)
  useEffect(() => {
    document.title = '김윤서_포트폴리오'
    // 넘친 장 표시: 화면에서만 보인다
    const mark = () => root.current?.querySelectorAll('.body').forEach(b => b.classList.toggle('over', b.scrollHeight > b.clientHeight + 1))
    document.fonts?.ready.then(mark); mark()
  }, [])

  return (
    <div className="print" ref={root}>
      <style>{CSS}</style>
      <div className="bar">
        <a href="#">← 웹 화면으로</a>
        <button onClick={() => print()}>PDF로 저장</button>
        <span>인쇄 창에서 대상 "PDF로 저장", 용지 A4, 여백 "없음", "배경 그래픽" 켜기</span>
      </div>

      {/* 1. 프로필: 이 장만 봐도 누구인지, 무엇을 했는지, 어떻게 연락하는지 */}
      <Page n={1} label="Profile">
        <div className="hero">
          <img src={IMG.profile} alt="" />
          <div>
            <h1>{profile.name}</h1>
            <div className="role">{profile.roles[0]}</div>
            <div className="contact">
              <span>{profile.email}</span><span>{profile.phone}</span>
              <a href={SITE}>nn98.github.io</a>
              {profile.links.map(([l, u]) => <a key={l} href={u}>{u.replace('https://', '')}</a>)}
            </div>
          </div>
        </div>
        <p className="lead">{profile.tagline}</p>
        <p className="muted">{profile.bio}</p>
        <Stats xs={profile.stats} />
        <h3>핵심 역량</h3>
        <div className="g3">{profile.summary.map(s => <div key={s.head} className="card"><em>{s.label}</em><h4>{s.head}</h4><p><R t={s.text} /></p></div>)}</div>
        <h3>기술 스택</h3>
        <div className="skills">{skillGroups.map(s => <div key={s.title}><em>{s.title}</em><b>{s.head}</b><span>{s.items.join(', ')}</span></div>)}</div>
        <h3>정보</h3>
        <div className="info">{profile.info.map(([k, v, d]) => <div key={k}><em>{k}</em><b>{v}</b>{d && <span>{d}</span>}</div>)}</div>
      </Page>

      {/* 2. 경력과 활동, 수상, 이전 프로젝트 */}
      <Page n={2} label="Experience">
        <h3 className="first">경력과 활동</h3>
        <div className="exp">
          <div className="eh"><h4>{woowa.title}</h4><span>{woowa.period}</span></div>
          <div className="meta">{woowa.role} · {woowaResume.headline}</div>
          <p>{woowaResume.intro}</p>
          <ul>{woowa.desc.slice(1).map(d => { const [k, v] = split(d); return <li key={d}>{k && <b>{k} </b>}{v}</li> })}</ul>
          <p className="muted">{woowaResume.extra}</p>
        </div>
        {[baton, ta].map(e => (
          <div key={e.title} className="exp">
            <div className="eh"><h4>{e.title}</h4><span>{e.period}</span></div>
            <div className="meta">{e.role}</div>
            <Bul xs={e.desc} />
          </div>
        ))}
        <h3>수상</h3>
        <div className="awards">{awards.map(([d, name, sub, prize]) => <div key={name}><span>{d}</span><div><b>{name}</b><small>{sub}</small></div><strong>{prize}</strong></div>)}</div>
        <h3>이전 프로젝트</h3>
        <div className="g3">{olderProjects.map(o => (
          <div key={o.title} className="card"><h4>{o.title}</h4><div className="meta">{o.period} · {o.role}</div><p>{o.summary}</p><p className="muted">{o.tech.join(', ')}</p></div>
        ))}</div>
      </Page>

      {/* 3. SaveEats 개요: 무엇을, 얼마나, 어떻게 */}
      <Page n={3} label="Project · SaveEats">
        <ProjectHead p={SE} sub={SE.headline} />
        <Stats xs={SE.metrics} />
        <p>{SE.description}</p>
        <h3>핵심</h3>
        <Bul xs={SE.highlights} />
        <h3>시스템 구성</h3>
        <p className="muted">{diagrams[0].desc}</p>
        {diagrams[0].flows.map(f => <Flow key={f.label} f={f} />)}
        <div className="shots">{SE.shots.map(([k, c]) => <figure key={k}><img src={IMG[k]} alt="" /><figcaption>{c}</figcaption></figure>)}</div>
        <Chips xs={SE.tech} />
        <div className="links">{SE.links.slice(0, 4).map(([l, u]) => <a key={l} href={u}>{l}</a>)}</div>
      </Page>

      {/* 4. SaveEats 결정과 근거: 목표, 시도, 상세 */}
      <Page n={4} label="Project · SaveEats · 결정과 근거">
        <ProjectHead p={SE} sub="목표, 시도, 결정의 근거" />
        <div className="g2">
          <div><h3 className="first">목표</h3><Bul xs={SE.goal} /></div>
          <div><h3 className="first">시도</h3><Bul xs={SE.attempt} /></div>
        </div>
        <h3>상세</h3>
        <div className="g2 det">{SE.details.map(([k, v]) => <div key={k} className="card"><h4>{k}</h4><p><R t={v} /></p></div>)}</div>
      </Page>

      {/* 5. SaveEats 트러블슈팅 */}
      <Page n={5} label="Project · SaveEats · 트러블슈팅">
        <ProjectHead p={SE} sub={`트러블슈팅 ${SE.troubleshooting.length}건 중 4건, 나머지는 웹에`} />
        <div className="trs">{SE.troubleshooting.slice(0, 4).map(t => <Trouble key={t.issue} t={t} />)}</div>
        <h3>할인 판정 모델</h3>
        <p className="muted">{diagrams[1].desc}</p>
        {diagrams[1].flows.map(f => <Flow key={f.label} f={f} />)}
        <h3>릴리즈 노트</h3>
        <div className="logs">{SE.logs.map(([d, t]) => <div key={d}><span>{d}</span>{t}</div>)}</div>
      </Page>

      {/* 6. Turbom: 한 장에 개요부터 트러블슈팅까지 */}
      <Page n={6} label="Project · Turbom">
        <ProjectHead p={TB} sub={TB.headline} />
        <Stats xs={TB.metrics} />
        <p>{TB.description}</p>
        <h3>핵심</h3>
        <Bul xs={TB.highlights} />
        <h3>도메인 모델</h3>
        {diagrams[2].flows.map(f => <Flow key={f.label} f={f} />)}
        <h3>결정의 근거</h3>
        <div className="g3">{TB.details.map(([k, v]) => <div key={k} className="card"><h4>{k}</h4><p><R t={v} /></p></div>)}</div>
        <h3>트러블슈팅</h3>
        <div className="g2">{TB.troubleshooting.map(t => <Trouble key={t.issue} t={t} short />)}</div>
        <Chips xs={TB.tech} />
        <div className="links">{TB.links.map(([l, u]) => <a key={l} href={u}>{l}</a>)}</div>
      </Page>
    </div>
  )
}

const CSS = `
@page { size: A4; margin: 0 }
html, body { background: #e9ecf1 }
.print { --c: #0B5CAD; --soft: #EDF3FA; --mute: #5b6472; color: #1b1f24; font-size: 12.5px; line-height: 1.55;
  word-break: keep-all; overflow-wrap: break-word; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.print * { box-sizing: border-box; margin: 0 }
.bar { position: sticky; top: 0; z-index: 1; display: flex; gap: 16px; align-items: center; padding: 10px 20px; background: #fff; border-bottom: 1px solid #d5dae1; font-size: 13px }
.bar a { color: var(--c) } .bar span { color: var(--mute) }
.bar button { font: inherit; font-weight: 700; color: #fff; background: var(--c); border: 0; border-radius: 8px; padding: 8px 16px; cursor: pointer }
.page { width: 210mm; height: 297mm; margin: 24px auto; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.12);
  padding: 11mm 14mm 9mm; display: flex; flex-direction: column; break-after: page; overflow: hidden }
.ph, .pf { display: flex; justify-content: space-between; font-size: 10px; color: var(--mute); flex-shrink: 0 }
.ph { border-bottom: 1px solid #e3e7ec; padding-bottom: 5px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .04em }
.pf { border-top: 1px solid #e3e7ec; padding-top: 5px; margin-top: 10px }
.body { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; gap: 8px }
.body.over { outline: 3px solid #e53935 }
h1 { font-size: 34px; font-weight: 800; letter-spacing: -.03em; line-height: 1.1 }
h2 { font-size: 24px; font-weight: 800; letter-spacing: -.02em; line-height: 1.2 }
h2 small { font-size: 14px; font-weight: 600; color: var(--mute); margin-left: 10px; letter-spacing: 0 }
h3 { font-size: 14px; font-weight: 800; color: var(--c); margin-top: 6px; padding-bottom: 3px; border-bottom: 1.5px solid var(--c) }
h3.first { margin-top: 0 }
h4 { font-size: 13.5px; font-weight: 700; line-height: 1.4 }
h1, h2, h3, h4 { text-wrap: balance } p, li { text-wrap: pretty }
b, strong { font-weight: 700 } .card b, li b, .tr b { color: var(--c) }
em { font-style: normal; font-weight: 700; color: var(--c); font-size: 11px }
small { display: block; font-size: 10.5px; color: var(--mute); font-weight: 500 }
code { font-family: ui-monospace, monospace; font-size: .9em; background: #f0f2f5; padding: 0 3px; border-radius: 3px }
ul { padding-left: 16px; display: grid; gap: 2px } li::marker { color: var(--c) }
a { color: var(--c); text-decoration: none }
.muted, .meta { color: var(--mute) } .meta { font-size: 11.5px }
.hero { display: flex; gap: 20px; align-items: center }
.hero img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover }
.role { font-size: 17px; font-weight: 600; color: var(--c); margin: 2px 0 8px }
.contact { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 12px }
.lead { font-size: 17px; font-weight: 700; line-height: 1.45; margin-top: 6px }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px }
.stat { background: var(--soft); border-radius: 10px; padding: 10px 12px }
.stat b { display: block; color: var(--c); font-size: 19px; font-weight: 800; letter-spacing: -.02em; white-space: nowrap; line-height: 1.2 }
.stat span { font-size: 10.5px; color: var(--mute); line-height: 1.35; display: block; margin-top: 2px }
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 14px }
.g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px }
.card { border: 1px solid #e3e7ec; border-radius: 10px; padding: 9px 11px; display: flex; flex-direction: column; gap: 3px }
.card p { font-size: 11.5px; line-height: 1.5 }
.skills { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px }
.skills > div, .info > div { display: flex; flex-direction: column }
.skills b { font-size: 12.5px } .skills span { font-size: 11.5px; color: var(--mute) }
.info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 14px }
.info b { font-size: 12.5px } .info span { font-size: 11px; color: var(--mute) }
.exp { display: flex; flex-direction: column; gap: 3px }
.exp + .exp { margin-top: 4px }
.eh { display: flex; justify-content: space-between; align-items: baseline }
.eh span { font-size: 11.5px; color: var(--mute); white-space: nowrap }
.awards > div { display: grid; grid-template-columns: 64px 1fr auto; gap: 10px; align-items: center; padding: 5px 0; border-bottom: 1px solid #eef0f3 }
.awards span { color: var(--mute); font-size: 11.5px } .awards strong { color: var(--c); font-size: 14px; font-weight: 800 }
.phd { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px }
.tag { flex-shrink: 0; font-size: 11px; font-weight: 700; color: var(--c); background: var(--soft); border-radius: 999px; padding: 3px 10px }
.flow { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; font-size: 11.5px }
.flow > em { width: 34px }
.flow > span { border: 1px solid #d5dae1; border-radius: 8px; padding: 4px 9px; font-weight: 700; text-align: center }
.flow > span.key { border-color: var(--c); background: var(--soft) }
.flow > i { font-style: normal; color: var(--mute); text-align: center; line-height: 1.1 }
.flow > i small { font-size: 9.5px }
.shots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 4px }
.shots figure { display: flex; flex-direction: column; gap: 3px; min-height: 0 }
.shots img { width: 100%; height: 150px; object-fit: cover; object-position: top; border: 1px solid #e3e7ec; border-radius: 8px }
.shots figcaption { font-size: 10px; color: var(--mute) }
.chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: auto }
.chips span { font-size: 10.5px; background: #f0f2f5; border-radius: 999px; padding: 2px 8px }
.links { display: flex; gap: 14px; font-size: 11.5px; font-weight: 600 }
.det .card p { font-size: 11.5px }
.trs { display: grid; gap: 10px }
.tr { border-left: 3px solid var(--c); padding: 2px 0 2px 12px; display: flex; flex-direction: column; gap: 3px }
.tr p { font-size: 11.5px; line-height: 1.5 } .tr p em { margin-right: 6px }
.logs > div { display: grid; grid-template-columns: 64px 1fr; gap: 10px; font-size: 11.5px; padding: 3px 0 }
.logs span { color: var(--mute) }
@media print {
  html, body { background: #fff }
  .bar { display: none }
  .page { margin: 0; box-shadow: none }
  .body.over { outline: 0 }
}
`
