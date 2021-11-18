<h1 align="center">
	🔫 MAFIA31
</h1>

<img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/boostcampwm-2021/web31-MAFIA31&count_bg=%234E416D&title_bg=%23727272&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" alt="hits" align='right' style='margin-left:5px;' />

<img src="https://img.shields.io/badge/version-v0.0.1-blue" alt="version0.0.1" align='right' style='margin-left:5px;'/>

🔗 배포: <http://mafia31.kro.kr>

<br/>

## 👋 소개

마피아 게임을 웹에서 설치 없이 간편하게 즐겨보세요! 🔫

귀여운 자체 제작 캐릭터와 애니메이션이 기다리고 있어요 💜

<br/><br/><br/>

## ✨ 기능

- 👤 깃헙 OAuth 로그인
- ⭐ 게임 이벤트 애니메이션
- ⏰ 실시간 타이머 기반 밤/낮 테마 전환
- 💬 밤 / 낮 및 직업별 실시간 채팅
- 🌞 낮 유저별 투표
- 🌝 밤 직업별 다양한 상호작용
- 🥇 유저별 랭킹 시스템
- 📊 유저별 통계 시스템

<br/><br/><br/>

## 🛠 기술 스택

![기술 스택](https://user-images.githubusercontent.com/69030160/142336884-078c4145-1124-4cfb-b52d-d0f2483aa0d5.png)

<br/><br/><br/>

## 📂 프로젝트 구조

```
📁 MAFIA31
├── README.md
├── lerna.json
├── package.json
└── 📁 packages
    ├── 📁 client
    │   ├── 📁 public
    │   ├── package.json
    │   └── src
    │       ├── App.tsx
    │       ├── 📁 components
    │       ├── 📁 constants
    │       ├── 📁 containers
    │       ├── 📁 contexts
    │       ├── 📁 hooks
    │       ├── 📁 pages
    │       ├── 📁 styles
    │       ├── 📁 templates
    │       ├── 📁 types
    │       └── 📁 utils
    ├── 📁 domain
    │   ├── 📁 constants
    │   ├── 📁 types
    │   └── package.json
    └── 📁 server
        ├── 📁 api
        ├── 📁 config
        ├── 📁 constants
        ├── 📁 loaders
        ├── 📁 models
        ├── 📁 sockets
        ├── 📁 stores
        └── package.json

```

<br/><br/><br/>

## 🗃 ERD

![ERD](https://i.imgur.com/jaNSi1H.png)

<br/><br/><br/>

## 📜 설치 가이드

### 프로젝트 가져오기

```
git clone https://github.com/boostcampwm-2021/web31-MAFIA31.git
```

### 코드 실행하기

`packages/client/.env`와 `packages/server/config/*.config.json` 설정 후

```
yarn install
yarn start:dev
```

코드 실행후 http://localhost:3000 에서 확인 가능합니다!

<br/><br/><br/>

## 🤙🏻 협업 내용

- [그라운드 룰][ground-rule]
- [컨벤션][convention]
- [브랜치 전략][branch-strategy]
- [팀 노션][notion]
- [위키][wiki]
- [백로그][backlog]
- [피그마][figma]

<br/><br/><br/>

## 👩🏻‍💻 팀원

|                      **donggoolosori**                      |                      **dailyco**                      |                      **Kim-Hyunjo**                      |                      **binimini**                      |
| :---------------------------------------------------------: | :---------------------------------------------------: | :------------------------------------------------------: | :----------------------------------------------------: |
| <img src="https://github.com/donggoolosori.png" width="80"> | <img src="https://github.com/dailyco.png" width="80"> | <img src="https://github.com/Kim-Hyunjo.png" width="80"> | <img src="https://github.com/binimini.png" width="80"> |
|            [김동준](https://github.com/dailyco)             |         [김유진](https://github.com/dailyco)          |         [김현조](https://github.com/Kim-Hyunjo)          |         [민수빈](https://github.com/binimini)          |

[ground-rule]: https://github.com/boostcampwm-2021/web31-MAFIA31/wiki/%F0%9F%A4%99%F0%9F%8F%BB-%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0
[convention]: https://github.com/boostcampwm-2021/web31-MAFIA31/wiki/%E2%9C%A8-%EC%BB%A8%EB%B2%A4%EC%85%98
[branch-strategy]: https://github.com/boostcampwm-2021/web31-MAFIA31/wiki/%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5
[notion]: https://seed-cry-ce7.notion.site/QUARTER-f5f30a4b31264ae48129812cfb6e67f0
[wiki]: https://github.com/boostcampwm-2021/web31-MAFIA31/wiki
[backlog]: https://www.notion.so/1661832777304e1cb5b174e5cdf88828?v=60f48437c978401988726113f48ec8f7
[figma]: https://www.figma.com/file/t5XZb9VtAkkOFe5EK2taaH/MAFIA?node-id=0%3A1
