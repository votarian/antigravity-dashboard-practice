# 마크인포 문제 해결형 OKR 시스템 MVP PRD

| 항목 | 내용 |
| --- | --- |
| 문서 상태 | 초안 v1.0 |
| 제품명 | 마크인포 문제 해결형 OKR 시스템 |
| 대상 조직 | 약 40명, 약 10개 팀의 마크인포 |
| 기본 운영 주기 | 반기 `4개월 실행 + 1개월 closeout/휴식 + 1개월 다음 주기 합의` |
| 지원 주기 | 반기 4+1+1 preset, 분기 preset, 관리자 정의 custom 주기 |
| 배포 원칙 | 사내 서버·비공개 접속·초대된 원격 근무자만 접근 |

## 1. 제품 개요

마크인포는 고객과 내부 시스템에서 발견한 문제를 지속적으로 수집하고, 중요한 문제를 OKR로 선정해 해결하는 조직이다. 이 제품은 목표 입력 도구가 아니라 아래 운영 루프를 하나의 기록과 협업 흐름으로 만드는 사내 시스템이다.

```text
문제 수집 → 검토·선정 → 팀 OKR 합의 → 실행·주간 체크인
→ 월간 결정·협업 → closeout·문제 해결 확인 → 다음 주기 후보 환류
```

## 2. 문제와 기회

현재 문제 리스트는 Google Sheets에 팀별로 분산되어 있으며, 목표 선정 이후의 실행·피드백·주간 보고·월간 회의·해결 여부가 하나의 흐름으로 연결되지 않는다. 기존 OKR 도구는 목표 계층과 체크인에는 강하지만, 마크인포의 문제 선정과 해결 확인 운영을 기본 흐름으로 다루지 않는다.

MVP는 다음을 해결한다.

- 문제의 출처·근거·피드백·선정 사유와 OKR의 연결을 보존한다.
- 팀이 매주 목표의 실제 진행, 위험, 도움 요청, 다음 행동을 짧게 남긴다.
- 월간 회의의 결정과 액션 아이템이 목표·문제와 연결된다.
- 소속 팀은 유지하면서 타팀 OKR에 협업자로 참여한다.
- 외부 공개 없이 사내·승인된 원격 근무자만 사용할 수 있다.

## 3. 성공 기준

### 제품 성공 기준

1. 선정된 문제는 반드시 관련 Objective 또는 KR과 연결되어 추적된다.
2. 활성 팀 OKR의 주간 체크인 작성률을 운영자가 확인할 수 있다.
3. 팀은 월간 회의에서 최소 한 건의 결정·위험·학습 또는 액션 아이템을 기록할 수 있다.
4. 사용자는 주간 보고를 미리본 뒤 명시적으로 Slack 지정 채널에 전송할 수 있다.
5. 종료한 주기는 최종 결과·문제 해결 상태·이월 결정을 보존한다.
6. 사용자·팀·권한 변경 및 외부 전송이 감사 로그에 남는다.

### 운영 성공 지표

| 지표 | 초기 목표 |
| --- | --- |
| 주간 체크인 작성률 | 활성 팀 OKR의 80% 이상 |
| 주간 보고 Slack 전송 성공률 | 사용자 전송 시도 중 95% 이상 |
| 월간 회의록 작성률 | 활성 팀의 80% 이상 |
| 선정 문제의 OKR 연결률 | 100% |
| closeout 이월 사유 기록률 | 미완료 항목의 100% |

이 지표는 개인 평가·보상에 사용하지 않는다.

## 4. 사용자와 역할

| 역할 | 설명 | 핵심 권한 |
| --- | --- | --- |
| 관리자 | 시스템·운영 책임자 | 조직, 사용자, 주기, 권한, Slack 설정, 전체 조회, 감사 로그 조회 |
| 팀 리더 | 팀 OKR 운영 책임자 | 팀 목표·문제 검토, 팀 운영 리뷰, 협업 요청 확인, 팀 보고 조회 |
| 구성원 | 팀 목표의 실행·보고 담당자 | 문제 제안, 배정된 목표 체크인, 주간 보고, 회의록·액션 아이템 작성 |
| 협업자 | 다른 팀 OKR을 지원하는 구성원 | 연결된 OKR 조회·댓글·배정된 체크인 또는 액션 아이템 작성 |

