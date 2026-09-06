/**
 * Central Gamified State Engine (Store)
 * MarkInfo Problem-Solving OKR System MVP
 * Based on /docs (PRD, MVP design, functional spec, screen flows & ERD)
 */

const STORAGE_KEY = 'MARKINFO_OKR_GAME_STORE_V3';

const initialDefaultState = {
  // 현재 접속 사용자 & 역할
  currentUser: 'CEO', // 'CEO' | 'DEV_LEAD' | 'MKT_LEAD' | 'CS_LEAD'
  currentRole: 'ADMIN', // 'ADMIN' | 'LEADER' | 'MEMBER' | 'CONTRIBUTOR'
  activeTab: 'PROBLEM', // 'PROBLEM' | 'OKR' | 'WEEKLY' | 'MONTHLY' | 'CLOSEOUT' | 'ANALYTICS'

  // 주기 설정 (PRD 6.3 preset: 4개월 실행 + 1개월 closeout + 1개월 합의)
  cycle: {
    id: 'CYCLE-2026-H2',
    name: '2026 H2 반기 (4+1+1 Preset)',
    status: 'ACTIVE', // 'DRAFT' | 'ALIGNMENT' | 'ACTIVE' | 'CLOSEOUT' | 'CLOSED'
    activePeriod: '2026.07.01 ~ 2026.10.31 (실행 4개월)',
    closeoutPeriod: '2026.11.01 ~ 2026.11.30 (마감 1개월)',
    alignmentPeriod: '2026.12.01 ~ 2026.12.31 (다음주기 합의 1개월)'
  },

  // 게이미피케이션 (RPG Character Stats & Achievements)
  gamification: {
    characters: {
      CEO: {
        id: 'CEO',
        name: '대표 (CEO)',
        title: '👑 외부 총괄 및 비전 마스터',
        roleLabel: '관리자 / 리더',
        team: '경영진',
        level: 8,
        exp: 420,
        maxExp: 600,
        gold: 15400,
        streak: 7,
        avatar: '👑'
      },
      DEV_LEAD: {
        id: 'DEV_LEAD',
        name: '김개발 (개발팀장)',
        title: '🛡️ 코드 아키텍트 & 넥서스 수호자',
        roleLabel: '팀 리더',
        team: '개발팀',
        level: 7,
        exp: 310,
        maxExp: 500,
        gold: 11200,
        streak: 12,
        avatar: '🛡️'
      },
      MKT_LEAD: {
        id: 'MKT_LEAD',
        name: '이마케 (마케팅팀장)',
        title: '🎨 성장 연금술사 & 바이럴 킹',
        roleLabel: '팀 리더',
        team: '마케팅팀',
        level: 6,
        exp: 240,
        maxExp: 400,
        gold: 8900,
        streak: 5,
        avatar: '🎨'
      },
      CS_LEAD: {
        id: 'CS_LEAD',
        name: '박운영 (CS/운영팀장)',
        title: '🎧 고객 수호기사 & 재고 캡틴',
        roleLabel: '팀 리더',
        team: 'CS/운영팀',
        level: 6,
        exp: 370,
        maxExp: 400,
        gold: 9600,
        streak: 9,
        avatar: '🎧'
      }
    },
    quests: [
      { id: 'Q-1', title: '⚔️ 신규 현장 문제 1건 제안하기', exp: 100, gold: 300, completed: true, category: 'PROBLEM' },
      { id: 'Q-2', title: '⚡ 이번 주 주간 체크인 작성 & Slack 전송', exp: 150, gold: 500, completed: true, category: 'CHECKIN' },
      { id: 'Q-3', title: '🎯 팀 KR 진척 수치 1개 업데이트', exp: 80, gold: 200, completed: false, category: 'OKR' },
      { id: 'Q-4', title: '📜 월간 액션 아이템 퀘스트 완료하기', exp: 200, gold: 600, completed: false, category: 'ACTION' }
    ],
    badges: [
      { id: 'B-1', title: '🐉 던전 클리어 마스터', desc: '선정 문제 10건 목표 연결 완료', icon: 'fa-dragon', unlocked: true },
      { id: 'B-2', title: '⚡ 슬랙 텔레포터', desc: '주간 보고 100% Slack 전송 달성', icon: 'fa-bolt', unlocked: true },
      { id: 'B-3', title: '🛡️ 100% 체크인 수호자', desc: '주간 체크인 작성률 80% 이상 4주 연속 유지', icon: 'fa-shield-halved', unlocked: true },
      { id: 'B-4', title: '🎉 OKR 파티 주동자', desc: '시즌 마감 파티 참여 및 이월 합의 완료', icon: 'fa-champagne-glasses', unlocked: false }
    ]
  },

  // 1. 문제 백로그 (FR-01: Problem Backlog & Decision Engine)
  problems: [
    {
      id: 'PROB-101',
      title: '결제 모듈 타임아웃 오류 및 PG 결제 승인 지연',
      description: 'B2B 및 대량 주문 결제 시 승인 응답이 10초 이상 소요되어 고객 문의 인입 및 이탈 발생',
      team: '개발팀',
      author: '김개발',
      priority: 'HIGH', // 'HIGH' | 'MEDIUM' | 'LOW'
      status: 'DECIDED', // 'DRAFT' | 'ACTIVE' | 'DECIDED' | 'ARCHIVED'
      decision: 'ACCEPTED', // 'ACCEPTED' | 'DEFERRED' | 'REJECTED' | 'DUPLICATE'
      decisionReason: 'Q3 핵심 고객 지표에 치명적이므로 개발팀 O1의 최우선 KR로 반영함',
      decisionBy: '대표',
      relatedOkrId: 'OKR-DEV-1',
      relatedOkrTitle: 'O1. 결제 모듈 속도 300ms 이하 단축 및 PG 서버 안정화',
      evidenceUrl: 'https://notion.so/markinfo/pay-err-log',
      feedback: 'CS팀: 매월 20건 이상 유사 문의 발생 중. 최우선 처리 요청!',
      createdAt: '2026-09-01',
      resolvedStatus: 'IN_PROGRESS' // 'RESOLVED' | 'IN_PROGRESS' | 'UNRESOLVED' | 'DEFERRED'
    },
    {
      id: 'PROB-102',
      title: 'B2B 홍보 리플렛 QR코드 연결 랜딩 404 오류',
      description: '오프라인 배포용 리플렛의 랜딩페이지 UTM 트래커 URL 변경으로 인한 접속 차단 문제',
      team: '마케팅팀',
      author: '이마케',
      priority: 'HIGH',
      status: 'DECIDED',
      decision: 'ACCEPTED',
      decisionReason: '신규 B2B 리드 수집에 직결되므로 마케팅 O2 목표에 신규 KR 추가',
      decisionBy: '대표',
      relatedOkrId: 'OKR-MKT-1',
      relatedOkrTitle: 'O2. B2B 프로모션 랜딩페이지 수주 전환율 2.5배 달성',
      evidenceUrl: 'https://figma.com/file/leaflet-qr-bug',
      feedback: '대표: 리디렉션 301 처리 및 동적 UTM 트래커로 개정 바람.',
      createdAt: '2026-09-02',
      resolvedStatus: 'RESOLVED'
    },
    {
      id: 'PROB-103',
      title: 'CS 신제품 자주 묻는 질문(FAQ) 매뉴얼 최신화 미비',
      description: '신제품 나노코팅 C-Type 출시 후 상담 템플릿 미업데이트로 초보 상담사 가이드 오안내',
      team: 'CS/운영팀',
      author: '박운영',
      priority: 'MEDIUM',
      status: 'ACTIVE',
      decision: 'DEFERRED',
      decisionReason: '다음 주 월간 리뷰 회의에서 신규 KR 추가 여부 재검토 결정',
      decisionBy: '박운영',
      relatedOkrId: '',
      relatedOkrTitle: '',
      evidenceUrl: 'https://notion.so/markinfo/cs-faq-manual',
      feedback: '마케팅팀 지원 필요: 신규 스펙 시안 확정 후 템플릿 반영 예정',
      createdAt: '2026-09-03',
      resolvedStatus: 'DEFERRED'
    },
    {
      id: 'PROB-104',
      title: '원자재 재고 미달 시 자동 발주 시스템 부재',
      description: '안전재고 미달 품목 발생 시 담당자가 수동 모니터링하여 발주 지연 위험 존재',
      team: 'CS/운영팀',
      author: '박운영',
      priority: 'LOW',
      status: 'DRAFT',
      decision: 'DRAFT',
      decisionReason: '',
      decisionBy: '',
      relatedOkrId: '',
      relatedOkrTitle: '',
      evidenceUrl: '',
      feedback: '탐색 단계 문제로 수집됨',
      createdAt: '2026-09-05',
      resolvedStatus: 'IN_PROGRESS'
    }
  ],

  // 2. OKR 계층 & KR (FR-02: OKR Alignment & Progress)
  okrs: [
    {
      id: 'OKR-COMP-1',
      level: 'COMPANY', // 'COMPANY' | 'TEAM'
      title: '🏢 [전사 OKR] B2B 대형 파이프라인 수주 및 핵심 서비스 안정성 확립',
      description: '마크인포 Q3 전사 최고 목표: 시스템 결제 안정성 확보 및 B2B 수주 3억 돌파',
      team: '전사',
      owner: '대표',
      status: 'ON_TRACK', // 'ON_TRACK' | 'AT_RISK' | 'OFF_TRACK'
      progress: 78,
      keyResults: [
        { id: 'KR-C1', title: 'Q3 전사 매출 3.5억원 달성', current: 2.8, target: 3.5, unit: '억원', owner: '대표' },
        { id: 'KR-C2', title: '핵심 서비스 장애 시간 월 0건 달성', current: 0, target: 0, unit: '건', owner: '김개발' }
      ],
      initiatives: [
        { id: 'INIT-C1', title: '전사 월간 리포트 및 회의록 100% 기록', completed: true },
        { id: 'INIT-C2', title: 'B2B 대형 고객사 3곳 최종 승인 미팅', completed: true }
      ]
    },
    {
      id: 'OKR-DEV-1',
      level: 'TEAM',
      title: '🛡️ [개발팀] O1. 결제 모듈 속도 300ms 이하 단축 및 PG 서버 안정화',
      description: '문제 PROB-101 연계 목표: 결제 타임아웃 제로화 및 DB 인덱싱 최적화',
      team: '개발팀',
      owner: '김개발',
      status: 'ON_TRACK',
      progress: 85,
      keyResults: [
        { id: 'KR-D1', title: '결제 API 평균 응답시간 300ms 이하 단축', current: 320, target: 300, unit: 'ms', owner: '김개발' },
        { id: 'KR-D2', title: 'PG 결제 실패율 0.5% 미만 유지', current: 0.3, target: 0.5, unit: '%', owner: '김개발' }
      ],
      initiatives: [
        { id: 'INIT-D1', title: 'PG사 듀얼 채널 트래픽 분산 로직 작성', completed: true },
        { id: 'INIT-D2', title: '결제 로그 비동기 큐 처리 적용', completed: true },
        { id: 'INIT-D3', title: '부하 테스트 및 병목 쿼리 인덱싱 적용', completed: false }
      ]
    },
    {
      id: 'OKR-MKT-1',
      level: 'TEAM',
      title: '🎨 [마케팅팀] O2. B2B 프로모션 랜딩페이지 수주 전환율 2.5배 달성',
      description: '문제 PROB-102 연계 목표: 오프라인 QR 및 온라인 리드 수집 파이프라인 강화',
      team: '마케팅팀',
      owner: '이마케',
      status: 'AT_RISK',
      progress: 62,
      keyResults: [
        { id: 'KR-M1', title: 'B2B 온라인 리드 획득 수 150건 달성', current: 95, target: 150, unit: '건', owner: '이마케' },
        { id: 'KR-M2', title: '리플렛 QR 랜딩 수주 전환율 4.0% 달성', current: 2.5, target: 4.0, unit: '%', owner: '이마케' }
      ],
      initiatives: [
        { id: 'INIT-M1', title: 'B2B 프로모션 리플렛 디자인 개정 및 QR 추적기 탑재', completed: true },
        { id: 'INIT-M2', title: 'LinkedIn / Google 검색 광고 A/B 테스트', completed: false },
        { id: 'INIT-M3', title: '소개서 다운로드 폼 자동 메일링 세팅', completed: false }
      ]
    },
    {
      id: 'OKR-CS-1',
      level: 'TEAM',
      title: '🎧 [CS/운영팀] O3. 고객 문의 평균 응답시간 5분 이내 단축 및 품절 Zero',
      description: '고객 만족도 98% 달성 및 부자재 안전재고 100% 관리',
      team: 'CS/운영팀',
      owner: '박운영',
      status: 'ON_TRACK',
      progress: 90,
      keyResults: [
        { id: 'KR-S1', title: '실시간 상담 평균 응답시간 5분 이내 유지', current: 4.2, target: 5.0, unit: '분', owner: '박운영' },
        { id: 'KR-S2', title: '안전재고 미달 품목 0건 유지', current: 0, target: 0, unit: '건', owner: '박운영' }
      ],
      initiatives: [
        { id: 'INIT-S1', title: 'CS FAQ 매뉴얼 최신화 1차 검토', completed: true },
        { id: 'INIT-S2', title: '3PL 물류센터 일일 입출고 동기화', completed: true }
      ]
    }
  ],

  // 3. 주간 체크인 & Slack 전송 이력 (FR-03 & FR-04)
  checkIns: [
    {
      id: 'CHK-101',
      okrId: 'OKR-DEV-1',
      okrTitle: 'O1. 결제 모듈 속도 300ms 이하 단축 및 PG 서버 안정화',
      author: '김개발',
      date: '2026-09-05',
      krValue: 85,
      status: 'ON_TRACK',
      achievements: '결제 API 2차 리팩토링 및 Redis 비동기 캐싱 적용 완료.',
      issues: '외부 PG사 테스트 서버 점검으로 간헐적 타임아웃 발생.',
      nextActions: 'PG 듀얼 채널 자동 폴백 코드 작성 및 로드밸런싱 점검.',
      helpRequested: true,
      helpNote: '대표님: B2B PG사 부가 서비스 계약서 최종 승인 부탁드립니다.'
    },
    {
      id: 'CHK-102',
      okrId: 'OKR-MKT-1',
      okrTitle: 'O2. B2B 프로모션 랜딩페이지 수주 전환율 2.5배 달성',
      author: '이마케',
      date: '2026-09-04',
      krValue: 62,
      status: 'AT_RISK',
      achievements: 'B2B 프로모션 리플렛 시안 제작 완료 및 QR 동적 트래커 적용.',
      issues: '광고 집행 예산 결재 지연으로 온라인 캠페인 시작 연기됨.',
      nextActions: 'Google B2B 키워드 광고 세팅 및 A/B 테스트 소재 제출.',
      helpRequested: true,
      helpNote: '경영진: 9월 광고 집행 예산안 조기 승인 필요합니다.'
    },
    {
      id: 'CHK-103',
      okrId: 'OKR-CS-1',
      okrTitle: 'O3. 고객 문의 평균 응답시간 5분 이내 단축 및 품절 Zero',
      author: '박운영',
      date: '2026-09-05',
      krValue: 90,
      status: 'ON_TRACK',
      achievements: '상담 템플릿 퀵키 도입으로 평균 응답시간 4.2분 달성.',
      issues: '3PL 물류 송장 입력 수동 작업으로 야간 출고건 지연.',
      nextActions: '자동 송장 연동 API 매뉴얼 작성 및 테스트.',
      helpRequested: false,
      helpNote: ''
    }
  ],

  // Slack 전송 이력 (FR-04 Audit & Teleport logs)
  slackLogs: [
    {
      id: 'SLK-201',
      author: '김개발',
      channel: '#주간-보고-okr',
      date: '2026-09-05 17:45',
      status: 'SUCCESS',
      slackMsgId: 'MSG-99201',
      preview: '📢 [주간 OKR 보고 - 개발팀]\n• 달성률: 85% (On Track 🟢)\n• 성과: 결제 API 캐싱 및 2차 최적화\n• 도움 요청: PG 부가계약서 대표님 승인 요청'
    },
    {
      id: 'SLK-202',
      author: '이마케',
      channel: '#주간-보고-okr',
      date: '2026-09-04 18:10',
      status: 'SUCCESS',
      slackMsgId: 'MSG-99202',
      preview: '📢 [주간 OKR 보고 - 마케팅팀]\n• 달성률: 62% (At Risk 🟡)\n• 성과: QR 트래커 적용 리플렛 제작\n• 도움 요청: Q3 광고 예산 조기 집행 승인'
    }
  ],

  // 4. 월간 회의록 및 현풍 수배 액션 아이템 (FR-05)
  meetings: [
    {
      id: 'MTG-01',
      title: '8월 월간 OKR 성과 리뷰 & 주요 문제 선정 회의',
      date: '2026-08-31',
      attendees: ['대표', '김개발(개발)', '이마케(마케팅)', '박운영(CS)'],
      agenda: '1. 8월 목표 달성률 회고 / 2. 인입 문제 검토 및 OKR 승격 결정 / 3. 9월 액션 아이템 배정',
      decisions: '• PROB-101(결제 오류)을 개발팀 최우선 OKR로 승격\n• PROB-102(QR오류) 마케팅 KR2 목표 수정 승인\n• 주간 체크인 작성률 80% 이상 지속 유지 합의',
      risks: '마케팅 예산 집행 지연 시 B2B 리드 수집 목표 차질 우려',
      learnings: '체크인에 도움 요청(helpRequested)을 남기면 평균 2일 내 협업 해결됨',
      actionItems: ['AI-101', 'AI-102', 'AI-103']
    }
  ],

  actionItems: [
    {
      id: 'AI-101',
      title: '⚔️ PG사 듀얼 채널 부가 서비스 계약서 최종 승인',
      assignee: '대표 (CEO)',
      dueDate: '2026-09-10',
      completed: true,
      xpReward: 200,
      goldReward: 500,
      okrTitle: 'O1. 결제 모듈 속도 단축'
    },
    {
      id: 'AI-102',
      title: '📜 CS 자주 묻는 질문(FAQ) 매뉴얼 템플릿 2차 개정',
      assignee: '박운영 (CS팀)',
      dueDate: '2026-09-15',
      completed: false,
      xpReward: 150,
      goldReward: 350,
      okrTitle: 'O3. 고객 문의 응답시간 단축'
    },
    {
      id: 'AI-103',
      title: '🎨 Q3 B2B 온라인 광고 집행 예산 재배정 서류 제출',
      assignee: '이마케 (마케팅팀)',
      dueDate: '2026-09-12',
      completed: false,
      xpReward: 150,
      goldReward: 350,
      okrTitle: 'O2. B2B 프로모션 수주 전환율'
    }
  ],

  // 5. Closeout & OKR 파티 (FR-06)
  closeouts: [
    {
      period: '2026 Q2 분기 마감',
      score: 92,
      resolvedCount: 12,
      partyNotes: '🎉 Q2 매출 목표 110% 초과 달성! 전체 팀원 EXP +500 보상 지급 완료',
      carryovers: [
        { item: '해외 바이어 B2B 미팅', decision: 'CONTINUE', reason: '바이어 측 일정 연기로 Q3 후속 추진' },
        { item: '구 모듈 리팩토링', decision: 'OPERATIONS', reason: '신규 개발 대신 상시 유지보수 업무로 전환' }
      ]
    }
  ],

  // 6. 감사 로그 (FR-07: Audit Events)
  auditLogs: [
    { id: 'AUD-01', timestamp: '2026-09-05 17:45', actor: '김개발', action: 'SLACK_DISPATCH', detail: '주간 보고 #주간-보고-okr 채널 전송 성공 (MSG-99201)' },
    { id: 'AUD-02', timestamp: '2026-09-05 14:20', actor: '대표', action: 'PROBLEM_DECISION', detail: '문제 PROB-101 -> OKR-DEV-1 승격 결정 (Accepted)' },
    { id: 'AUD-03', timestamp: '2026-09-01 09:00', actor: '대표', action: 'CYCLE_UPDATE', detail: '주기 2026 H2 반기 (4+1+1 Preset) Active 상태 전환' }
  ]
};

