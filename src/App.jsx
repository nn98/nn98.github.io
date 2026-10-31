import { useCallback, useEffect, useRef, useState, Fragment } from 'react'
import {
  Avatar, Box, Button, Card, CardActionArea, Chip, Collapse, CssBaseline, Divider, Link,
  List, ListItemButton, Paper, Stack, Tab, Tabs, ThemeProvider, Typography, createTheme, useMediaQuery,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded'
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded'
import { experiences, projects, IMG } from './data.js'
import { profile, awards, olderProjects, diagrams, skillGroups, projectResume, woowaResume } from './content.js'

// 이력서 PDF 문구를 기존 데이터에 덮어 합친다
const exps = experiences.map(e => e.title.startsWith('우아한테크코스') ? { ...e, ...woowaResume } : e)
const projs = projects.map(p => ({ ...p, ...projectResume[p.title] }))

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
    h3: { fontWeight: 800, letterSpacing: '-0.02em' }, h4: { fontWeight: 700 }, h5: { fontWeight: 700 }, h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { wordBreak: 'keep-all', overflowWrap: 'break-word', overscrollBehavior: 'none' },
      'h1, h2, h3, h4, h5, h6': { textWrap: 'balance' },
      'p, li': { textWrap: 'pretty' },
      '*': { scrollbarWidth: 'thin', scrollbarColor: 'rgba(128,128,128,.35) transparent' },
      '*::-webkit-scrollbar': { width: 8, height: 8 },
      '*::-webkit-scrollbar-track': { background: 'transparent' },
      '*::-webkit-scrollbar-thumb': { background: 'rgba(128,128,128,.35)', borderRadius: 8, border: '2px solid transparent', backgroundClip: 'content-box' },
      '*::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(128,128,128,.6)' },
      '*::-webkit-scrollbar-corner': { background: 'transparent' } } },
    MuiPaper: { defaultProps: { variant: 'outlined' } },
    MuiCard: { defaultProps: { variant: 'outlined' } },
  },
})

const SECTIONS = [
  ['profile', 'Profile'], ['experience', 'Experience'], ['projects', 'Projects'], ['design', 'Design'],
  ['awards', 'Awards'], ['skills', 'Skills & Contact'],
]

// 넓게 띄운 카드 격자: 칸이 좁아 글자가 잘리지 않게 최소 폭을 둔다
const grid = (min, gap = 2) => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`, gap })
const soft = t => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.14 : 0.07)

// **굵게**, `코드`, [글자](주소) 표기를 그대로 살려 그린다
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/).map((p, i) =>
    p.startsWith('[') ? <Link key={i} href={p.slice(p.indexOf('](') + 2, -1)} target="_blank" rel="noopener">{p.slice(1, p.indexOf(']('))}</Link>
    : p.startsWith('**') ? <Box key={i} component="strong" sx={{ color: 'primary.main', fontWeight: 700 }}>{p.slice(2, -2)}</Box>
      : p.startsWith('`') ? <Box key={i} component="code" sx={{ fontFamily: 'ui-monospace, monospace', fontSize: '.9em', px: .5, borderRadius: 1, bgcolor: 'action.hover' }}>{p.slice(1, -1)}</Box>
        : p)
}

// 큰 숫자 + 설명. 강조색 면만 쓰고 테두리는 두지 않는다
function Stat({ n, l, big }) {
  return (
    <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: '16px', bgcolor: soft }}>
      <Typography color="primary" sx={{ fontWeight: 800, fontSize: big ? { xs: 26, md: 34 } : { xs: 22, md: 28 }, lineHeight: 1.15, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{n}</Typography>
      <Typography color="text.secondary" sx={{ mt: .75, fontSize: 14 }}>{l}</Typography>
    </Box>
  )
}