각 사용자는 하나의 **기본 소속 팀**을 가진다. OKR에는 하나의 소유 팀과 하나의 최종 책임자가 있으며, 타팀 지원은 `협업자` 관계로만 표현한다. 팀 소속을 중복 생성하지 않는다.

## 5. 범위

### MVP 포함

1. 문제 백로그와 선정 결정
2. 회사·팀 OKR 및 선택적 개인 개발 목표
3. KR, 실행 항목 링크, 체크인 이력과 진행 추이
4. 주간 보고와 Slack 직접 전송
5. 월간 회의록, 결정 사항, 액션 아이템
6. 주기·closeout·명시적 이월 결정
7. 협업 참여자, 피드백, 기본 의존성·도움 요청
8. Notion·Google·회의 자료의 링크 및 선택 범위 참조
9. 역할 기반 접근 제어, 감사 로그, private deployment

### MVP 제외

- 급여, 승진, 성과급, 강제 등급, 캘리브레이션, 360도 평가
- 개인 목표 달성률에 따른 순위·포인트·보상 자동 산정
- 스프린트, 칸반, 용량, 시간 기록 등 범용 프로젝트 관리
- CRM/ERP/KPI 자동 수집 및 자동 KR 계산
- Notion·Google Sheets의 양방향 동기화와 자동 권한 변경
- Slack 읽기·대화형 봇·자동 발송·자동 재시도
- AI 목표 작성, AI 평가, AI 회의 요약, 예측형 위험 분석
- 공개 인터넷 접속, 모바일 앱, 다중 테넌트 SaaS

## 6. 핵심 운영 모델

### 6.1 문제에서 목표까지

문제는 누구나 제안할 수 있다. 문제는 즉시 OKR이 되지 않으며, 검토와 결정 기록을 거친다.

```text
Draft → Active → Decided → Archived
                  ├─ Accepted for Objective
                  ├─ Deferred
                  ├─ Rejected
                  └─ Duplicate
```

- 탐색 단계 문제는 목표 연결 없이 존재할 수 있다.
- `Accepted for Objective` 결정 시에는 결정 사유, 결정자, 결정일, 관련 Objective 또는 KR을 기록한다.
- 하나의 문제·결정·Objective 사이에는 복수 연결을 허용하되, 화면에서는 대표 연결을 하나 지정할 수 있다.
- 완료 또는 closeout 시 문제의 결과는 `해결`, `진행 중`, `해결 불가`, `다음 주기 재검토`로 정리한다.

### 6.2 OKR 계층과 개인 목표

```text
회사 Objective → 팀 Objective → KR → 실행 항목/근거 링크
                                  ↘ 협업자·액션 아이템
```

- 팀 Objective는 회사 Objective 또는 회사 KR에 정렬될 수 있다.
- 개인 OKR은 모든 팀에 의무가 아니다. 팀 설정으로 활성화하며, 기본 목적은 개인 개발 또는 명확한 개인 책임 결과다.
- 일반 업무 수행은 개인 Objective로 만들지 않고, 팀 KR의 책임자·협업자로 표현한다.
- 모든 committed Objective/KR에는 한 명의 최종 책임자를 둔다.

### 6.3 주기와 closeout

주기는 목표 데이터와 분리된 설정 객체다.

| 상태 | 설명 |
| --- | --- |
| Draft | 목표 초안 작성 |
| Alignment | 팀·리더 합의 및 확정 |
| Active | 실행·체크인·월간 리뷰 |
| Closeout | 최종 값·결과·학습·이월 결정 정리 |
| Closed | 읽기 전용 이력 |

- 다음 주기의 Draft/Alignment는 현재 주기의 Active/Closeout과 동시에 존재할 수 있다.
- 기본 preset은 `4개월 실행, 1개월 closeout/휴식, 1개월 다음 주기 합의`다.
- 분기 preset은 같은 상태 흐름을 더 짧은 기간으로 사용한다.
- 미완료 항목은 자동 이월하지 않는다. `중단`, `계속`, `재범위화`, `상시 업무 전환` 중 하나를 선택하고 사유와 후속 링크를 남긴다.
- Closed 이후 수정은 새 변경 이력으로만 남기며, 원본 결과를 덮어쓰지 않는다.

