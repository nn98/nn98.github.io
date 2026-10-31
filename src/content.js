// data.js(기존 아티팩트에서 옮긴 경력, 프로젝트, 기술) 밖의 정적 내용

export const profile = {
  name: '김윤서',
  roles: ['Server Developer (Product)', '도메인 설계부터 운영까지', '근거로 판단하는 개발자'],
  tagline: '일상 속 불편을 찾고 근거 기반으로 하나씩 해결하는 개발자입니다.',
  bio: '문제를 분석해 설계하고, AI 에이전트로 빠르게 구현하고 검증하며, 사용자 반응을 직접 관측해 개선 사이클과 자동화를 점진적으로 쌓아 온 서버 개발자입니다.',
  // 첫 화면에 내세우는 것: 운영 중인 서비스와 그 사용자 수. 나머지 수치는 프로젝트 소개에 둔다
  service: { name: 'SaveEats', desc: '배달앱 할인 정보 서비스', url: 'https://beggars-five.vercel.app' },
  users: ['1.1만 명', '프로젝트 SaveEats 활성 사용자'],
  // 핵심 역량 세 장. PDF가 나오면 이 배열만 갈아 끼운다
  summary: [
    { label: '문제 정의', head: '불편을 서비스로', text: '배달앱마다 상이한 할인과 과장된 할인 금액을 사용자의 불편으로 정의했습니다. 브랜드별 실제 할인 금액을 제공하는 서비스로 **1.1만 명**의 활성 사용자를 모았습니다.' },
    { label: '설계와 운영', head: '특성은 도메인에, 장애는 구조로', text: '서비스를 운영하며 파악한 할인 특성을 **도메인 모델로 정제**하고 수집을 자동화했습니다. 수집 누락 장애를 겪고 교차 검증과 모니터링을 적용해 **장애 재발을 방지**했습니다.' },
    { label: '근거와 개선', head: '숫자로 판단하고 개선', text: 'A/B 테스트로 핵심 지표인 사용자 링크 클릭률을 **17%**, 재방문율을 **12%** 높였습니다. 이벤트 로그를 증분 읽기로 바꿔 API 응답을 **1.9초에서 16ms 이하**로 줄였습니다.' },
  ],
  info: [
    ['학력', '성공회대학교(4년제) 소프트웨어공학과', '2017. 02 ~ 2026. 02'],
    ['교육', '우아한테크코스 8기, 우아한형제들', '2026. 02 ~'],
    ['자격', '정보처리기사', '한국산업인력공단 · 2022. 11'],
    ['병역', '육군 병장 만기전역', '2023. 09 ~ 2025. 03'],
    ['관심 분야', 'Product 서버, 도메인 설계, 운영', ''],
    ['위치', '경기 고양시', ''],
  ],
  email: 'jkllhgb@gmail.com',
  phone: '010-6450-7144',
  links: [['GitHub', 'https://github.com/nn98'], ['Velog', 'https://velog.io/@nn98']],
}

// 이력서 PDF(최종0, 2026-10-31)의 프로젝트 내용. data.js의 같은 제목 프로젝트에 합쳐 그린다
// 문장 속 [글자](주소)는 링크로, details의 세 번째 칸은 제목 링크로 그린다
const T = 'https://github.com/woowacourse-teams/2026-to-discount/blob/main/'
const NO = 'https://admitted-aardwolf-4a3.notion.site/'
const SPEC = 'https://github.com/nn98/turbom-spec/blob/main/%EC%9D%98%EC%82%AC%EA%B2%B0%EC%A0%95-%EA%B8%B0%EB%A1%9D.md'
const WC = 'https://github.com/woowacourse/'