function Section({ id, title, eyebrow, children }) {
  return (
    <Box component="section" id={id} sx={{
      height: 'var(--page-h, 100dvh)', display: 'flex', flexDirection: 'column',
      py: { xs: 3, md: 5 }, px: { xs: 2, md: 6 }, maxWidth: 1400, mx: 'auto', width: '100%',
    }}>
      {title && <Stack direction="row" spacing={1.5} sx={{ alignItems: 'baseline', mb: 3, flexShrink: 0 }}>
        <Typography variant="h3" component="h2" sx={{ fontSize: { xs: 28, md: 36 } }}>{title}</Typography>
        <Typography variant="overline" color="text.secondary">{eyebrow}</Typography>
      </Stack>}
      {/* 화면 한 장에 들어가지 않는 내용은 섹션 안에서 스크롤. 넘김 스크립트가 data-scroll을 보고 판단한다 */}
      <Box data-scroll sx={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', pr: { md: 1 } }}>{children}</Box>
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
      <Stack spacing={4} sx={{ minHeight: '100%', justifyContent: 'center' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.1fr 1fr' }, gap: 4, alignItems: 'center' }}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Avatar src={IMG.profile} alt="김윤서 프로필 사진" sx={{ width: { xs: 96, md: 128 }, height: { xs: 96, md: 128 } }} />
              <Box>
                <Chip label="현재 구직 중" color="primary" size="small" variant="outlined" sx={{ mb: 1 }} />
                <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 60 } }}>{profile.name}</Typography>
                <Typography variant="h5" color="primary" sx={{ minHeight: '1.5em', fontWeight: 600, fontSize: { xs: 19, sm: 24 } }}>{profile.roles[r]}</Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, lineHeight: 1.45 }}>{profile.tagline}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: 16 }}>{profile.bio}</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {profile.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}
              <Button size="small" variant="contained" href={`mailto:${profile.email}`}>{profile.email}</Button>
              <Button size="small" variant="outlined" href={`tel:${profile.phone}`}>{profile.phone}</Button>
              <Button size="small" variant="outlined" href="#print">PDF 버전</Button>
            </Stack>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
            {profile.stats.map(([n, l]) => <Stat key={l} n={n} l={l} big />)}
          </Box>
        </Box>
        <Box sx={grid(280)}>
          {profile.summary.map(s => (
            <Paper key={s.label} sx={{ p: 3 }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>{s.label}</Typography>
              <Typography sx={{ fontSize: 19, fontWeight: 700, mb: 1 }}>{s.head}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 15, lineHeight: 1.7 }}><Rich text={s.text} /></Typography>
            </Paper>
          ))}
        </Box>
        <Box sx={grid(170, 1.5)}>
          {profile.info.map(([k, v, d]) => (
            <Box key={k} sx={{ borderTop: 1, borderColor: 'divider', pt: 1 }}>
              <Typography variant="caption" color="text.secondary">{k}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{v}</Typography>
              {d && <Typography variant="caption" color="text.secondary">{d}</Typography>}
            </Box>
          ))}
        </Box>
      </Stack>
    </Section>
  )
}

function Experience({ wide }) {
  const [i, setI] = useState(0)
  const e = exps[i]
  return (
    <Section id="experience" title="경력 & 활동" eyebrow="Experience">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Tabs orientation={wide ? 'vertical' : 'horizontal'} variant="scrollable" value={i} onChange={(_, v) => setI(v)}
          sx={{ minWidth: { md: 240 }, borderRight: { md: 1 }, borderColor: { md: 'divider' }, flexShrink: 0 }}>
          {exps.map(x => <Tab key={x.title} sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            label={<Box><Typography sx={{ fontWeight: 700 }}>{x.title}</Typography><Typography variant="caption" color="text.secondary">{x.period}</Typography></Box>} />)}
        </Tabs>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Chip label={e.type} size="small" color="primary" variant="outlined" />
          {e.headline && <Typography color="primary" sx={{ mt: 1.5, fontWeight: 700 }}>{e.headline}</Typography>}
          <Typography variant="h4" sx={{ mt: e.headline ? .5 : 1.5, fontSize: { xs: 24, md: 30 } }}>{e.title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {e.role} · <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{e.period}</Box>{e.link && <> · <Link href={e.link} target="_blank" rel="noopener">학습 저장소</Link></>}
          </Typography>
          {e.overview && <Box sx={{ mb: 2.5, fontSize: 16, lineHeight: 1.75 }}><Bullets xs={e.overview} /></Box>}
          {e.details ? <Box sx={grid(320)}>{e.details.map(d => <Detail key={d[0]} d={d} />)}</Box> : <Box sx={grid(320)}>
            {e.desc.map(d => {
              // "책임 분리: ..." 처럼 앞에 붙은 주제어를 카드 제목으로 올린다
              const m = d.match(/^([^:]{2,12}): (.*)$/)
              return (
                <Paper key={d} sx={{ p: 2.5 }}>
                  {m && <Typography color="primary" sx={{ fontWeight: 700, mb: .75 }}>{m[1]}</Typography>}
                  <Typography sx={{ fontSize: 15, lineHeight: 1.7 }}><Rich text={m ? m[2] : d} /></Typography>
                </Paper>
              )
            })}
          </Box>}
        </Box>
      </Stack>
    </Section>
  )
}

// [제목, 문장, 링크?] 카드. 링크가 있으면 제목을 누른다
function Detail({ d: [k, v, u] }) {
  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography color="primary" sx={{ fontWeight: 700, mb: .75 }}>
        {u ? <Link href={u} target="_blank" rel="noopener" underline="hover">{k} ↗</Link> : k}
      </Typography>
      <Typography sx={{ fontSize: 15, lineHeight: 1.7 }}><Rich text={v} /></Typography>
    </Paper>
  )
}

