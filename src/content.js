// data.js(기존 아티팩트에서 옮긴 경력, 프로젝트, 기술) 밖의 정적 내용

export const profile = {
  name: '김윤서',
  roles: ['Server Developer (Product)', '도메인 설계부터 운영까지', '근거로 판단하는 개발자'],
  tagline: '일상 속 불편을 찾고 근거 기반으로 하나씩 해결하는 개발자입니다.',
  bio: '문제를 분석해 설계하고, AI 에이전트로 빠르게 구현하고 검증하며, 사용자 반응을 직접 관측해 개선 사이클과 자동화를 점진적으로 쌓아 온 서버 개발자입니다.',
  stats: [
    ['1.1만 명', 'SaveEats 활성 사용자'],
    ['+17%', 'A/B 링크 클릭률'],
    ['1.9초 → 16ms', 'API 응답'],
    ['3등', '2026 우아한바톤'],
  ],
  // 핵심 역량 세 장. PDF가 나오면 이 배열만 갈아 끼운다
  summary: [
    { label: '문제 정의', head: '불편을 서비스로', text: '배달앱마다 다른 할인과 과장된 금액을 불편으로 정의하고, 브랜드별 실제 할인 금액을 보여 주는 서비스로 **1.1만 명**의 활성 사용자를 모았습니다.' },
    { label: '설계와 운영', head: '책임은 도메인에, 장애는 구조로', text: '흩어진 할인 판정을 **도메인 모델로 응집**하고 수집을 자동화했습니다. 누락 장애 뒤 교차 검증과 모니터링으로 **재발을 막았습니다.**' },
    { label: '근거와 개선', head: '숫자로 판단하고 개선', text: 'A/B 테스트로 링크 클릭률 **+17%**, 재방문율 **+12%**. 이벤트 로그를 증분 읽기로 바꿔 API 응답을 **1.9초에서 16ms**로 줄였습니다.' },
  ],
  info: [
    ['학력', '성공회대학교 소프트웨어공학과', '2017. 02 ~ 2026. 02'],
    ['교육', '우아한테크코스 8기, (주)우아한형제들', '2026. 02 ~ 2026. 10'],
    ['자격', '정보처리기사', '2022. 11'],
    ['병역', '육군 병장 만기전역', '2023. 09 ~ 2025. 03'],
    ['관심 분야', 'Product 서버, 도메인 설계, 운영', ''],
    ['위치', '경기 고양시', ''],
  ],
  email: 'jkllhgb@gmail.com',
  links: [['GitHub', 'https://github.com/nn98'], ['Velog', 'https://velog.io/@nn98']],
}

// 기술 스택: 분야마다 한 줄 핵심 문구와 도구
export const skillGroups = [
  { title: 'Backend', head: '도메인 중심으로 API를 설계합니다', items: ['Java 17 / 21', 'Spring Boot', 'JPA', 'MySQL'] },
  { title: '수집 자동화', head: '공개 API가 없어도 데이터로 만듭니다', items: ['Python', 'ADB', 'uiautomator'] },
  { title: 'Infra', head: '서버 1대로 무중단 배포와 자동 롤백', items: ['GitHub Actions', 'Linux', 'systemd', 'nginx', 'Vercel'] },
  { title: '데이터와 실험', head: '판정 기준을 먼저 정하고 다시 셉니다', items: ['이벤트 원장', 'PostHog', 'GA4', 'A/B 테스트'] },
  { title: 'Web', head: '화면까지 만들어 반응을 직접 봅니다', items: ['React', 'Vite'] },
  { title: 'AI Tools', head: '구현은 위임하고 검증은 직접', items: ['Claude Code', 'MCP', '훅', '서브에이전트'] },
]

export const awards = [
  ['2026. 07', '2026 우아한바톤 (해커톤, 우아한형제들)', 'Turbom · 서버/인프라', '3등'],
  ['2022. 10', '제13회 IT&미디어콘텐츠 경진대회 (성공회대학교)', 'Solved.SKHU · 팀장, 백엔드', '은상, 인기상'],
  ['2019. 04', '제11회 SW 경진대회 (성공회대학교)', 'Monity · 팀장, 풀스택', '동상'],
]

