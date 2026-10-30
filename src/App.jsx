import { useEffect, useRef, useState, Fragment } from 'react'
import {
  Avatar, Box, Button, Card, CardActionArea, CardContent, Chip, Collapse, Container, CssBaseline, Divider, Link,
  List, ListItemButton, Paper, Stack, Tab, Tabs, ThemeProvider, Typography, createTheme, useMediaQuery,
} from '@mui/material'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded'
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { experiences, projects, skills, IMG } from './data.js'
import { profile, awards, olderProjects, diagrams } from './content.js'

const theme = createTheme({
  colorSchemes: {
    light: { palette: { primary: { main: '#0B5CAD' }, background: { default: '#F4F6F9' } } },
    dark: { palette: { primary: { main: '#5CB8FF' }, background: { default: '#0D1117', paper: '#161B22' } } },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700 }, h4: { fontWeight: 700 }, h5: { fontWeight: 700 }, h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: { MuiCssBaseline: { styleOverrides: { body: { wordBreak: 'keep-all', overflowWrap: 'break-word' } } }, MuiPaper: { defaultProps: { variant: 'outlined' } }, MuiCard: { defaultProps: { variant: 'outlined' } } },
})

const SECTIONS = [
  ['profile', 'Profile'], ['experience', 'Experience'], ['projects', 'Projects'], ['design', 'Design'],
  ['awards', 'Awards'], ['skills', 'Skills & Contact'],
]

// **굵게**, `코드` 표기를 그대로 살려 그린다
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((p, i) =>
    p.startsWith('**') ? <Box key={i} component="strong" sx={{ color: 'primary.main', fontWeight: 700 }}>{p.slice(2, -2)}</Box>
      : p.startsWith('`') ? <Box key={i} component="code" sx={{ fontFamily: 'ui-monospace, monospace', fontSize: '.9em', px: .5, borderRadius: 1, bgcolor: 'action.hover' }}>{p.slice(1, -1)}</Box>
        : p)
}

function Section({ id, title, eyebrow, children }) {
  return (
    <Box component="section" id={id} sx={{
      height: { md: '100dvh' }, scrollSnapAlign: 'start',
      display: 'flex', flexDirection: 'column', py: { xs: 6, md: 5 }, px: { xs: 2, md: 6 },
    }}>
      {title && <Stack direction="row" spacing={1.5} sx={{ alignItems: 'baseline', mb: 3, flexShrink: 0 }}>
        <Typography variant="h3" component="h2" sx={{ fontSize: { xs: 28, md: 36 } }}>{title}</Typography>
        <Typography variant="overline" color="text.secondary">{eyebrow}</Typography>
      </Stack>}
      {/* 화면 한 장에 들어가지 않는 내용은 섹션 안에서 스크롤 */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: { md: 'auto' }, pr: { md: 1 } }}>{children}</Box>
    </Box>
  )
}

function ExtLink({ href, children }) {
  return <Button size="small" variant="outlined" href={href} target="_blank" rel="noopener" endIcon={<OpenInNewRounded fontSize="small" />}>{children}</Button>
}