function Blk({ title, children }) {
  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ mb: 1.25, fontSize: 18 }}>{title}</Typography>
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
  const p = projs[i]
  const pick = n => { setI(n); setOpen(false) }
  return (
    <Section id="projects" title="프로젝트" eyebrow="Projects">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Stack spacing={1.5} sx={{ width: { xs: '100%', md: 260 }, flexShrink: 0, position: { md: 'sticky' }, top: 0 }}>
          {projs.map((x, n) => (
            <Card key={x.title} sx={{ borderColor: n === i ? 'primary.main' : undefined, borderWidth: n === i ? 2 : 1 }}>
              <CardActionArea onClick={() => pick(n)} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1.5, p: 1.5 }}>
                <Box component="img" src={IMG[x.shots[0][0]]} alt="" sx={{ width: 56, height: 56, objectFit: 'cover', objectPosition: 'top', borderRadius: 2, flexShrink: 0 }} />
                <Box><Typography sx={{ fontWeight: 700 }}>{x.title}</Typography><Typography variant="body2" color="text.secondary">{x.summary}</Typography></Box>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {p.headline && <Typography color="primary" sx={{ fontWeight: 700, fontSize: 17 }}>{p.headline}</Typography>}
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 38 } }}>{p.title}</Typography>
          <Typography sx={{ fontSize: 19, fontWeight: 600 }}>{p.summary}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>{p.period} · {p.team}</Typography>
          {p.overview && <Typography sx={{ mt: 1 }}>{p.overview}</Typography>}
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 1.5 }}>{p.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}</Stack>
          <Box sx={{ ...grid(210), my: 3 }}>{p.metrics.map(([n, l]) => <Stat key={l} n={n} l={l} />)}</Box>
          <Typography sx={{ fontSize: 16, lineHeight: 1.75 }}><Rich text={p.description} /></Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75, mt: 2 }}>{p.tech.map(t => <Chip key={t} label={t} size="small" />)}</Stack>
          {p.highlights && <Box sx={{ mt: 3, p: { xs: 2, md: 3 }, borderRadius: '16px', bgcolor: soft }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>핵심</Typography>
            <Box sx={{ fontSize: 16, lineHeight: 1.75 }}><Bullets xs={p.highlights} /></Box>
          </Box>}

          {/* 기본은 접어 두고 필요할 때 펼친다 */}
          <Collapse in={open}>
            <Stack spacing={4} sx={{ mt: 4 }}>
              {p.goal && <Box sx={grid(320, 3)}>
                <Blk title="목표"><Bullets xs={p.goal} /></Blk>
                <Blk title="시도"><Bullets xs={p.attempt} /></Blk>
              </Box>}
              {p.details && <Blk title="상세">
                <Box sx={grid(320, 1.5)}>{p.details.map(d => <Detail key={d[0]} d={d} />)}</Box>
              </Blk>}
              <Blk title="화면">
                <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1 }}>
                  {p.shots.map(([k, c]) => <Box key={k} component="figure" sx={{ m: 0, flexShrink: 0 }}>
                    <Box component="img" src={IMG[k]} alt={c} loading="lazy" sx={{ height: 360, borderRadius: 2, border: 1, borderColor: 'divider' }} />
                    <Typography component="figcaption" variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 220 }}>{c}</Typography>
                  </Box>)}
                </Stack>
              </Blk>
              <Box sx={grid(320, 3)}>
                <Blk title="개발 배경"><Typography><Rich text={p.background} /></Typography></Blk>
                <Blk title="담당 업무"><Typography color="text.secondary" sx={{ mb: 1 }}>{p.role}</Typography><Bullets xs={p.responsibilities} /></Blk>
              </Box>
              <Blk title="주요 기능"><Bullets xs={p.features} /></Blk>
              <Blk title="Troubleshooting"><Box sx={grid(420, 1.5)}>{p.troubleshooting.map(t => <Trouble key={t.issue} t={t} />)}</Box></Blk>
              <Box sx={grid(320, 3)}>
                <Blk title="의의"><Typography><Rich text={p.meaning} /></Typography></Blk>
                <Blk title="개선점과 다음 계획"><Bullets xs={p.improvements} /></Blk>
              </Box>
              <Blk title="릴리즈 노트">
                <Box sx={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: '6px 14px' }}>
                  {p.logs.map(([d, t]) => <Fragment key={d}><Typography variant="body2" color="text.secondary">{d}</Typography><Typography variant="body2">{t}</Typography></Fragment>)}
                </Box>
              </Blk>
            </Stack>
          </Collapse>
          <Button fullWidth variant={open ? 'text' : 'contained'} sx={{ mt: 3 }} onClick={() => setOpen(o => !o)}
            endIcon={open ? <ExpandLessRounded /> : <ExpandMoreRounded />}>
            {open ? '접기' : `펼쳐서 보기 · 목표와 시도, 상세, 화면, 트러블슈팅 ${p.troubleshooting.length}건`}
          </Button>
        </Box>
      </Stack>
    </Section>
  )
}

