<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Project Outline

타입스크립트와 NestJS를 이용한 온라인 공연 예매 서비스 프로젝트.

### ✅ 필수 기능 구현 리스트
- [x]  로그인 / 회원가입
- [x]  프로필 보기
- [x]  새 공연 등록
- [x]  공연 목록 보기
- [x]  공연 검색하기
- [x]  공연 상세보기
- [x]  좌석을 지정하지 않고 공연 예매하기
- [x]  예매 확인하기

### **🏆** 추가 기능 구현 리스트

- [x]  공연의 좌석 예매 정보 확인하기
- [x]  좌석을 지정하여 예매하기
- [x]  동시성 처리하기
- [x]  예매 취소하기

## Technology Stack

- 프로그래밍 언어: TypeScript, JavaScript (Node.js)
- 프레임워크: Nest.js
- 데이터베이스: TypeORM, AWS RDS
- 버전 관리 시스템: Git
- 개발 도구: Visual Studio Code
- 배포 환경: GitHub
- 테스트 도구: Thunder Client

## Api Specification

[NestJS Project API](https://docs.google.com/spreadsheets/d/1tyKSs7hsI5rO1hGe81_6uIHtnykD5FEchd7Ih8ivjvM/edit?usp=sharing)

## ERD (Entity Relationship Diagram)

[NestJS Project ERD](https://www.erdcloud.com/p/gedfQ9RNgNr4FPrHE)

## Github Rules

- 주요 이슈 커밋 메시지
    - **feat**: 새로운 기능이 추가된 경우
    - **fix**: 버그를 수정한 경우
    - **docs**: 코드 수정 없이 문서만 추가된 경우
    - **style**: 코드 포맷팅을 수정한 경우
    - **chore**: 그 밖의 잡다한 일을 처리한 경우

## Code Convention

```javascript
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "bracketSpacing": true,
  "trailingComma": "none"
}

```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
