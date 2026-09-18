# team0 실제 DB 저장·조회 검증

`POST /api/diagnostics/database`는 운영자용 진단 경로입니다. team0에만 존재하며,
Desk 메시지나 다른 팀 DB를 건드리지 않습니다. DB 초기 스키마는 변경하지 않습니다.

앱의 `withDatabase` → `getDatabase()` 경로로 원격 D1 `app_records`에 임의 UUID의
테스트 JSON을 INSERT → SELECT 및 값 비교 → DELETE → SELECT로 삭제 확인합니다.
응답의 `written`, `read`, `cleaned`가 모두 true일 때만 검증 성공입니다.
기존 데이터의 ID나 SQL은 입력받지 않습니다.

운영자가 앱 SIGNING_KEY로 `POST\n/api/diagnostics/database\n<timestamp>`를
HMAC-SHA256 hex 서명해 `x-diagnostic-signature`에 넣고, 밀리초 시각을
`x-diagnostic-timestamp`로 전달합니다. 유효 시간은 60초입니다.
키를 브라우저·Git·팀 채팅에 노출하지 마세요. 공유 링크로 실행하는 기능이 아닙니다.

인증 실패 401, 잘못된 메서드 405, 성공 200, 실패 또는 결과 불명 500입니다.
예외 시 성공으로 표시하지 않습니다. 네트워크/DB 장애로 정리가 실패하면 운영자가
`diagnostic:` 접두사의 테스트 행을 확인하고 정리합니다. 재시도는 새 UUID를 사용합니다.
짧은 유효 시간 안의 재전송도 새 테스트 행을 만들고 정리하며, 기존 데이터에는 영향이 없습니다.

## Function Contract: 운영자 DB 진단

- requirementId: team0-db-roundtrip; exposedName: POST /api/diagnostics/database; contractVersion: 1; status: defined; blockers: []
- purpose: 실제 앱 런타임을 통한 원격 D1 저장·조회·정리 검증.
- invocationSource: 운영자 서명 HTTP 요청; decisionAuthority: 사용자의 team0 DB 검증 요청 및 앱 키 보유 인증.
- principal: 해커톤 운영자; subject: team0 DB의 이 요청이 생성한 테스트 행 하나; executor: team0 Worker.
- audience: 인증된 운영자; inputProvenance: 서명·시각은 운영자, UUID·내용은 서버 생성.
- trustedContextBinding: 앱별 SIGNING_KEY 검증과 배포 설정의 고정 DB 바인딩.
- dataVisibility: 검증 성공 여부만 응답; 기존 DB 데이터와 키는 노출하지 않음.
- actionRole: execute; sideEffects: 테스트 행 삽입 및 해당 행 삭제.
- preconditions: 올바른 서명, 60초 이내 시각, app_records 초기 마이그레이션 적용.
- confirmationOrApproval: 현재 작업에서 사용자가 명시적으로 team0 실제 저장·조회 검증 요청.
- attribution: 운영자 진단 요청이며 고객 또는 매니저 메시지 발송 없음.
- resultSemantics: ok=true는 저장·읽은 값 일치·삭제 후 부재가 모두 검증된 terminal/applied 결과. ok=false,state=unverified 또는 transport failure는 unknown이며 운영자가 잔여 테스트 행을 확인.
- agentConsumers: ALF/CoS 모두 not applicable; 운영자 키 기반 인프라 검증은 에이전트 제품 진입점이 아님. effect=not applicable, trustedContext/authorityAndConfirmation/publicWrapper/implementationHandoff/qaHandoff=None, blockers=[].