export const olderProjects = [
  { title: 'MindBridge', period: '2025. 08 ~', role: '백엔드', summary: '채팅 기반 정신 건강 위험 신호 식별 서비스',
    points: ['Spring Boot 3 REST API와 계층 구조 설계', 'JWT를 HttpOnly 쿠키와 Bearer 헤더로 함께 받는 무상태 인증 필터', 'Google, Kakao OAuth를 한 흐름으로 통합', '전역 Advice로 오류를 RFC 7807 ProblemDetail로 표준화'],
    tech: ['Spring Boot 3', 'Spring Security', 'OAuth'], links: [] },
  { title: 'Solved.SKHU', period: '2022. 03 ~ 2022. 10', role: '팀장, 기획, 백엔드', summary: '백준 풀이 데이터로 문제 추천과 랭킹을 주는 교내 프로그래밍 저지 서포터',
    points: ['교내 경진대회 은상, 인기상'], tech: ['Node.js', 'MySQL', 'Oracle Cloud'],
    links: [['GitHub', 'https://github.com/nn98/Solved.SKHU'], ['서비스', 'https://sol-skhu.vercel.app/']] },
  { title: 'Monity', period: '2018. 11 ~ 2019. 04', role: '팀장, 풀스택', summary: '강의실 PC 상태와 수업 현황을 모니터링하는 앱',
    points: ['Android 클라이언트, Node.js 서버 개발과 운영', '교내 SW 경진대회 동상'], tech: ['Android', 'Java', 'Node.js', 'MySQL'],
    links: [['GitHub', 'https://github.com/nn98/SW_Competition_2019']] },
]

// 구성도: 핵심 흐름만. 한 줄(flow)은 노드와 화살표 라벨이 번갈아 온다
export const diagrams = [
  { title: 'SaveEats 시스템 구성', desc: '공개 API가 없어 실제 폰 화면을 읽어 수집하고, 검증을 통과한 결과만 서버 1대가 내보냅니다.',
    flows: [
      { label: '수집', nodes: [['배달앱 4사', '실제 폰 화면'], 'ADB', ['수집기', 'Python'], '', ['누락 방어 가드', '모르면 내리지 않음', true], 'JSON', ['API 서버', 'Spring Boot · 1대', true], '', ['웹', 'React · Vercel']] },
      { label: '관측', nodes: [['사용자 클릭', '앱 이동'], '', ['JSONL 이벤트 원장', '증분 읽기', true], '', ['A/B 판정', '원장으로 재집계']] },
      { label: '배포', nodes: [['GitHub Actions', ''], '', ['버전 파일 + 링크 교체', '', true], '실패 시', ['자동 롤백', '헬스체크 30초']] },
    ] },
  { title: 'SaveEats 할인 판정 모델', desc: '판정표 한 파일을 서버(Java)와 프론트(JS) 테스트가 함께 읽어, 두 언어의 판정이 어긋나지 않게 합니다.',
    flows: [
      { label: '도메인', nodes: [['OfferRecord', 'amountAsOf(시각) → 대표 금액', true], '1 : N', ['DiscountTier', '할인 구간, cap']] },
      { label: '검증', nodes: [['판정표 JSON', '확실도 × 종류 × 품절 = 40행', true], '읽음', ['Java 테스트', 'OfferComparisonTest'], '같은 표', ['JS 테스트', 'filters.test.js']] },
    ] },
  { title: 'Turbom 도메인 모델', desc: '인허가 데이터를 자리, 물건, 임차 이력으로 조립하고, 동시 영업이 보이면 물건을 나눕니다.',
    flows: [
      { label: '조립', nodes: [['행안부 인허가', '158만 행'], '적재', ['Site 자리', '지번, 좌표', true], '1 : N', ['Unit 물건', '', true], '1 : N', ['Tenancy 임차 이력', '상호, 업종, 기간', true]] },
      { label: '분리', nodes: [['같은 기간 다른 상호', '동시 영업'], '증거', ['OccupancySpan', '', true], '', ['Unit 분리', '1개 → 1,488개']] },
    ] },
]