function Hero() {
  const [r, setR] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setR(x => (x + 1) % profile.roles.length), 3200)
    return () => clearInterval(t)
  }, [])
  return (
    <Section id="profile">
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6} sx={{ minHeight: '100%', alignItems: { lg: 'center' } }}>
        <Stack spacing={3} sx={{ flex: 1.2, minWidth: 0 }}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Avatar src={IMG.profile} alt="김윤서 프로필 사진" sx={{ width: { xs: 96, md: 132 }, height: { xs: 96, md: 132 } }} />
            <Box>
              <Chip label="현재 구직 중" color="primary" size="small" variant="outlined" sx={{ mb: 1 }} />
              <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 64 } }}>{profile.name}</Typography>
              <Typography variant="h5" color="primary" sx={{ minHeight: '1.5em', fontWeight: 600 }}>{profile.roles[r]}</Typography>
            </Box>
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.5 }}>{profile.tagline}</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 17 }}>{profile.bio}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 1.5 }}>
            {profile.stats.map(([n, l]) => (
              <Paper key={l} sx={{ p: 2 }}>
                <Typography color="primary" sx={{ fontWeight: 800, fontSize: { xs: 22, md: 28 }, lineHeight: 1.2 }}>{n}</Typography>
                <Typography variant="body2" color="text.secondary">{l}</Typography>
              </Paper>
            ))}
          </Box>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {profile.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}
            <Button size="small" variant="contained" href={`mailto:${profile.email}`}>{profile.email}</Button>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Stack component="ul" spacing={1.5} sx={{ m: 0, pl: 2.5, fontSize: 16, lineHeight: 1.7 }}>
              {profile.summary.map(s => <li key={s}><Rich text={s} /></li>)}
            </Stack>
          </Paper>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
            {profile.info.map(([k, v, d]) => (
              <Box key={k} sx={{ borderTop: 1, borderColor: 'divider', pt: 1 }}>
                <Typography variant="caption" color="text.secondary">{k}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{v}</Typography>
                {d && <Typography variant="caption" color="text.secondary">{d}</Typography>}
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Section>
  )
}

function Experience({ wide }) {
  const [i, setI] = useState(0)
  const e = experiences[i]
  return (
    <Section id="experience" title="경력 & 활동" eyebrow="Experience">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Tabs orientation={wide ? 'vertical' : 'horizontal'} variant="scrollable" value={i} onChange={(_, v) => setI(v)}
          sx={{ minWidth: { md: 240 }, borderRight: { md: 1 }, borderColor: { md: 'divider' }, flexShrink: 0 }}>
          {experiences.map(x => <Tab key={x.title} sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            label={<Box><Typography sx={{ fontWeight: 700 }}>{x.title}</Typography><Typography variant="caption" color="text.secondary">{x.period}</Typography></Box>} />)}
        </Tabs>
        <Paper sx={{ p: { xs: 2.5, md: 4 }, flex: 1, minWidth: 0 }}>
          <Chip label={e.type} size="small" color="primary" variant="outlined" />
          <Typography variant="h4" sx={{ mt: 1.5, fontSize: { xs: 24, md: 30 } }}>{e.title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2.5 }}>
            {e.role} · {e.period}{e.link && <> · <Link href={e.link} target="_blank" rel="noopener">학습 저장소</Link></>}
          </Typography>
          <Stack component="ul" spacing={1.5} sx={{ m: 0, pl: 2.5, fontSize: 16, lineHeight: 1.7 }}>
            {e.desc.map(d => {
              // "책임 분리: ..." 처럼 앞에 붙은 주제어를 강조한다
              const m = d.match(/^([^:]{2,12}): (.*)$/)
              return <li key={d}>{m ? <><Box component="strong" sx={{ color: 'primary.main' }}>{m[1]}</Box> <Rich text={m[2]} /></> : <Rich text={d} />}</li>
            })}
          </Stack>
        </Paper>
      </Stack>
    </Section>
  )
}

function Blk({ title, children }) {
  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ mb: 1, fontSize: 17 }}>{title}</Typography>
      {children}
    </Box>
  )
}
const Bullets = ({ xs }) => <Stack component="ul" spacing={.75} sx={{ m: 0, pl: 2.5 }}>{xs.map(x => <li key={x}><Rich text={x} /></li>)}</Stack>

function Trouble({ t }) {
  const rows = [['제약', t.constraint], ['상황', t.context], ['해결', t.solution], ['배운점', t.learning]].filter(r => r[1])
  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 1.5 }}><Rich text={t.issue} /></Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '6px 14px' }}>
        {rows.map(([k, v]) => <Fragment key={k}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{k}</Typography>
          <Typography variant="body2" sx={k === '해결' ? { fontWeight: 600 } : null}><Rich text={v} /></Typography>
        </Fragment>)}
      </Box>
      {(t.refs?.length > 0 || t.privateNote) && <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75, mt: 1.5 }}>
        {t.refs?.map(([l, u]) => <Chip key={u} label={l} size="small" component="a" href={u} target="_blank" rel="noopener" clickable variant="outlined" />)}
        {t.privateNote && <Typography variant="caption" color="text.secondary">{t.privateNote}</Typography>}
      </Stack>}
    </Paper>
  )
}