## 7. 기능 요구사항

### FR-01. 문제 백로그

| 요구사항 | 수용 기준 |
| --- | --- |
| 문제 등록 | 구성원은 문제 설명, 제안 아이디어, 팀, 작성자, 참고 링크를 저장할 수 있다. |
| 근거와 피드백 | 문제에 링크·메모·댓글·리더/개발 피드백을 여러 개 연결할 수 있다. |
| 우선순위와 결정 | 운영자는 중요도, 결정 상태, 사유, 결정자, 결정일을 기록할 수 있다. |
| 목표 연결 | 선정된 문제에서 Objective/KR 초안을 만들거나 기존 Objective/KR에 연결할 수 있다. |
| 보기 | 팀별·상태별·우선순위별·주기별 목록과 대표 연결을 볼 수 있다. |

### FR-02. OKR 작성과 정렬

| 요구사항 | 수용 기준 |
| --- | --- |
| Objective 작성 | 제목, 문제 가설/설명, 소유 팀, 책임자, 기간, 공개 범위를 입력할 수 있다. |
| KR 작성 | 측정 단위, 시작값, 목표값, 현재값, 기간, 책임자를 입력할 수 있다. |
| 실행 연결 | 실행 항목은 링크 또는 간단한 항목으로 KR에 연결되며, KR 자체와 혼동되지 않는다. |
| 정렬 | 회사·팀·개인 개발 목표의 상하위 또는 정렬 관계를 조회할 수 있다. |
| 상태 변경 | Draft/Alignment/Active/Closeout/Closed 전환은 권한과 변경 사유를 확인한다. |

### FR-03. 체크인·추이·피드백

| 요구사항 | 수용 기준 |
| --- | --- |
| 체크인 기록 | 값, 상태(`on track`, `at risk`, `off track`), 짧은 성과/이슈/다음 행동, 작성자, 관측일을 저장한다. |
| 이력 보존 | 일반 사용자는 과거 체크인을 덮어쓰지 않는다. 정정은 새 기록 또는 관리자 권한 변경 이력으로 남긴다. |
| 추이 | KR/Objective 상세에서 실제 진행과 기간 기준 기대 진행을 함께 확인할 수 있다. |
| 피드백 | 참여자는 체크인 또는 목표에 댓글·멘션을 남길 수 있다. |
| 도움 요청 | at risk/off track 체크인에는 도움 요청 또는 의존성 정보를 연결할 수 있다. |

### FR-04. 주간 보고와 Slack

| 요구사항 | 수용 기준 |
| --- | --- |
| 보고 작성 | 지난주 성과, 이번 주 계획, 위험/도움 요청을 관련 OKR과 함께 작성한다. |
| 미리보기 | 전송 전 채널·내용·연결 URL을 읽기 전용 미리보기로 확인한다. |
| 직접 전송 | 사용자가 전송 버튼과 확인을 실행할 때만 Slack에 게시한다. |
| 전송 이력 | 보고 버전, 채널 ID, 전송자, 시각, Slack 메시지 식별자 또는 실패 원인을 저장한다. |
| 중복 방지 | 같은 보고 버전·채널 조합은 이미 성공한 전송을 표시하며, 불명확한 실패에 자동 재시도하지 않는다. |

초기 Slack 방식은 고정된 append-only 채널이면 Incoming Webhook을 사용한다. 메시지 수정·삭제·스레드 응답 또는 복수 채널이 필요해질 때 `chat.postMessage`로 전환한다.

### FR-05. 월간 회의와 액션 아이템

| 요구사항 | 수용 기준 |
| --- | --- |
| 회의록 | 일시, 참석자, 안건, 논의, 결정, 위험, 학습을 기록한다. |
| 연결 | 회의록은 문제, Objective, KR, 주간 보고를 연결할 수 있다. |
| 액션 아이템 | 담당자, 기한, 상태, 결과물 링크, 연결 목표를 가진다. |
| 월간 보기 | 팀별 월간 회의 기록과 미완료 액션 아이템을 조회할 수 있다. |