export const projectResume = {
  SaveEats: {
    summary: '배달앱 할인 정보 서비스',
    headline: '결정과 근거, 실험과 검증',
    overview: '배달앱 4사(배달의민족, 쿠팡이츠, 요기요, 땡겨요) 브랜드 할인 종합/비교/제공. 서비스 기획, 도메인 설계, 서버 개발, 서비스 배포 담당.',
    team: '3인 팀, 커밋 1,515개, PR 69개 작성',
    highlights: [
      '기능 추가와 기술 도입 시 근거와 트레이드오프를 명확히 인지하고 개발',
      '앱마다 다른 할인 형식을 **도메인 모델로 추상화**, 객체가 스스로 계산',
      '할인 98 → 21건 누락 장애를 원인 4가지로 분해, **9단계 방어**로 재발 방지',
      '필요성이 확인될 때마다 개선, 자동 롤백에서 **무중단 배포**까지 점진적 구현',
      '화면 리뉴얼을 A/B 테스트, 링크 클릭률 **17%** / 재방문율 **12%** 향상',
      '로그 누적으로 1.9초까지 느려진 API를 직접 측정, 증분 읽기로 **8~16ms**로 단축',
      '스프린트마다 협업 규칙 점검 및 회고, 필요시 추가/수정/제거하며 **3차례 재정비**',
    ],
    tech: ['Java 17', 'Spring Boot 4.1', 'React 18', 'Python', 'GitHub Actions', 'Nginx', 'Vercel', 'PostHog'],
    goal: [
      '우아한테크코스에서 배운, 우테코의 기치에 맞는 서비스를 개발하고 싶었습니다.',
      '키워드나 경력을 위한 프로젝트가 아닌 실생활의 문제를 해결하고 싶었습니다.',
      '심리적 안전감 속에서 자유롭게 소통하고 피드백을 주고받으며 소프트 스킬을 강화하고 싶었습니다.',
    ],
    attempt: [
      '일상 속 불편을 기록하고 사용자 인터뷰와 소규모 프로토타입으로 서비스의 가능성을 확인했습니다.',
      '당일 할인 정보를 직접 모아 화면에 띄우고 [핫딜 커뮤니티에 공유](https://arca.live/b/hotdealhugi/178218753)하고 [사용자 반응](https://arca.live/b/hotdealhugi/178218753#comment)을 관측했습니다.',
      '구조/도메인/인프라 등 계획에 집착하는 대신 빠르게 만들고 부딪히고 개선하고 반복했습니다.',
      `진행한 [실험 내용](${NO}bf002d73d52483a3a10f812bc4af81d6)과 그 과정에서 배경/가설/대안/결정/검증/관측/결론/학습을 [기록](${NO}87802d73d5248367a59a81b56376f55f?v=3b602d73d524808084c3000cc08cfe4c)했습니다.`,
      '빠르게 구현하고 검증하되 좋은 코드와 완성도, 성능을 고려하고 리팩토링했습니다.',
      `팀원들이 공유하는 공통 목표를 설정하고 작은 [그라운드 룰](${NO}d9402d73d524823d857d01c773d7ea13)을 세워 가볍게 실천하고 회고했습니다.`,
      '짧은 기간으로 쪼개 팀원들과 피드백을 주고받고 협업 방식을 조금씩 개선했습니다.',
      '위 시도를 거치며 시행착오, 반복작업을 정리하고 작은 단위로 쪼개 에이전틱 워크플로우를 도입했습니다.',
    ],
    details: [
      ['객체 지향', `배달앱마다 할인 형식과 조건이 달랐습니다. 공통된 조건과 계약을 추상화하고, 서비스 로직에 유출된 실제 할인 금액 계산 로직을 [도메인 객체로 응집](${T}api/docs/decisions/ADR-010-domain-judges-representative-amount.md)했습니다.`, T + 'docs/incidents/2026-09-22-decision-table.md'],
      ['실패를 활용', '배달앱의 주기적 구조 변경으로 할인 정보 수집에 장애가 반복됐습니다. 장애에 당황하기보단 성공한 수집을 먼저 반영하고, 장애 원인을 분석해 해결책과 재발 방지책을 짜고 수집 로직의 허점을 찾아 점진적으로 견고한 코드를 만들었습니다. 문제 자체의 해결보다도 문제를 통해 무엇을 배우고 재발을 방지해 서비스 품질을 향상할지 고민했습니다.', T + 'docs/incidents/2026-09-21-sweep-loss.md'],
      ['필요할 때 한 단계씩', `배포 후 기동 실패 시 복구할 방법이 없어 **버저닝과 자동 롤백**을 구현했고, [엣지 리퀘스트 한도](${T}docs/CACHING-AND-ASSETS.md)가 임박해 캐시 헤더를 적용하고 요청 수를 대폭 줄였습니다. "알고 있어서"보단 "우리 문제를 가장 잘 해결해서"를 기술 도입의 근거로 삼았습니다.`, T + 'docs/incidents/2026-09-03-deploy-rollback-to-zero-downtime.md'],
      ['사용자 행동 관측과 실험', `화면 리뉴얼을 A/B 테스트해 [링크 클릭률을 17%, 재방문율을 12% 높였습니다](${T}docs/incidents/2026-10-17-home-ab.md). 사용자의 반응, 핵심 지표를 의사결정의 근거로 삼아 빠르게 협의하고 시도하고 피드백했습니다.`, T + 'docs/metrics/HOME-AB-LOG.md'],
      ['숨은 빈틈을 찾기', `백엔드 구조 점검 중 API 응답이 1.9초까지 느려진 것을 확인했습니다. 로그 누적이 원인임을 파악하고 읽은 바이트 위치를 기록하는 [증분 읽기를 적용해 8~16ms로 줄였습니다](${T}api/docs/decisions/ADR-011-event-log-incremental-read.md). 에이전트에 의존하더라도 직접 확인하고 의심하고 검증하는 책임을 포기하지 않았습니다.`, T + 'docs/incidents/2026-10-14-event-log-full-read.md'],
      ['공유하는 목표', '팀 공통의 목표를 명확히 설정해야 서로를 믿는 견고한 협업이 가능하다 합의했습니다. "사용자가 있는 서비스를 운영", "같이 일하고 싶은 사람이 되기"라는 개발적/개발외적 목표를 정하고 지치고 흔들릴 때마다 우리의 목표를 되새기며 원래의 방향성을 되찾았습니다.', T + 'docs/team/COLLABORATION.md'],
      ['감사와 회복탄력성', '우테코 소프트 스킬 강의를 참고해 의견 교류와 피드백에서 의식적으로 서로 감사하고, 고난이 찾아올 때도 혼자서 고민하기보단 팀원들과 소통하며 감정을 표현했습니다. 의식적으로 긍정과 교류를 반복하는 것이 결과적으로 자연스러운 긍정을 창출함을 확인했습니다.', NO + 'ss-req-40202d73d524805d842dc70eaa11ecf0'],
      ['워크플로우 자동화', '프로젝트 진행 과정에서 모은 재료를 바탕으로 에이전틱 워크플로우를 적용했습니다. 실험/트러블슈팅에서 관측된 시행착오/반복작업을 최소화하고, 생산성은 높이되 의도 부채는 최소화했습니다.', T + 'docs/design/119-dev-workflow-asbuilt.md'],
    ],
  },
  'Turbom (터봄)': {
    headline: '첫 해커톤, 새로운 경험',
    overview: '행정안전부 인허가 기반, 특정 주소(서울, 성남) 상가 개/폐업 이력 종합/시각화/제공. 서비스 기획, 도메인 설계, 서버 개발, 서비스 배포 담당.',
    team: '4인 팀, 2026 우아한바톤 3등',
    highlights: [
      '주최(배민스타트업스퀘어) 취지 및 특성 고려, 공공데이터/창업/자영업 주제 선정',
      '팀원 특성에 맞춰 업무 분장, 빠른 작업과 협업으로 해커톤에서 **배포까지** 진행',
      '지번/도로명/비정형 상세주소가 혼재된 인허가 정보를 본번/부번/층/호로 정규화, **자리/물건/임차 이력** 도메인 객체로 리모델링',
      '동일 기간/동일 주소에 다른 상호가 영업할 수 없음을 근거로 비정형 상세 주소로 잘못 묶인 가락시장 물건 1개를 **1,488개**로 분리',
      '도메인으로 파싱한 데이터를 무조건적으로 신뢰하지 않고 원본 주소를 다시 읽어 저장값을 감사, 대량 적재 뒤 빠진 교정을 찾아 불일치 **83,346건 → 102건**',
    ],
    tech: ['Java 21', 'Spring Boot 3.3', 'JPA', 'MySQL 8', 'React 19', 'TypeScript', 'Python', 'GitHub Actions'],
    goal: [
      '능동적으로, 짧은 기간 동안 빠르게 개발해 보고 싶었습니다.',
      'AI의 압도적 생산성을 적극적으로 활용해 보고 싶었습니다.',
      '새로운 사람과 새로운 경험을 해 보고 싶었습니다.',
    ],
    attempt: [
      '창업 아이템 탐색이라는 주최 취지에 맞춰 서비스 주제를 선정했습니다.',
      '처음 보는 팀원들과 적극적으로 친밀감을 쌓고 각자의 관심사와 강점을 파악해 역할을 분담했습니다.',
      '[행정안전부_인허가업소정보](https://www.data.go.kr/data/15153260/openapi.do) 158만 행을 자리, 물건, 임차 이력 도메인으로 조립했습니다.',
    ],
    details: [
      ['쓰기 전에 검사', '자기모순 데이터 **83,346건**을 찾고 교정했으며, 모순 데이터를 **102건**으로 줄였습니다.', SPEC + '#14-pnu-%EC%82%B0%EC%97%AC%EB%B6%80-%EC%B6%A9%EB%8F%8C-%EC%9E%AC%EB%B0%9C-%ED%99%95%EC%9D%B8--buildingid-%EC%9A%94%EC%B2%AD-%EB%B3%B4%EB%A5%98-2026-07-2122'],
      ['비정형 값으로 잘못 묶인 데이터 분리', '가락시장의 주소에 700여 개의 사업자가 신고돼 있었습니다. 층/호 정보를 상세주소에 넣은 것이 원인이었고, 상세주소를 파싱/분리해 서로 다른 주소로 분리했습니다.', SPEC + '#16-%EB%8C%80%ED%98%95-%EC%83%81%EA%B0%80%EC%8B%9C%EC%9E%A5-%EB%8F%99%EC%8B%9C%EC%98%81%EC%97%85-%EB%8B%A4%EB%A5%B8-%EC%83%81%ED%98%B8-%EB%AD%89%EC%B9%A8-%EB%B0%A9%EC%A7%80--unit-%EC%B6%A9%EB%8F%8C%EA%B0%90%EC%A7%80%EC%9E%AC%EB%B6%84%EB%A6%AC-2026-07-22'],
      ['단계별 점검과 빠른 확인', '도메인 로직을 추가하자 앞에서 분리한 가락시장 상가가 **0개**가 됐습니다. 주소에 층/호, 건물명이 없으면 위치 미특정으로 간주해 거르는 로직이 원인이었습니다. 각자의 담당 범위만 검토하지 말고 끝에서 끝까지 보는 확인이 필수적임을 배웠습니다.', SPEC + '#17-businesstype-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%9E%AC%EC%84%A4%EA%B3%84-%EB%B0%B0%ED%8F%AC-%EC%A7%81%ED%9B%84-%EB%A1%A4%EB%B0%B1--locationidentity%EC%99%80-unit-%EC%B6%A9%EB%8F%8C%EA%B0%90%EC%A7%80-%ED%86%B5%ED%95%A9-%EB%88%84%EB%9D%BD-2026-07-23'],
    ],
  },
}

