# SKKU 2026 team0 — 준비위 테스트용

참가팀 team1~team11과 분리된 준비위 연습용 앱입니다. 실제 행사 전에 코드 수정·배포·앱 실행을 연습할 수 있습니다.

- 레포: https://github.com/skku-channel-hackathon-2026/team0
- 서버: https://skku-team0.skku-hackathon-2026-b.workers.dev
- 전용 D1: `skku-team0` (`00c5d372-f16d-468f-b024-ada1f9471f88`)
- 앱: `SKKU 2026 Team0` (`6aabf173eb117604e602`)
- 앱 관리: https://channel.works/-/developers/apps/6aabf173eb117604e602/general
- 공통 채널: 성균관대 해커톤
- 테스트 그룹: https://channel.works/xd1l0/team-chat/groups/609235

## 테스트 순서

1. 성균관대 해커톤 채널에 멤버로 참여합니다.
2. 공개 `앱_개발_검증` 그룹에서 `/tutorial`을 입력하고 `SKKU 2026 Team0`을 선택합니다.
3. 실행 후 매니저·봇 전송 버튼으로 테스트할 수 있습니다. 메시지는 공통 테스트 그룹에 남습니다.
4. 코드 개발은 이 레포의 Admin 권한과 team0 앱 소유자 권한을 받은 뒤 진행합니다. main 변경은 자동 배포됩니다.

봇 전송은 비공개 그룹에서 지원하지 않습니다. WAM이 닫힌 것만으로 성공을 판단하지 말고 실제 메시지를 확인하세요.
DB 변경은 `cloudflare/migrations/`의 SQL로 관리하고, 원격 적용은 운영자에게 요청하세요.
[개발 안내](HACKATHON.ko.md)를 참고하세요. 기존 `docs/desk-qa.md`는 team1 파일럿 기록입니다.

## PR부터 배포까지 확인하기

1. 새 브랜치에서 변경하고 main 대상 PR을 만듭니다.
2. PR의 CI가 통과했는지 확인한 뒤 main에 머지합니다.
3. main CI가 성공하면 웹훅이 운영자 배포 시스템을 즉시 실행해 빌드·배포합니다. GitHub 실행 대기와 빌드 시간은 필요합니다.
4. 실제 앱 실행과 `/api/health`, `/api/ready`를 확인합니다. PR CI 성공만으로 배포 완료를 판단하지 마세요.

준비위 배포 점검 파일: [deployment-check.txt](https://skku-team0.skku-hackathon-2026-b.workers.dev/resource/wam/tutorial/deployment-check.txt)

이 파일의 값 `skku-team0-automatic-ci-deployment-2026-09-19`는 PR 변경이 실제 배포 파일에 반영됐는지 확인하기 위한 표식입니다.

## DB 저장·조회 검증

[PR #3](https://github.com/skku-channel-hackathon-2026/team0/pull/3)에서 실제 앱 런타임 → 원격 D1 저장·조회·삭제와 동시 요청을 검증했습니다. 원격 DB의 잔여 테스트 행도 0건으로 확인했습니다. Desk UI 저장 기능 검증과는 별개입니다.
서명 인증이 필요한 운영자 진단 방법은 [DB 진단 안내](docs/database-diagnostic.md)를 참고하세요. 다른 팀에는 이 진단 경로가 추가되어 있지 않습니다.