### FR-06. closeout과 OKR 파티

| 요구사항 | 수용 기준 |
| --- | --- |
| 결과 확정 | Closeout에서 KR 최종값, 상태, 문제 결과, 배운 점을 기록한다. |
| 이월 판단 | 미완료 항목마다 중단/계속/재범위화/상시 업무 전환과 사유를 기록한다. |
| 파티 기록 | 일정, 발표 자료 링크, 팀 성과·시행착오·학습을 남길 수 있다. |
| 인정 파일럿 | 고객 임팩트, 협업, 학습, 운영 개선 등 비순위형 후보·근거를 기록할 수 있다. |

인정 기록은 인사 평가·보상 계산에 사용하지 않는다.

### FR-07. 협업과 권한

| 요구사항 | 수용 기준 |
| --- | --- |
| 참여자 | OKR에 `contributor`, `reviewer`, `observer`를 추가한다. |
| 책임 분리 | 소유 팀과 최종 책임자는 하나이며, 참여자와 다르게 관리한다. |
| 의존성 | 다른 OKR/팀에 대한 지원 요청, 담당자, 기한, 상태를 기록한다. |
| 내 작업 보기 | 사용자는 내 소속 팀 OKR, 내 책임 OKR, 내가 협업 중인 OKR을 구분해 본다. |

### FR-08. 외부 참고자료

| 요구사항 | 수용 기준 |
| --- | --- |
| 링크 보관 | Notion page ID/URL, Drive file ID/URL, Sheet ID·시트명·A1 범위, 회의 URL을 저장할 수 있다. |
| 선택 범위 가져오기 | 관리자는 Google Sheets의 승인된 범위를 일회성 스냅샷으로 가져올 수 있다. |
| 접근 상태 | 원본 자료의 접근 만료·권한 없음·링크 오류를 표시한다. |
| 범위 제한 | 자동 양방향 동기화나 원본 권한 변경은 하지 않는다. |

### FR-09. 관리·감사·보안

| 요구사항 | 수용 기준 |
| --- | --- |
| 조직 관리 | 관리자만 팀, 사용자, 역할, 팀별 개인 목표 사용 여부를 변경한다. |
| 감사 로그 | 로그인, 권한 변경, 주기 상태 변경, 중요 목표 변경, Slack 전송을 actor·시각·변경 전후 값·사유와 저장한다. |
| 접근 제어 | 서버는 인증·권한 검증 없이 데이터나 관리 기능을 제공하지 않는다. |
| 백업 | 데이터베이스 백업과 월 1회 복구 점검 결과를 운영 기록으로 남긴다. |

## 8. 주요 화면

1. **홈**: 내 체크인·미작성 보고·받은 피드백·내 협업 요청
2. **문제 백로그**: 팀/상태/우선순위 필터, 문제 상세, 선정 결정, 목표 연결
3. **목표 보드**: 회사·팀 목표, KR, 책임자, 상태, 진행률, 참여자
4. **목표 상세**: 근거·문제·체크인 추이·댓글·의존성·변경 이력
5. **주간 보고**: 작성, 미리보기, Slack 전송 이력
6. **월간 리뷰**: 회의록, 결정·위험·학습, 액션 아이템
7. **closeout/파티**: 최종 결과, 이월 판단, 성과·학습 기록
8. **내 협업**: 내 소속 팀/내 책임/협업 중 목표의 분리된 목록
9. **관리자**: 조직, 사용자, 주기 preset, Slack·참고자료 연결, 감사 로그

## 9. 데이터 모델 초안