function Node({ n: [t, s, key] }) {
  return (
    <Box sx={{
      px: 2.5, py: 2, minWidth: 150, textAlign: 'center', borderRadius: '16px',
      border: key ? 2 : 1, borderColor: key ? 'primary.main' : 'divider', bgcolor: key ? soft : 'background.paper',
    }}>
      <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 19 }, lineHeight: 1.3 }}>{t}</Typography>
      {s && <Typography color="text.secondary" sx={{ fontSize: { xs: 13, md: 15 }, mt: .5 }}>{s}</Typography>}
    </Box>
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
            {/* 좁은 화면은 세로로 쌓고 화살표를 아래로 돌린다. 줄바꿈으로 화살표만 남는 일이 없다 */}
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ flexWrap: { md: 'wrap' }, alignItems: { xs: 'stretch', md: 'center' }, gap: 1 }}>
              {f.nodes.map((n, k) => typeof n === 'string'
                ? <Stack key={k} direction={{ xs: 'row-reverse', md: 'column' }} sx={{ alignItems: 'center', justifyContent: 'center', gap: { xs: 1, md: 0 }, color: 'text.secondary', minWidth: 40 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, minHeight: '1.2em', minWidth: { xs: 40, md: 0 } }}>{n}</Typography>
                    <ArrowForwardRounded fontSize="large" sx={{ rotate: { xs: '90deg', md: '0deg' } }} />
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
              <EmojiEventsRounded color="primary" fontSize="large" sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Typography color="text.secondary" sx={{ width: 80, flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>{d}</Typography>
              <Box sx={{ flex: 1 }}><Typography variant="caption" color="text.secondary" sx={{ display: { sm: 'none' } }}>{d}</Typography><Typography sx={{ fontWeight: 700, fontSize: 17 }}>{name}</Typography><Typography variant="body2" color="text.secondary">{sub}</Typography></Box>
              <Typography color="primary" sx={{ fontWeight: 800, fontSize: { xs: 17, sm: 20 }, textAlign: 'right', flexShrink: 0, maxWidth: '30%' }}>{prize}</Typography>
            </Stack>
            <Divider />
          </Fragment>
        ))}
      </List>
      <Box sx={grid(300)}>
        {olderProjects.map(o => (
          <Paper key={o.title} sx={{ p: 2.5 }}>
            <Typography variant="h6">{o.title}</Typography>
            <Typography variant="caption" color="text.secondary">{o.period} · {o.role}</Typography>
            <Typography sx={{ my: 1 }}>{o.summary}</Typography>
            <Box sx={{ fontSize: 14 }}><Bullets xs={o.points} /></Box>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .5, mt: 1.5 }}>{o.tech.map(t => <Chip key={t} label={t} size="small" />)}</Stack>
            {o.links.length > 0 && <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>{o.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}</Stack>}
          </Paper>
        ))}
      </Box>
    </Section>
  )
}