function Projects() {
  const [i, setI] = useState(0)
  const [open, setOpen] = useState(false)
  const p = projects[i]
  const pick = n => { setI(n); setOpen(false) }
  return (
    <Section id="projects" title="프로젝트" eyebrow="Projects">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Stack spacing={1.5} sx={{ width: { xs: '100%', md: 260 }, flexShrink: 0, position: { md: 'sticky' }, top: 0 }}>
          {projects.map((x, n) => (
            <Card key={x.title} sx={{ borderColor: n === i ? 'primary.main' : undefined, borderWidth: n === i ? 2 : 1 }}>
              <CardActionArea onClick={() => pick(n)} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1.5, p: 1.5 }}>
                <Box component="img" src={IMG[x.shots[0][0]]} alt="" sx={{ width: 56, height: 56, objectFit: 'cover', objectPosition: 'top', borderRadius: 2, flexShrink: 0 }} />
                <Box><Typography sx={{ fontWeight: 700 }}>{x.title}</Typography><Typography variant="body2" color="text.secondary">{x.summary}</Typography></Box>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Paper sx={{ p: { xs: 2.5, md: 4 }, flex: 1, minWidth: 0 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>{p.title}</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{p.summary}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>{p.period} · {p.team}</Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 1.5 }}>{p.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}</Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 1.5, my: 3 }}>
            {p.metrics.map(([n, l]) => (
              <Box key={l} sx={{ p: 2, borderRadius: 3, bgcolor: 'action.hover' }}>
                <Typography color="primary" sx={{ fontWeight: 800, fontSize: { xs: 22, md: 28 }, lineHeight: 1.2 }}>{n}</Typography>
                <Typography variant="body2" color="text.secondary">{l}</Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontSize: 16, lineHeight: 1.75 }}><Rich text={p.description} /></Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75, mt: 2 }}>{p.tech.map(t => <Chip key={t} label={t} size="small" />)}</Stack>

          {/* 기본은 접어 두고 필요할 때 펼친다 */}
          <Collapse in={open}>
            <Stack spacing={3.5} sx={{ mt: 3.5 }}>
              <Blk title="화면">
                <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1 }}>
                  {p.shots.map(([k, c]) => <Box key={k} component="figure" sx={{ m: 0, flexShrink: 0 }}>
                    <Box component="img" src={IMG[k]} alt={c} loading="lazy" sx={{ height: 360, borderRadius: 2, border: 1, borderColor: 'divider' }} />
                    <Typography component="figcaption" variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 220 }}>{c}</Typography>
                  </Box>)}
                </Stack>
              </Blk>
              <Blk title="개발 배경"><Typography><Rich text={p.background} /></Typography></Blk>
              <Blk title="담당 업무"><Typography color="text.secondary" sx={{ mb: 1 }}>{p.role}</Typography><Bullets xs={p.responsibilities} /></Blk>
              <Blk title="주요 기능"><Bullets xs={p.features} /></Blk>
              <Blk title="Troubleshooting"><Stack spacing={1.5}>{p.troubleshooting.map(t => <Trouble key={t.issue} t={t} />)}</Stack></Blk>
              <Blk title="의의"><Typography><Rich text={p.meaning} /></Typography></Blk>
              <Blk title="개선점과 다음 계획"><Bullets xs={p.improvements} /></Blk>
              <Blk title="릴리즈 노트">
                <Box sx={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: '6px 14px' }}>
                  {p.logs.map(([d, t]) => <Fragment key={d}><Typography variant="body2" color="text.secondary">{d}</Typography><Typography variant="body2">{t}</Typography></Fragment>)}
                </Box>
              </Blk>
            </Stack>
          </Collapse>
          <Button fullWidth variant={open ? 'text' : 'contained'} sx={{ mt: 3 }} onClick={() => setOpen(o => !o)}
            endIcon={open ? <ExpandLessRounded /> : <ExpandMoreRounded />}>
            {open ? '접기' : `펼쳐서 보기 · 화면, 담당 업무, 트러블슈팅 ${p.troubleshooting.length}건`}
          </Button>
        </Paper>
      </Stack>
    </Section>
  )
}

function Node({ n: [t, s, key] }) {
  return (
    <Paper sx={{
      px: 2.5, py: 2, minWidth: 150, textAlign: 'center', borderWidth: key ? 2 : 1,
      borderColor: key ? 'primary.main' : 'divider', bgcolor: key ? 'action.hover' : 'background.paper',
    }}>
      <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 19 }, lineHeight: 1.3 }}>{t}</Typography>
      {s && <Typography color="text.secondary" sx={{ fontSize: { xs: 13, md: 15 }, mt: .5 }}>{s}</Typography>}
    </Paper>
  )
}