| 엔터티 | 핵심 필드 |
| --- | --- |
| User | id, name, email, primary_team_id, role, active |
| Team | id, name, leader_id, personal_okr_enabled |
| Cycle | id, name, preset, execution/closeout/planning dates, status |
| Problem | id, description, idea, author, team, priority, status, representative_link |
| Evidence | id, source_type, URL/note, captured_at, linked_entity |
| ProblemDecision | id, problem_id, status, rationale, decider, decided_at |
| Objective | id, cycle_id, owner_team_id, owner_id, title, parent_id, state |
| KeyResult | id, objective_id, owner_id, unit, start/target/current value, status |
| OkrParticipant | okr_id, user_id, role, permissions |
| OkrDependency | source, target, owner, due_date, status |
| CheckIn | id, target, author, observed_at, value, health, note, supersedes_id |
| WeeklyReport | id, cycle_id, team, author, week, content, version, send_status |
| SlackDelivery | report_id, channel_id, external_message_id, sent_by, sent_at, error |
| MeetingNote | id, cycle_id, date, attendees, agenda, decisions, risks, learnings |
| ActionItem | id, meeting_note_id, owner, due_date, status, result_link |
| Closeout | cycle/target, final_value, outcome, carry_forward_decision, learning |
| RecognitionNomination | cycle, category, evidence, nominee/team, review_status |
| ExternalReference | type, external_id, URL, range, snapshot_hash, access_status |
| AuditEvent | actor, occurred_at, entity, action, old_value, new_value, reason |

## 10. 비기능 요구사항과 배포

### 보안 아키텍처

```text
원격 사용자 → Tailscale + IdP MFA → 허용 정책 → HTTPS reverse proxy → 웹 앱 RBAC → private database
```

- 서버는 public DNS, 포트 포워딩, Tailscale Funnel을 사용하지 않는다.
- 서버와 승인된 사용자 기기만 private network에 참여한다.
- Tailscale 정책은 OKR 사용자 그룹에서 OKR 서버 HTTPS 포트만 허용한다.
- 네트워크 접근과 앱 권한은 별개다. 앱은 서버 측 RBAC와 세션 만료를 적용한다.
- TLS는 private network 내부에서도 사용한다.
- 데이터베이스는 외부 포트를 열지 않고 앱 내부 네트워크에서만 접근한다.

### 운영 권장안

- Ubuntu LTS 서버 + Docker Compose + PostgreSQL
- 단일 사내 서버로 시작하되, 암호화 백업과 복구 절차를 먼저 검증
- Slack/DB/IdP 비밀 값은 코드·Git·화면이 아닌 보호된 서버 비밀 저장소에 보관
- 퇴사/이동 시 앱 계정, 팀 역할, private network 접근을 함께 해제

## 11. 릴리스 순서

| 단계 | 범위 | 완료 판단 |
| --- | --- | --- |
| 0. 기반 | private 배포, 로그인, RBAC, 조직/팀 | 허용 사용자만 접속 가능 |
| 1. 문제·목표 | 문제 백로그, 선정 결정, 회사/팀 OKR, KR | 선정 문제를 목표와 연결 가능 |
| 2. 실행 | 체크인, 추이, 댓글, 내 협업 | 팀이 주간 실행 현황을 기록 가능 |
| 3. 의식·소통 | 주간 보고, Slack 직접 전송, 월간 회의·액션 | 운영 보고와 결정이 한곳에 남음 |
| 4. 마감 | closeout, 이월, 파티 기록, 기본 리포트 | 주기를 끝까지 마감·회고 가능 |
| 5. 파일럿 검토 | 사용성·작성률·공정성 회고 | 다음 주기 개선 여부 결정 |

## 12. 결정 로그와 후속 검토 항목

| 결정 | MVP 정책 | 후속 검토 |
| --- | --- | --- |
| 개인 OKR | 팀별 opt-in, 개발/명확한 개인 결과만 | 역할별 적용 효과 |
| 정기 리뷰 | 점수·등급 없이 진행·결정·학습 중심 | 평가 제도와 연결 필요성 |
| Slack | 직접 전송, 단방향, 고정 채널 우선 | 채널 유형·수정/스레드 필요성 |
| Google/Notion | 링크·선택 범위 snapshot | read-only refresh 수요 |
| 협업 | 단일 책임자 + participant 관계 | 의존성 시각화 수요 |
| OKR 파티 | 비순위형 인정 파일럿 | 참여 다양성·공정성 설문 |
| 주기 | 4+1+1과 분기 preset | 팀별 혼합 주기 필요성 |

## 13. 관련 문서

- [기존 MVP 기획서](./local-okr-mvp-design.md)
- [시장조사 종합본](../.omo/ulw-research/20260902-okr-market-research/SYNTHESIS.md)

