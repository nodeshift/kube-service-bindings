# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/nodeshift/kube-service-bindings/compare/v1.0.0...v2.0.0) (2022-09-06)


### ⚠ BREAKING CHANGES

* drop Node.js 12

### Bug Fixes

* upgrade eslint from 8.17.0 to 8.18.0 ([#53](https://github.com/nodeshift/kube-service-bindings/issues/53)) ([24d7fa6](https://github.com/nodeshift/kube-service-bindings/commit/24d7fa6d53f836ebf06b1ae5511c62c7771c9e71))
* upgrade eslint from 8.18.0 to 8.19.0 ([4164de7](https://github.com/nodeshift/kube-service-bindings/commit/4164de7a46051640aba1285d2e65b149e958d6ae))
* upgrade eslint from 8.19.0 to 8.20.0 ([fe94fed](https://github.com/nodeshift/kube-service-bindings/commit/fe94fed19ffe0bc8f2c2cf3ef8b8b024ec5a8e25))
* upgrade eslint from 8.20.0 to 8.21.0 ([e1e72ce](https://github.com/nodeshift/kube-service-bindings/commit/e1e72ce888417474eec24aaa7c687ff1fce4504b))
* upgrade eslint from 8.21.0 to 8.22.0 ([ded904e](https://github.com/nodeshift/kube-service-bindings/commit/ded904ec0a75b4a4dc3c8fb1a808da6c9b8f2cbd))
* upgrade eslint-plugin-n from 15.2.1 to 15.2.2 ([#49](https://github.com/nodeshift/kube-service-bindings/issues/49)) ([d215ef3](https://github.com/nodeshift/kube-service-bindings/commit/d215ef374cfe1e068d161bf9a8316fa6cfb4bcb1))
* upgrade eslint-plugin-n from 15.2.2 to 15.2.3 ([#52](https://github.com/nodeshift/kube-service-bindings/issues/52)) ([5221c32](https://github.com/nodeshift/kube-service-bindings/commit/5221c32dfaba9f6a7d6fcbc93dbc7dc2fb12d25c))
* upgrade eslint-plugin-n from 15.2.3 to 15.2.4 ([44833b0](https://github.com/nodeshift/kube-service-bindings/commit/44833b05a4fc498464506e3ed79b151b5ea183cd))


* drop Node.js 12 ([6652a16](https://github.com/nodeshift/kube-service-bindings/commit/6652a161c90838fea4afef288cbd3ff66a5bd390))

## [1.0.0](https://github.com/nodeshift/kube-service-bindings/compare/v0.0.10...v1.0.0) (2022-06-20)

### [0.0.10](https://github.com/nodeshift/kube-service-bindings/compare/v0.0.9...v0.0.10) (2022-06-20)


### Features

* add support for odbc client with mysql ([c460993](https://github.com/nodeshift/kube-service-bindings/commit/c460993d2784802b4ba1451af06f6d1e359d1721))
* add support for using odbc ([1935b5f](https://github.com/nodeshift/kube-service-bindings/commit/1935b5f94d1309e90fa5dae184977f486f1b9567))
* adding mysql client support with tests and all ([#39](https://github.com/nodeshift/kube-service-bindings/issues/39)) ([1087630](https://github.com/nodeshift/kube-service-bindings/commit/10876302ff7d587e57b2cf471441f95944fbd6ad))
* upgrade eslint from 7.32.0 to 8.8.0 ([#33](https://github.com/nodeshift/kube-service-bindings/issues/33)) ([9a6081c](https://github.com/nodeshift/kube-service-bindings/commit/9a6081c0c6a9c657b01e85743a3de25dc65c290a))


### Bug Fixes

* add mysql to list of clients for mysql db ([751d9bc](https://github.com/nodeshift/kube-service-bindings/commit/751d9bce3c2fb867550c692f4e979203783d7a2d))
* commiting package-lock.json file ([#30](https://github.com/nodeshift/kube-service-bindings/issues/30)) ([37b2d4f](https://github.com/nodeshift/kube-service-bindings/commit/37b2d4f0f6f0d4e6e2968fad2ca528e2277fb0fe))
* upgrade mocha from 9.2.1 to 9.2.2 ([#32](https://github.com/nodeshift/kube-service-bindings/issues/32)) ([e11f3ca](https://github.com/nodeshift/kube-service-bindings/commit/e11f3ca1802337b4b5aa7b9404ec971415175429))

### [0.0.9](https://github.com/nodeshift/kube-service-bindings/compare/v0.0.8...v0.0.9) (2022-03-08)

### 0.0.8 (2022-02-21)


### Features


### Bug Fixes

* mongodb client username binding fix ([#27](https://github.com/nodeshift/kube-service-bindings/issues/27)) ([d3ef369](https://github.com/nodeshift/kube-service-bindings/commit/d3ef3696102d6e7fc334391e00e8f3f12e572b1c))

### 0.0.7 (2022-02-17)


### Features

* improve mongo support ([#25](https://github.com/nodeshift/kube-service-bindings/issues/25)) ([2b183d4](https://github.com/nodeshift/kube-service-bindings/commit/2b183d4a069d8d9f8aa8bed093e683facf07b702))


### Bug Fixes


### 0.0.6 (2022-02-16)


### Features

* add mongodb client ([c64f925](https://github.com/nodeshift/kube-service-bindings/commit/c64f925e0aa5ce213e1040b4433b628ed5c573d5))


### Bug Fixes


### 0.0.5 (2022-01-20)


### Features

* add initial tests ([d9c601e](https://github.com/nodeshift/kube-service-bindings/commit/d9c601e6f1aacfc65aaff131ad4b5c22df32b711))
* add node-rdkafka return type in typings ([d60bc06](https://github.com/nodeshift/kube-service-bindings/commit/d60bc066d7b1119d84edf1be48e8d00bfdb1f820))
* add support for kafkajs ([27a590d](https://github.com/nodeshift/kube-service-bindings/commit/27a590d4c793267063818face6e6f829afcbe0a9))
* basic support for postgressql and pg client ([84fa2b4](https://github.com/nodeshift/kube-service-bindings/commit/84fa2b496e277d00779d3b7ebaa26d4fd180e9e6))
* initial support for redis ([975f5bf](https://github.com/nodeshift/kube-service-bindings/commit/975f5bf3cd9ff5da46ebb24b8cdecdf78a3c0c8b))
* initial typings ([7f1ca7a](https://github.com/nodeshift/kube-service-bindings/commit/7f1ca7adfc37ecfed5e704f26849bc84b9901ab0))


### Bug Fixes

* add coveralls ([bff135d](https://github.com/nodeshift/kube-service-bindings/commit/bff135d08d2ca05f0db97fece3cbd2f6da017005))
* add github action to build/test ([ba7bdf0](https://github.com/nodeshift/kube-service-bindings/commit/ba7bdf053abc33347ceba47a63e3ce0af9a35d8c))
* add missing files to publish ([b312624](https://github.com/nodeshift/kube-service-bindings/commit/b3126248821eb3a0fe46c32cea2164a7596a12a5))
* add typings key to package ([0018ebb](https://github.com/nodeshift/kube-service-bindings/commit/0018ebbe71304ad0cbca4c95b4a602aa6c339f37))
* add typings to package.files ([693b0de](https://github.com/nodeshift/kube-service-bindings/commit/693b0de6a50354a3d885604dec7eab04b0d383ba))
* fixup actions formatting ([3a3a268](https://github.com/nodeshift/kube-service-bindings/commit/3a3a2681550497929cddc88a7c33774c539d6b63))
* include clients directory in package ([4c5b893](https://github.com/nodeshift/kube-service-bindings/commit/4c5b893a993391f5ffdbaf150adf67e12db2e709))
* package.json to reduce vulnerabilities ([#9](https://github.com/nodeshift/kube-service-bindings/issues/9)) ([04768b4](https://github.com/nodeshift/kube-service-bindings/commit/04768b40fbacb3c5f76e50dcd5829a8e740558e6))
* refactor to extract client definitions ([b23017c](https://github.com/nodeshift/kube-service-bindings/commit/b23017ccb78e4f9293430898e40a4cc31ddd675f))
* remove optional chaining to support nodejs 12 ([6d58d92](https://github.com/nodeshift/kube-service-bindings/commit/6d58d922ac9c679afbedc781577e54d5821f6369))
* repo maintenance ([01db019](https://github.com/nodeshift/kube-service-bindings/commit/01db019b22f60c3cdadb733a42818f50683ebdbe))
* strip out clients as dev deps for now ([47ebcb2](https://github.com/nodeshift/kube-service-bindings/commit/47ebcb22d8e30a752ce24e7d5a5e5577dcdb47aa))
* switch to npm install ([14dfae4](https://github.com/nodeshift/kube-service-bindings/commit/14dfae49107a24e531c55d0aac1fe94512ea800d))
* trim newlines from file values ([91c1f66](https://github.com/nodeshift/kube-service-bindings/commit/91c1f667c795f2c90dd1961bc1bfac9afac7bcbb))
* typings do not need module declaration ([c3f27d7](https://github.com/nodeshift/kube-service-bindings/commit/c3f27d72ed7edb5d4f21bc5ee3fc780550c6e3af))

### 0.0.4 (2021-12-07)


### Features

* basic support for postgressql and pg client ([84fa2b4](https://github.com/nodeshift/kube-service-bindings/commit/84fa2b496e277d00779d3b7ebaa26d4fd180e9e6))


### Bug Fixes

### 0.0.3 (2021-06-14)


### Features

* add initial tests ([d9c601e](https://github.com/nodeshift/kube-service-bindings/commit/d9c601e6f1aacfc65aaff131ad4b5c22df32b711))
* add node-rdkafka return type in typings ([d60bc06](https://github.com/nodeshift/kube-service-bindings/commit/d60bc066d7b1119d84edf1be48e8d00bfdb1f820))
* add support for kafkajs ([27a590d](https://github.com/nodeshift/kube-service-bindings/commit/27a590d4c793267063818face6e6f829afcbe0a9))
* initial typings ([7f1ca7a](https://github.com/nodeshift/kube-service-bindings/commit/7f1ca7adfc37ecfed5e704f26849bc84b9901ab0))


### Bug Fixes

* add coveralls ([bff135d](https://github.com/nodeshift/kube-service-bindings/commit/bff135d08d2ca05f0db97fece3cbd2f6da017005))
* add github action to build/test ([ba7bdf0](https://github.com/nodeshift/kube-service-bindings/commit/ba7bdf053abc33347ceba47a63e3ce0af9a35d8c))
* add missing files to publish ([b312624](https://github.com/nodeshift/kube-service-bindings/commit/b3126248821eb3a0fe46c32cea2164a7596a12a5))
* add typings key to package ([0018ebb](https://github.com/nodeshift/kube-service-bindings/commit/0018ebbe71304ad0cbca4c95b4a602aa6c339f37))
* add typings to package.files ([693b0de](https://github.com/nodeshift/kube-service-bindings/commit/693b0de6a50354a3d885604dec7eab04b0d383ba))
* fixup actions formatting ([3a3a268](https://github.com/nodeshift/kube-service-bindings/commit/3a3a2681550497929cddc88a7c33774c539d6b63))
* include clients directory in package ([4c5b893](https://github.com/nodeshift/kube-service-bindings/commit/4c5b893a993391f5ffdbaf150adf67e12db2e709))
* refactor to extract client definitions ([b23017c](https://github.com/nodeshift/kube-service-bindings/commit/b23017ccb78e4f9293430898e40a4cc31ddd675f))
* repo maintenance ([01db019](https://github.com/nodeshift/kube-service-bindings/commit/01db019b22f60c3cdadb733a42818f50683ebdbe))
* strip out clients as dev deps for now ([47ebcb2](https://github.com/nodeshift/kube-service-bindings/commit/47ebcb22d8e30a752ce24e7d5a5e5577dcdb47aa))
* switch to npm install ([14dfae4](https://github.com/nodeshift/kube-service-bindings/commit/14dfae49107a24e531c55d0aac1fe94512ea800d))
* typings do not need module declaration ([c3f27d7](https://github.com/nodeshift/kube-service-bindings/commit/c3f27d72ed7edb5d4f21bc5ee3fc780550c6e3af))