function SkillsContact() {
  return (
    <Section id="skills" title="기술 스택" eyebrow="Skills">
      <Box sx={grid(300)}>
        {skillGroups.map(s => (
          <Box key={s.title} sx={{ p: 3, borderRadius: '16px', bgcolor: soft }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>{s.title}</Typography>
            <Typography sx={{ fontSize: 19, fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}>{s.head}</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75 }}>{s.items.map(t => <Chip key={t} label={t} size="small" sx={{ bgcolor: 'background.paper' }} />)}</Stack>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 5, py: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>함께 일할 기회를 찾고 있습니다</Typography>
        <Stack direction="row" sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Button variant="contained" size="large" href={`mailto:${profile.email}`}>{profile.email}</Button>
          <Button variant="outlined" size="large" href={`tel:${profile.phone}`}>{profile.phone}</Button>
          <Button variant="outlined" size="large" href="#print">PDF 버전</Button>
          {profile.links.map(([l, u]) => <ExtLink key={l} href={u}>{l}</ExtLink>)}
        </Stack>
      </Box>
    </Section>
  )
}

// 풀페이지 넘김: SaveEats /about과 같은 방식. 기본 스크롤 대신 휠, 스와이프, 키 방향을 받아
// 트랙을 transform으로 한 장씩 옮긴다(합성 단계에서만 돌아 버벅이지 않는다).
// 섹션 안 스크롤이 그 방향으로 더 내려갈 수 있으면 안쪽 스크롤에 양보한다
// 첫 휠에 튕기며 강조되고, 한 번 더 굴리면 넘어간다는 신호
function PageArrow({ dir, hint, onClick }) {
  const on = Math.sign(hint) === dir
  return (
    <Box component="button" key={on ? hint : 0} aria-label={dir > 0 ? '다음 섹션' : '이전 섹션'} onClick={onClick} sx={{
      position: 'absolute', left: '50%', [dir > 0 ? 'bottom' : 'top']: 12, transform: 'translateX(-50%)', border: 0,
      bgcolor: on ? 'primary.main' : 'transparent', color: on ? 'primary.contrastText' : 'text.secondary',
      borderRadius: '50%', width: 44, height: 44, cursor: 'pointer', display: 'grid', placeItems: 'center',
      transition: 'background-color .2s, color .2s',
      animation: on ? 'nudge .7s cubic-bezier(.3,1.6,.5,1) 2' : 'none',
      '@keyframes nudge': { '0%,100%': { translate: '0 0' }, '40%': { translate: `0 ${dir * 10}px` } },
      '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
    }}>{dir > 0 ? <KeyboardArrowDownRounded fontSize="large" /> : <KeyboardArrowUpRounded fontSize="large" />}</Box>
  )
}

function usePager(box, track, enabled) {
  const [cur, setCur] = useState(0)
  // hint: 첫 휠에 화살표를 튕길 방향(부호). 값이 바뀌어야 애니메이션이 다시 돈다
  const [hint, setHint] = useState(0)
  const st = useRef({ cur: 0, busy: false, acc: 0, y0: null, inner: null, t: 0, fired: false, arm: 0, n: 0, ht: 0 })
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = useCallback(i => {
    const s = st.current, n = track.current?.children.length ?? 1
    i = Math.min(n - 1, Math.max(0, i))
    if (i === s.cur || s.busy) return
    s.cur = i; s.busy = true; setCur(i)
    s.arm = 0; clearTimeout(s.ht); setHint(0)
    setTimeout(() => { s.busy = false }, reduce ? 50 : 650)
  }, [track, reduce])

  useEffect(() => {
    const el = box.current
    if (!enabled || !el) return
    const s = st.current
    const canInner = (t, dir) => {
      const inner = t.closest?.('[data-scroll]')
      if (!inner || inner.scrollHeight <= inner.clientHeight + 1) return false
      return dir > 0 ? inner.scrollTop + inner.clientHeight < inner.scrollHeight - 1 : inner.scrollTop > 0
    }
    const wheel = e => {
      if (e.ctrlKey) return
      const dir = Math.sign(e.deltaY)
      if (canInner(e.target, dir)) { s.acc = 0; return }
      e.preventDefault()
      // 250ms 넘게 끊기면 새 휠 동작으로 친다. 트랙패드 관성은 한 동작으로 묶인다
      if (e.timeStamp - s.t > 250) { s.acc = 0; s.fired = false }
      s.t = e.timeStamp
      if (s.busy || s.fired) return
      s.acc += e.deltaY
      if (Math.abs(s.acc) < 40) return
      s.fired = true
      const d = Math.sign(s.acc)
      // 올라갈 땐 바로 넘긴다. 내려갈 땐 첫 동작에 화살표만 튕기고, 2.5초 안에 한 번 더 굴리면 넘긴다
      if (d < 0 || s.arm === d) return go(s.cur + d)
      s.arm = d; setHint(d * ++s.n)
      clearTimeout(s.ht); s.ht = setTimeout(() => { s.arm = 0; setHint(0) }, 2500)
    }
    // 터치는 시작할 때 안쪽 스크롤이 끝에 닿아 있었는지를 본다
    const ts = e => { s.y0 = e.touches[0].clientY; s.inner = { 1: canInner(e.target, 1), '-1': canInner(e.target, -1) } }
    const te = e => {
      if (s.y0 === null) return
      const dy = s.y0 - e.changedTouches[0].clientY; s.y0 = null
      if (Math.abs(dy) > 40 && !s.inner[Math.sign(dy)]) go(s.cur + Math.sign(dy))
    }
    const key = e => {
      const d = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }[e.key]
      if (d && !canInner(document.activeElement, d)) { e.preventDefault(); go(s.cur + d) }
    }
    // overflow: hidden이어도 #주소 이동이나 포커스가 main을 스크롤하면 transform과 겹쳐 밀린다
    const pin = () => { if (el.scrollTop) el.scrollTop = 0 }
    pin(); el.addEventListener('scroll', pin)
    el.addEventListener('wheel', wheel, { passive: false })
    el.addEventListener('touchstart', ts, { passive: true })
    el.addEventListener('touchend', te)
    addEventListener('keydown', key)
    return () => { el.removeEventListener('scroll', pin); el.removeEventListener('wheel', wheel); el.removeEventListener('touchstart', ts); el.removeEventListener('touchend', te); removeEventListener('keydown', key) }
  }, [box, enabled, go])

  return [cur, go, hint]
}

export default function App() {
  const wide = useMediaQuery(theme.breakpoints.up('md'))
  const main = useRef(null)
  const track = useRef(null)
  const [cur, go, hint] = usePager(main, track, true)
  const [h, setH] = useState(0)

  useEffect(() => {
    // 크기가 바뀌면 다시 그려 섹션 위치(offsetTop)를 새로 읽는다
    const fit = () => setH(main.current?.clientHeight ?? 0)
    fit(); addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [])

  // #주소로 들어오면 그 섹션부터
  useEffect(() => {
    const i = SECTIONS.findIndex(([id]) => '#' + id === location.hash)
    if (i > 0) go(i)
  }, [go])

  const active = SECTIONS[cur][0]
  const jump = id => go(SECTIONS.findIndex(([x]) => x === id))

  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100dvh' }}>
        {wide && (
          <Box component="nav" aria-label="목차" sx={{ width: 200, flexShrink: 0, borderRight: 1, borderColor: 'divider', py: 5, px: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 800, fontSize: 20, px: 1.5, mb: 3 }}>김윤서</Typography>
            <List disablePadding>
              {SECTIONS.map(([id, label]) => (
                <ListItemButton key={id} selected={active === id} onClick={() => jump(id)}
                  sx={{ borderRadius: 2, mb: .5, '&.Mui-selected': { color: 'primary.main', fontWeight: 700 } }}>{label}</ListItemButton>
              ))}
            </List>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', px: 1.5 }}>{cur + 1} / {SECTIONS.length}</Typography>
          </Box>
        )}
          {!wide && (
            <Box component="nav" sx={{ flexShrink: 0, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={active} variant="scrollable" onChange={(_, v) => jump(v)}>
                {SECTIONS.map(([id, label]) => <Tab key={id} value={id} label={label} />)}
              </Tabs>
            </Box>
          )}
        {/* 섹션 높이는 main 높이를 따른다. 좁은 화면은 위 탭을 뺀 높이 */}
        <Box component="main" ref={main} style={{ '--page-h': h ? h + 'px' : undefined }} sx={{ flex: 1, minWidth: 0, minHeight: 0, position: 'relative', overflow: 'hidden', overscrollBehavior: 'none' }}>
          <Box ref={track} sx={{
            transform: `translate3d(0, ${-(h ? cur * h : track.current?.children[cur]?.offsetTop ?? 0)}px, 0)`, transition: 'transform .6s cubic-bezier(.22, .8, .3, 1)', willChange: 'transform',
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}>
            <Hero /><Experience wide={wide} /><Projects /><Design /><Awards /><SkillsContact />
          </Box>
          {wide && cur < SECTIONS.length - 1 && <PageArrow dir={1} hint={hint} onClick={() => go(cur + 1)} />}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