// 우테코 경력 탭: 최종 PDF의 개요와 상세
export const woowaResume = {
  headline: '결정의 토대가 된 학습',
  period: '2026. 02 ~',
  overview: [
    '미션마다 사전 학습, 토론, 페어 프로그래밍, 피드백 활동을 반복하며 객체 지향과 클린코드 규칙을 세웠습니다.',
    '현직 리뷰어의 피드백을 받아 트레이드오프를 고민하고 결정하는 능력을 키웠습니다.',
    `[블랙잭](https://github.com/nn98/java-woowacourse-8/blob/main/level1/WEEK_02-03.md)과 [장기](${WC}java-janggi/pull/183) [미션](${WC}java-janggi/pull/316)에서 객체의 책임과 테스트 단위를, [방탈출](https://github.com/nn98/java-woowacourse-8/tree/main/level2) 미션에서 API와 트랜잭션의 경계를, [톰캣](https://github.com/nn98/java-http)/[MVC](https://github.com/nn98/java-mvc)/[JDBC](https://github.com/nn98/java-jdbc) 미션에서 프레임워크의 내부 구현 구조를 다루며 지식과 판단 기준을 넓혔습니다.`,
  ],
  details: [
    ['책임 분리', '한 클래스가 두 역할을 맡고 있다는 리뷰를 받고, 공통 필드만 있고 공통 로직은 없는 두 개념을 각자의 책임에 맞게 분리했습니다. 상속과 조합의 차이를 배우고 상황에 맞춰 적용했습니다.', WC + 'java-blackjack/pull/989#discussion_r2899900922'],
    ['원칙 검증', 'TDA 원칙을 의심하고 실험하고 확인하며 당연한 원칙을 직접 검증했습니다.', 'https://velog.io/@nn98/%EC%9A%B0%EC%95%84%ED%95%9C%ED%85%8C%ED%81%AC%EC%BD%94%EC%8A%A4-8%EA%B8%B0-4%EC%A3%BC%EC%B0%A8-%EC%84%A0%ED%83%9D-%EB%AF%B8%EC%85%98'],
    ['추상화 시점', '인터페이스가 실제로 어떤 방향으로 확장될지 고려했는지 묻는 리뷰를 받고, 확장 방향성, 필요성이 보일 때만 추상화한다는 기준을 세우고 과도한 추상화를 걷어 냈습니다.', WC + 'spring-roomescape-admin/pull/452#discussion_r3177286318'],
    ['API 설계 기준', '그룹 토론/리뷰를 통해 내린 설계 기준, "서버의 책임은 사용자에게 보여 줄 문구보다 클라이언트가 해석할 실패 정보에 있다"에 맞춰 판단은 서버에, 표현은 클라이언트에 책임을 분리했습니다.', WC + 'spring-roomescape-member/pull/448#discussion_r3262062249'],
    ['트랜잭션 경계', '"부분 실패가 사용자에 노출되는지"를 작업의 경계, 트랜잭션 단위로 정의하고 요청 충돌, 동시성 문제는 가정과 실험으로 재현한 뒤 DB 제약으로 막았습니다.', WC + 'spring-roomescape-waiting/pull/459#discussion_r3373282547'],
    ['리뷰를 근거로', '[미션 PR 27개](https://github.com/search?q=is%3Apr+author%3Ann98+org%3Awoowacourse&type=pullrequests)에서 지적마다 고침, 유지, 그 근거를 글로 답했습니다.'],
  ],
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