class StateStore {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(initialDefaultState));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  // 탭 전환 ('PROBLEM' | 'OKR' | 'WEEKLY' | 'MONTHLY' | 'CLOSEOUT' | 'ANALYTICS')
  setActiveTab(tabName) {
    this.state.activeTab = tabName;
    this.saveState();
  }

  // 사용자 전환 ('CEO' | 'DEV_LEAD' | 'MKT_LEAD' | 'CS_LEAD')
  setUser(userId) {
    if (this.state.gamification.characters[userId]) {
      this.state.currentUser = userId;
      // 자동 역할 설정
      if (userId === 'CEO') this.state.currentRole = 'ADMIN';
      else this.state.currentRole = 'LEADER';
      
      this.logAudit('USER_SWITCH', this.getCurrentCharacter().name, `사용자 계정이 ${userId}로 전환되었습니다.`);
      this.saveState();
    }
  }

  getCurrentCharacter() {
    return this.state.gamification.characters[this.state.currentUser] || this.state.gamification.characters.CEO;
  }

  // EXP & Gold 부여 및 레벨업 체크
  addExp(expAmount, goldAmount = 0) {
    const char = this.getCurrentCharacter();
    char.exp += expAmount;
    char.gold += goldAmount;

    let leveledUp = false;
    while (char.exp >= char.maxExp) {
      char.level += 1;
      char.exp -= char.maxExp;
      char.maxExp = char.level * 100 + 200;
      leveledUp = true;
    }

    this.saveState();
    return { leveledUp, newLevel: char.level, expGained: expAmount, goldGained: goldAmount };
  }

  // 1. 신규 문제 등록 (FR-01)
  addProblem(data) {
    const char = this.getCurrentCharacter();
    const newId = 'PROB-' + String(Date.now()).slice(-4);
    const newProblem = {
      id: newId,
      title: data.title,
      description: data.description || '',
      team: data.team || char.team,
      author: char.name,
      priority: data.priority || 'MEDIUM',
      status: 'DRAFT',
      decision: 'DRAFT',
      decisionReason: '',
      decisionBy: '',
      relatedOkrId: '',
      relatedOkrTitle: '',
      evidenceUrl: data.evidenceUrl || '',
      feedback: data.feedback || '',
      createdAt: new Date().toISOString().split('T')[0],
      resolvedStatus: 'IN_PROGRESS'
    };

    this.state.problems.unshift(newProblem);
    const reward = this.addExp(100, 300);
    this.logAudit('PROBLEM_CREATE', char.name, `신규 문제 등록: [${newId}] ${data.title}`);
    this.saveState();
    return { problem: newProblem, reward };
  }

  // 문제 선정 결정 (Draft -> Active -> Decided)
  decideProblem(problemId, decision, decisionReason, relatedOkrId = '') {
    const prob = this.state.problems.find(p => p.id === problemId);
    if (!prob) return null;

    const char = this.getCurrentCharacter();
    prob.status = 'DECIDED';
    prob.decision = decision; // 'ACCEPTED' | 'DEFERRED' | 'REJECTED' | 'DUPLICATE'
    prob.decisionReason = decisionReason;
    prob.decisionBy = char.name;

    if (decision === 'ACCEPTED' && relatedOkrId) {
      const okr = this.state.okrs.find(o => o.id === relatedOkrId);
      if (okr) {
        prob.relatedOkrId = okr.id;
        prob.relatedOkrTitle = okr.title;
      }
    }

    const reward = this.addExp(150, 400);
    this.logAudit('PROBLEM_DECIDE', char.name, `문제 [${problemId}] 결정: ${decision} (${decisionReason})`);
    this.saveState();
    return { prob, reward };
  }

  // 2. OKR KR 진척 수치 업데이트 (FR-02 & FR-03)
  updateKRValue(okrId, krId, newValue) {
    const okr = this.state.okrs.find(o => o.id === okrId);
    if (!okr) return null;

    const kr = okr.keyResults.find(k => k.id === krId);
    if (kr) {
      kr.current = Number(newValue);
      this.recalculateOKR(okr);
      const reward = this.addExp(50, 150);
      this.saveState();
      return { okr, kr, reward };
    }
    return null;
  }

  // OKR 실행항목 완료 토글
  toggleInitiative(okrId, initId) {
    const okr = this.state.okrs.find(o => o.id === okrId);
    if (!okr) return null;

    const init = okr.initiatives.find(i => i.id === initId);
    if (init) {
      init.completed = !init.completed;
      let reward = null;
      if (init.completed) {
        reward = this.addExp(80, 200);
      }
      this.saveState();
      return { init, reward };
    }
    return null;
  }

  // OKR 전체 진척률 재계산
  recalculateOKR(okr) {
    if (!okr.keyResults || okr.keyResults.length === 0) return;
    const rates = okr.keyResults.map(k => {
      if (k.target === 0) return 100;
      return Math.min(100, Math.round((k.current / k.target) * 100));
    });
    const avg = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
    okr.progress = avg;

    if (avg >= 70) okr.status = 'ON_TRACK';
    else if (avg >= 45) okr.status = 'AT_RISK';
    else okr.status = 'OFF_TRACK';
  }

  // 3. 주간 체크인 작성 (FR-03)
  addCheckIn(data) {
    const char = this.getCurrentCharacter();
    const newId = 'CHK-' + String(Date.now()).slice(-4);
    const okr = this.state.okrs.find(o => o.id === data.okrId);

    const newCheckIn = {
      id: newId,
      okrId: data.okrId,
      okrTitle: okr ? okr.title : data.okrTitle || '전사 OKR',
      author: char.name,
      date: new Date().toISOString().split('T')[0],
      krValue: Number(data.krValue || 80),
      status: data.status || 'ON_TRACK', // 'ON_TRACK' | 'AT_RISK' | 'OFF_TRACK'
      achievements: data.achievements,
      issues: data.issues || '',
      nextActions: data.nextActions,
      helpRequested: !!data.helpRequested,
      helpNote: data.helpNote || ''
    };

    this.state.checkIns.unshift(newCheckIn);

    // 퀘스트 완료 처리
    const checkinQuest = this.state.gamification.quests.find(q => q.id === 'Q-2');
    if (checkinQuest) checkinQuest.completed = true;

    const reward = this.addExp(150, 500);
    this.logAudit('CHECKIN_CREATE', char.name, `주간 체크인 작성: [${newId}] ${okr ? okr.title : ''}`);
    this.saveState();
    return { checkIn: newCheckIn, reward };
  }

  // Slack 직접 전송 (FR-04: Slack Teleport)
  sendSlackReport(checkInId) {
    const checkIn = this.state.checkIns.find(c => c.id === checkInId);
    const char = this.getCurrentCharacter();

    const newSlackLog = {
      id: 'SLK-' + String(Date.now()).slice(-4),
      author: char.name,
      channel: '#주간-보고-okr',
      date: new Date().toLocaleString('ko-KR', { hour12: false }),
      status: 'SUCCESS',
      slackMsgId: 'MSG-' + Math.floor(10000 + Math.random() * 90000),
      preview: `📢 [주간 OKR 보고 - ${char.team}]\n• 작성자: ${char.name}\n• 목표: ${checkIn ? checkIn.okrTitle : '주간 OKR'}\n• 상태: ${checkIn ? checkIn.status : 'ON_TRACK'}\n• 지난주 성과: ${checkIn ? checkIn.achievements : '성과 완료'}\n• 다음주 계획: ${checkIn ? checkIn.nextActions : '계획 실행'}`
    };

    this.state.slackLogs.unshift(newSlackLog);
    const reward = this.addExp(200, 600);
    this.logAudit('SLACK_DISPATCH', char.name, `Slack 채널 #주간-보고-okr로 보고서 전송 완료 (${newSlackLog.slackMsgId})`);
    this.saveState();
    return { slackLog: newSlackLog, reward };
  }

  // 4. 월간 회의록 작성 (FR-05)
  addMeetingNote(data) {
    const char = this.getCurrentCharacter();
    const newId = 'MTG-' + String(Date.now()).slice(-4);
    const newMeeting = {
      id: newId,
      title: data.title,
      date: data.date || new Date().toISOString().split('T')[0],
      attendees: data.attendees || [char.name],
      agenda: data.agenda || '',
      decisions: data.decisions || '',
      risks: data.risks || '',
      learnings: data.learnings || '',
      actionItems: []
    };

    this.state.meetings.unshift(newMeeting);
    const reward = this.addExp(180, 450);
    this.logAudit('MEETING_CREATE', char.name, `월간 회의록 작성: [${newId}] ${data.title}`);
    this.saveState();
    return { meeting: newMeeting, reward };
  }

  // 액션 아이템 추가 및 토글 (FR-05 현상금 퀘스트)
  addActionItem(data) {
    const newId = 'AI-' + String(Date.now()).slice(-4);
    const newItem = {
      id: newId,
      title: data.title,
      assignee: data.assignee || '미정',
      dueDate: data.dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      xpReward: Number(data.xpReward || 150),
      goldReward: Number(data.goldReward || 350),
      okrTitle: data.okrTitle || '연결 OKR'
    };

    this.state.actionItems.unshift(newItem);
    this.saveState();
    return newItem;
  }

  toggleActionItem(aiId) {
    const item = this.state.actionItems.find(a => a.id === aiId);
    if (!item) return null;

    item.completed = !item.completed;
    let reward = null;
    if (item.completed) {
      reward = this.addExp(item.xpReward, item.goldReward);
    }
    this.saveState();
    return { item, reward };
  }

  // 5. 주기 closeout & OKR 파티 (FR-06)
  executeCloseout(data) {
    const char = this.getCurrentCharacter();
    const newCloseout = {
      period: this.state.cycle.name + ' 마감',
      score: Number(data.score || 95),
      resolvedCount: this.state.problems.filter(p => p.resolvedStatus === 'RESOLVED').length,
      partyNotes: data.partyNotes || '🎉 이번 주기 성공적인 마감! 성과를 이룬 전체 팀원들에게 박수를 보냅니다!',
      carryovers: data.carryovers || []
    };

    this.state.closeouts.unshift(newCloseout);
    this.state.cycle.status = 'CLOSED';

    // 파티 뱃지 해제
    const badge = this.state.gamification.badges.find(b => b.id === 'B-4');
    if (badge) badge.unlocked = true;

    const reward = this.addExp(500, 1500);
    this.logAudit('CLOSEOUT_EXECUTE', char.name, `주기 마감 및 OKR 파티 개최 완료 (${this.state.cycle.name})`);
    this.saveState();
    return { closeout: newCloseout, reward };
  }

  // 감사 로그 기록 (FR-07)
  logAudit(action, actor, detail) {
    const newLog = {
      id: 'AUD-' + String(Date.now()).slice(-4),
      timestamp: new Date().toLocaleString('ko-KR', { hour12: false }),
      actor: actor || '시스템',
      action,
      detail
    };
    this.state.auditLogs.unshift(newLog);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }
}

export const Store = new StateStore();
