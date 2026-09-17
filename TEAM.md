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
4. 코드 개발은 이 레포의 Write 권한과 team0 앱 개발 권한을 받은 뒤 진행합니다. main 변경은 자동 배포됩니다.

봇 전송은 비공개 그룹에서 지원하지 않습니다. WAM이 닫힌 것만으로 성공을 판단하지 말고 실제 메시지를 확인하세요.
DB 변경은 `cloudflare/migrations/`의 SQL로 관리하고, 원격 적용은 운영자에게 요청하세요.
[개발 안내](HACKATHON.ko.md)를 참고하세요. 기존 `docs/desk-qa.md`는 team1 파일럿 기록입니다.