function Design() {
  const [i, setI] = useState(0)
  const d = diagrams[i]
  return (
    <Section id="design" title="구성도와 도메인 모델" eyebrow="Design">
      <Tabs value={i} onChange={(_, v) => setI(v)} variant="scrollable" sx={{ mb: 3 }}>
        {diagrams.map(x => <Tab key={x.title} label={x.title} sx={{ fontSize: 16 }} />)}
      </Tabs>
      <Typography sx={{ fontSize: 18, mb: 4 }}>{d.desc}</Typography>
      <Stack spacing={4}>
        {d.flows.map(f => (
          <Stack key={f.label} direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography variant="overline" color="primary" sx={{ width: 56, flexShrink: 0, fontSize: 14, fontWeight: 700 }}>{f.label}</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
              {f.nodes.map((n, k) => typeof n === 'string'
                ? <Stack key={k} sx={{ alignItems: 'center', color: 'text.secondary', minWidth: 40 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, minHeight: '1.2em' }}>{n}</Typography>
                    <ArrowForwardRounded fontSize="large" />
                  </Stack>
                : <Node key={k} n={n} />)}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Section>
  )
}

function Awards() {
  return (
    <Section id="awards" title="수상과 이전 프로젝트" eyebrow="Awards">
      <List disablePadding sx={{ mb: 4 }}>
        {awards.map(([d, name, sub, prize]) => (
          <Fragment key={name}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', py: 2 }}>
              <EmojiEventsRounded color="primary" fontSize="large" />
              <Typography color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>{d}</Typography>
              <Box sx={{ flex: 1 }}><Typography sx={{ fontWeight: 700, fontSize: 17 }}>{name}</Typography><Typography variant="body2" color="text.secondary">{sub}</Typography></Box>
              <Typography color="primary" sx={{ fontWeight: 800, fontSize: 20 }}>{prize}</Typography>
            </Stack>
            <Divider />
          </Fragment>
        ))}
      </List>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
        {olderProjects.map(o => (
          <Card key={o.title}><CardContent>
            <Typography variant="h6">{o.title}</Typography>
            <Typography variant="caption" color="text.secondary">{o.period} · {o.role}</Typography>
            <Typography sx={{ my: 1 }}>{o.summary}</Typography>
            <Box sx={{ fontSize: 14 }}><Bullets xs={o.points} /></Box>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .5, mt: 1.5 }}>{o.tech.map(t => <Chip key={t} label={t} size="small" />)}</Stack>
            {o.links.length > 0 && <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>{o.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}</Stack>}
          </CardContent></Card>
        ))}
      </Box>
    </Section>
  )
}

function SkillsContact() {
  return (
    <Section id="skills" title="기술 스택" eyebrow="Skills">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
        {skills.map(s => (
          <Card key={s.title}><CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>{s.title}</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75, mb: 1.5 }}>{s.items.map(t => <Chip key={t} label={t} color="primary" variant="outlined" size="small" />)}</Stack>
            <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
          </CardContent></Card>
        ))}
      </Box>
      <Paper sx={{ p: { xs: 3, md: 5 }, mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>함께 일할 기회를 찾고 있습니다</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Product 서버 개발 자리라면 편하게 연락 주세요.</Typography>
        <Stack direction="row" sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Button variant="contained" size="large" href={`mailto:${profile.email}`}>{profile.email}</Button>
          {profile.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}
        </Stack>
      </Paper>
    </Section>
  )
}

export default function App() {
  const wide = useMediaQuery(theme.breakpoints.up('md'))
  const main = useRef(null)
  const [active, setActive] = useState(SECTIONS[0][0])

  // 넓은 화면은 main이 스크롤 컨테이너다. 그 안에서 절반 넘게 보이는 섹션을 현재 위치로 본다
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { root: wide ? main.current : null, threshold: wide ? 0.5 : 0.25 })
    main.current.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [wide])

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  // 안쪽 스크롤 컨테이너라 #주소가 저절로 맞춰지지 않는다
  useEffect(() => { if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView() }, [])

  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <Box sx={{ display: 'flex', height: { md: '100dvh' } }}>
        {wide && (
          <Box component="nav" aria-label="목차" sx={{ width: 200, flexShrink: 0, borderRight: 1, borderColor: 'divider', py: 5, px: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 800, fontSize: 20, px: 1.5, mb: 3 }}>김윤서</Typography>
            <List disablePadding>
              {SECTIONS.map(([id, label]) => (
                <ListItemButton key={id} selected={active === id} onClick={() => go(id)}
                  sx={{ borderRadius: 2, mb: .5, '&.Mui-selected': { color: 'primary.main', fontWeight: 700 } }}>{label}</ListItemButton>
              ))}
            </List>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', px: 1.5 }}>{profile.email}</Typography>
          </Box>
        )}
        <Box component="main" ref={main} sx={{ flex: 1, minWidth: 0, overflowY: { md: 'auto' }, scrollSnapType: { md: 'y mandatory' } }}>
          {!wide && (
            <Box component="nav" sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={active} variant="scrollable" onChange={(_, v) => go(v)}>
                {SECTIONS.map(([id, label]) => <Tab key={id} value={id} label={label} />)}
              </Tabs>
            </Box>
          )}
          <Container maxWidth="xl" disableGutters>
            <Hero /><Experience wide={wide} /><Projects /><Design /><Awards /><SkillsContact />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
