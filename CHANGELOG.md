# [0.21.0](https://github.com/Mbanq/core-sdk-js-internal/compare/v0.20.0...v0.21.0) (2025-12-20)


### Features

* card issuing ([70dc0ee](https://github.com/Mbanq/core-sdk-js-internal/commit/70dc0eebac5b0cc29d26c862a864d06440117431))

# [0.20.0](https://github.com/Mbanq/core-sdk-js-internal/compare/v0.19.0...v0.20.0) (2025-12-19)


### Features

* Add command and types for retrieving card authorizations. ([#52](https://github.com/Mbanq/core-sdk-js-internal/issues/52)) ([f78b29b](https://github.com/Mbanq/core-sdk-js-internal/commit/f78b29bfddf8c59997d148a7db738117a2bab936))

# [0.19.0](https://github.com/Mbanq/core-sdk-js-internal/compare/v0.18.0...v0.19.0) (2025-12-18)


### Features

* Add `GetBankDetailsFromRoutingCode` command with new types and tests. ([5dbae5a](https://github.com/Mbanq/core-sdk-js-internal/commit/5dbae5a6bc7cf64952233d7bd3962cfaca86545d))
* add `GetRecentTransactions` command and new transaction type enums ([891956f](https://github.com/Mbanq/core-sdk-js-internal/commit/891956f543a24130c4bf1e543c40d807b590844f))
* Add `GetTransactionById` command, its request/response types, and tests. ([1395697](https://github.com/Mbanq/core-sdk-js-internal/commit/13956977a9ffe2a3dc32e5734acf3c6170ffe1e1))
* Add command and types for deleting fixed deposit accounts. ([5f66c67](https://github.com/Mbanq/core-sdk-js-internal/commit/5f66c679ea3c1b9f0ebe70ecd7b9aaa9f763dd1e))
* add command and types for retrieving a `fixed deposit account` ([2ef1dc4](https://github.com/Mbanq/core-sdk-js-internal/commit/2ef1dc4ee8a6b311d26e831f0499b9bda3d63ade))
* add command and types for updating fixed deposit accounts ([7670eb7](https://github.com/Mbanq/core-sdk-js-internal/commit/7670eb7e98a8cecf0a20fa064d62b0f043d575c0))
* add command, types, and tests for creating fixed deposit accounts ([46b58b1](https://github.com/Mbanq/core-sdk-js-internal/commit/46b58b12a8781648145d83bcc7b87521bb4bde33))
* **internal:** Implement public/internal release separation with build scripts, type definitions, and workflow updates. ([f887872](https://github.com/Mbanq/core-sdk-js-internal/commit/f887872a1fe1c76a4866749cb94fe41699c224c1))

# [0.18.0](https://github.com/mbanq/core-sdk-js/compare/v0.17.0...v0.18.0) (2025-12-09)


### Bug Fixes

* change method for Enable/Disable configuration function ([ef914db](https://github.com/mbanq/core-sdk-js/commit/ef914dba654424aac26e546fdbcdefcf8ef8ad87))
* improve type in accountProduct ([4a02529](https://github.com/mbanq/core-sdk-js/commit/4a025294aed657d0e07a87aeb6d6aa780752ff31))
* Make param configuration in function GetConfiguration to optional ([1a936ea](https://github.com/mbanq/core-sdk-js/commit/1a936ea91966b7463dacc05823d4086b29826a57))


### Features

* Add `CreateAccountProduct` command, types, and tests. ([b353249](https://github.com/mbanq/core-sdk-js/commit/b353249d0df2c20497c91566634d5e35db576f7c))
* Add `GetAccountProductById` command, its response type, and unit tests. ([e108369](https://github.com/mbanq/core-sdk-js/commit/e1083690811eb89422412be27b5971d7afbdbaf6))
* Add `GetAllAccountProducts` command, types, and tests for retrieving all account products. ([cb39311](https://github.com/mbanq/core-sdk-js/commit/cb39311d8b7db1e41ac0194ae967656740520979))
* Add functionGetCompletedTransactions and  Update and expand REST commands and types for various entities, add transaction tests, and refine build outputs. ([5b68637](https://github.com/mbanq/core-sdk-js/commit/5b68637ad4cd6051e0c7311429ed7e40d006a78c))
* Add GetPendingTransactions command and types, and refactor command exports. ([2544961](https://github.com/mbanq/core-sdk-js/commit/2544961717876a04e793a8423bd2cecebb76a1fa))
* Add global configuration and account product commands and types, refactoring exports. ([d2649a8](https://github.com/mbanq/core-sdk-js/commit/d2649a86740a3f41198a22d1761af718397d0496))
* Add global configuration command with associated types and tests. ([47fcbb6](https://github.com/mbanq/core-sdk-js/commit/47fcbb69a7c3cb9e54f6514c6ae2d7132706946b))
* Add global configuration management commands and account product features. ([2d5e87d](https://github.com/mbanq/core-sdk-js/commit/2d5e87dfcf36621d4259e01c42880ff9441aeb42))
* implement `UpdateAccountProduct` command, types, and tests for savings account products. ([232276a](https://github.com/mbanq/core-sdk-js/commit/232276aa46aa87d101ea17966394476535f87ef1))
* introduce dedicated account statement commands and types, refactoring related logic from account commands. ([1432d76](https://github.com/mbanq/core-sdk-js/commit/1432d762c115c41a62823d12433d2410e5c4cd2f))

# [0.17.0](https://github.com/mbanq/core-sdk-js/compare/v0.16.0...v0.17.0) (2025-12-08)


### Features

* client classification ([#46](https://github.com/mbanq/core-sdk-js/issues/46)) ([5b18cf6](https://github.com/mbanq/core-sdk-js/commit/5b18cf6f80e7f50554b1b576fa438b70f84c0859))

# [0.16.0](https://github.com/mbanq/core-sdk-js/compare/v0.15.0...v0.16.0) (2025-12-04)


### Features

* Add `DownloadAccountStatement` command to download account statements and include its tests. ([7ecdf0d](https://github.com/mbanq/core-sdk-js/commit/7ecdf0dbf4bdda55c4245c52276063b7a81211c5))

# [0.15.0](https://github.com/mbanq/core-sdk-js/compare/v0.14.0...v0.15.0) (2025-12-04)


### Features

* add `HoldAmount` command, types, and tests, and export `ScheduleAccountClosure` for account management. ([6e9bdcf](https://github.com/mbanq/core-sdk-js/commit/6e9bdcfdd1ab78cd9bc26313b40698918b09b817))
* add account statement generation command, types, and tests ([642fee8](https://github.com/mbanq/core-sdk-js/commit/642fee8ce8473f9d319ac404841eb8ebefcb141a))
* add command and tests for scheduling savings account closure ([53d9e7f](https://github.com/mbanq/core-sdk-js/commit/53d9e7f9d5638ee4d7ef641b2395b2933cd1ea77))

# [0.14.0](https://github.com/mbanq/core-sdk-js/compare/v0.13.0...v0.14.0) (2025-12-03)


### Features

* Add `CreateAndActivateAccount` command, types, tests, and documentation for account creation and activation ([#38](https://github.com/mbanq/core-sdk-js/issues/38)) ([090f8fa](https://github.com/mbanq/core-sdk-js/commit/090f8fa08a4d3dd775c79d43add6f1c67dae7e93))
* Add `CreateAndActivateAccount` command, types, tests, and documentation for account creation and activation ([#42](https://github.com/mbanq/core-sdk-js/issues/42)) ([e19736e](https://github.com/mbanq/core-sdk-js/commit/e19736e939ae3693193816601c0673dfedcf9acc))

# [0.13.0](https://github.com/mbanq/core-sdk-js/compare/v0.12.0...v0.13.0) (2025-12-03)


### Features

* Add `CreateAndActivateAccount` command, types, tests, and documentation for account creation and activation ([#37](https://github.com/mbanq/core-sdk-js/issues/37)) ([9f52988](https://github.com/mbanq/core-sdk-js/commit/9f52988418306df62a34d8b341e6b8a991a41cfe))

# [0.12.0](https://github.com/mbanq/core-sdk-js/compare/v0.11.0...v0.12.0) (2025-12-02)


### Features

* client addresses ([158164d](https://github.com/mbanq/core-sdk-js/commit/158164df423907678c8f3f66bbac75d1483e9d41))

# [0.11.0](https://github.com/mbanq/core-sdk-js/compare/v0.10.0...v0.11.0) (2025-12-02)


### Features

* card product ([2696d01](https://github.com/mbanq/core-sdk-js/commit/2696d01c469cfa726ecff50cdbf29dc7f5a6c308))
* MC-30232-MC-30231-MC-30234-MC-30230-create-update-get-card-product ([#36](https://github.com/mbanq/core-sdk-js/issues/36)) ([8ca0bfa](https://github.com/mbanq/core-sdk-js/commit/8ca0bfa9c54e5a8a937569c81c7c472869ae20bd))

# [0.10.0](https://github.com/mbanq/core-sdk-js/compare/v0.9.0...v0.10.0) (2025-11-28)


### Bug Fixes

* add tests for the GetUserDetail command. ([02584fd](https://github.com/mbanq/core-sdk-js/commit/02584fd759dac7abb1dfc4ed2cc68840534b1a9c))


### Features

* MC-30239 implement function enable self service access access ([#33](https://github.com/mbanq/core-sdk-js/issues/33)) ([42c8c54](https://github.com/mbanq/core-sdk-js/commit/42c8c54bb8dd9919d3f1f9e8a585b4f0b672c12b))
* MC-30240 implement function update self service user ([#34](https://github.com/mbanq/core-sdk-js/issues/34)) ([e270613](https://github.com/mbanq/core-sdk-js/commit/e2706138d780172aaf779fdfafc1e303d4764212))
* MC-30241 implement function delete self service user ([#35](https://github.com/mbanq/core-sdk-js/issues/35)) ([ac27df6](https://github.com/mbanq/core-sdk-js/commit/ac27df63f318a21585f41c314c26b84610758ab0))

# [0.9.0](https://github.com/mbanq/core-sdk-js/compare/v0.8.0...v0.9.0) (2025-11-28)


### Features

* add `ApproveRejectClientDocument` command for managing client identifier document statuses. ([#32](https://github.com/mbanq/core-sdk-js/issues/32)) ([26e239c](https://github.com/mbanq/core-sdk-js/commit/26e239c3de867623c3e90f9d9cefff4e10623ee3))

# [0.8.0](https://github.com/mbanq/core-sdk-js/compare/v0.7.0...v0.8.0) (2025-11-27)


### Bug Fixes

* enhance error handling tests to cover diverse message inputs and various Axios response formats, and ensure all errors are converted to CommandError. ([16311f0](https://github.com/mbanq/core-sdk-js/commit/16311f0cfa6ab150e75204bf3dd4d8edaa9452e1))


### Features

* MC-30237 Implement function Delete Client Document Record ([#30](https://github.com/mbanq/core-sdk-js/issues/30)) ([0a3892e](https://github.com/mbanq/core-sdk-js/commit/0a3892eda54854a5ad49edb7e0258db6e5db6319))

# [0.7.0](https://github.com/mbanq/core-sdk-js/compare/v0.6.0...v0.7.0) (2025-11-27)


### Features

* list client document commands, types, and tests, and update RE… ([#29](https://github.com/mbanq/core-sdk-js/issues/29)) ([a870ee3](https://github.com/mbanq/core-sdk-js/commit/a870ee30b54ca76b2e680a83f56e593cb3f44c80))

# [0.6.0](https://github.com/mbanq/core-sdk-js/compare/v0.5.3...v0.6.0) (2025-11-20)


### Features

* MC-29953-upload-client-identifier-document ([#27](https://github.com/mbanq/core-sdk-js/issues/27)) ([53d0750](https://github.com/mbanq/core-sdk-js/commit/53d0750a4046da44c201231ce6b5f0099d5f78b5))

## [0.5.3](https://github.com/mbanq/core-sdk-js/compare/v0.5.2...v0.5.3) (2025-11-20)


### Bug Fixes

* Implement core sdk for activate with verify client ([#28](https://github.com/mbanq/core-sdk-js/issues/28)) ([500153b](https://github.com/mbanq/core-sdk-js/commit/500153b552d9c3cb808b94c4a1ffb2d691b75990))
* MC-29952-create-client-identitifier ([835e8e1](https://github.com/mbanq/core-sdk-js/commit/835e8e1e89acf7da4d4f526ea7209e9c8f2037ed))
* remove Fluent pattern and clean up code ([#25](https://github.com/mbanq/core-sdk-js/issues/25)) ([756b212](https://github.com/mbanq/core-sdk-js/commit/756b212ec332ea230acc7a95d7130d3bec4df029))

## [0.5.2](https://github.com/mbanq/core-sdk-js/compare/v0.5.1...v0.5.2) (2025-09-04)


### Bug Fixes

* remove cleanup axios error ([4248266](https://github.com/mbanq/core-sdk-js/commit/4248266976acaec53465ebc434dd5a73797cde19))
* wrong method of get user detail ([e9ce5b2](https://github.com/mbanq/core-sdk-js/commit/e9ce5b29c787d575307a393da3f5395e5f1135ca))

## [0.5.1](https://github.com/mbanq/core-sdk-js/compare/v0.5.0...v0.5.1) (2025-09-04)


### Bug Fixes

* expose type of user feature ([0b27b50](https://github.com/mbanq/core-sdk-js/commit/0b27b50be3a446d638fc9693de0dce0c68c2b8d5))

# [0.5.0](https://github.com/mbanq/core-sdk-js/compare/v0.4.2...v0.5.0) (2025-09-04)


### Bug Fixes

* add unit test for user feature ([bfc20d2](https://github.com/mbanq/core-sdk-js/commit/bfc20d29d8920f10953f7a8e9ae8ccd1b6244857))


### Features

* now support new feature User ([bc1f3d2](https://github.com/mbanq/core-sdk-js/commit/bc1f3d23f3e2cf037a861c529e23710379bf5fb9))

## [0.4.2](https://github.com/mbanq/core-sdk-js/compare/v0.4.1...v0.4.2) (2025-09-04)


### Bug Fixes

* fix error on handle axios error and enhanced type of payment and fix logic of fetch all payments ([e804689](https://github.com/mbanq/core-sdk-js/commit/e8046897a1d0523a5eef3f4f60e0dac93235a81b))
* fix unit test of payment feature ([c9cbc7d](https://github.com/mbanq/core-sdk-js/commit/c9cbc7d279a5a3eab0140ccf8cf7d8199579f6c4))

## [0.4.1](https://github.com/mbanq/core-sdk-js/compare/v0.4.0...v0.4.1) (2025-09-03)


### Bug Fixes

* make config param optional in GetPayments ([6b960c7](https://github.com/mbanq/core-sdk-js/commit/6b960c78a39db5cc039a5444c87b3cfd0b7eeaf3))

# [0.4.0](https://github.com/mbanq/core-sdk-js/compare/v0.3.0...v0.4.0) (2025-09-01)


### Features

* completed recipient API with comprehensive Zod-based validation and Typescript types ([3845c4f](https://github.com/mbanq/core-sdk-js/commit/3845c4fd9a9e43f70459e8cc4580ace8695d8bb7))

# [0.3.0](https://github.com/mbanq/core-sdk-js/compare/v0.2.1...v0.3.0) (2025-08-28)


### Bug Fixes

* update delete account feature ([c2568d1](https://github.com/mbanq/core-sdk-js/commit/c2568d1f2b75ddb47e63444e2f1825f3b27b0021))
* update type account id in client/index.ts ([52f767f](https://github.com/mbanq/core-sdk-js/commit/52f767fe1bcdd31ab44aac7dc346f971d6ee9f3f))
* update type of accountId on each function in account feature ([ea17768](https://github.com/mbanq/core-sdk-js/commit/ea177684972e280aeacf800b01bc70f56743cafc))


### Features

* completed saving account of client API with comprehensive Zod-based validation and Typescript types ([0fd1129](https://github.com/mbanq/core-sdk-js/commit/0fd1129c6a264360b2d923d69644ec706ec87762))

## [0.2.1](https://github.com/mbanq/core-sdk-js/compare/v0.2.0...v0.2.1) (2025-08-28)


### Bug Fixes

* Limit should be 0 or greater ([42c2296](https://github.com/mbanq/core-sdk-js/commit/42c22963959f392917b46eb14df68dfdb709bd59))

# [0.2.0](https://github.com/mbanq/core-sdk-js/compare/v0.1.1...v0.2.0) (2025-08-26)


### Features

* completed client API with comprehensive Zod-based validation and Typescript types ([2e315a0](https://github.com/mbanq/core-sdk-js/commit/2e315a073100ea2e9f94bcd524dff4f9551ccf2f))

## [0.1.1](https://github.com/mbanq/core-sdk-js/compare/v0.1.0...v0.1.1) (2025-08-26)


### Bug Fixes

* Update description ([0aea4de](https://github.com/mbanq/core-sdk-js/commit/0aea4dec36e396d37b111cc5b7e057df8bac853d))

# [0.1.0](https://github.com/mbanq/core-sdk-js/compare/v0.0.0...v0.1.0) (2025-08-26)


### Bug Fixes

* add default dateFormat ([ab2abeb](https://github.com/mbanq/core-sdk-js/commit/ab2abebb453793a60c856692b1fdb1bb144123a7))
* Add description to limit param ([cfc8e6c](https://github.com/mbanq/core-sdk-js/commit/cfc8e6c7a0fbf08f0a4f3a30be2d32e29d821b02))
* add missing default query parameters for list payments ([8a9f257](https://github.com/mbanq/core-sdk-js/commit/8a9f257b4c4987d859ee090fb264b1986e6eea6a))
* complete unit test , type safety and update document ([b665cf6](https://github.com/mbanq/core-sdk-js/commit/b665cf6863b02b14141186a96c9b303f5e4d2bf8))
* correct url of operation payment and update unit test ([0ebbc79](https://github.com/mbanq/core-sdk-js/commit/0ebbc7919687ff6e8c82cd82248ee31a2850a0cb))
* downgrade zod to v3 ([01b3cbb](https://github.com/mbanq/core-sdk-js/commit/01b3cbb21a571fdbcf5d0e08fbe95d5df00845f8))
* expose more type and update document ([852c4da](https://github.com/mbanq/core-sdk-js/commit/852c4dacfa9ccfb9de7e4f5f31b070bbc070203e))
* expose PaymentFilterShape ([7d5300c](https://github.com/mbanq/core-sdk-js/commit/7d5300ca95e82d4b0cc5854ca535bcc7b1ba7be0))
* expose type of zod ([ee34b3a](https://github.com/mbanq/core-sdk-js/commit/ee34b3ab2638fd57b7209bffb59ec16837d4608c))
* fix build ([42a4286](https://github.com/mbanq/core-sdk-js/commit/42a42865f9688f595e80b8583086957060f4dd71))
* fix error of payment operation and improve type schema ([7b0ad2a](https://github.com/mbanq/core-sdk-js/commit/7b0ad2ac7e6eac274e52806327c7e9e047887e37))
* fix release ([cf19533](https://github.com/mbanq/core-sdk-js/commit/cf195337dcb8ac4a8c3e1781f1a52f11f54793e5))
* fix release ([4ae13c0](https://github.com/mbanq/core-sdk-js/commit/4ae13c063ac85f937be8008acbcd3aad7749177e))
* fix release ([40f31f2](https://github.com/mbanq/core-sdk-js/commit/40f31f290bcd91ed5c97e5fc62ff02bde0147f0f))
* fix release ([93bf430](https://github.com/mbanq/core-sdk-js/commit/93bf4300e3edd577364b8ad99407c63354a9ae1d))
* init release alpha version ([5dd933d](https://github.com/mbanq/core-sdk-js/commit/5dd933d1b93bfa294f96a29c2ec64d55feb78d21))
* missing library zod ([1b1adac](https://github.com/mbanq/core-sdk-js/commit/1b1adac166a06aab0524d45e4fb1e8096e5ada54))
* now all Payment Operation will end with execute() ([b40a6ea](https://github.com/mbanq/core-sdk-js/commit/b40a6ead9ba283f68959028560b98e31f2f283e5))
* remove sls-utils and add option traceId in config ([ce2bdc7](https://github.com/mbanq/core-sdk-js/commit/ce2bdc785b2ee965e41c97c195379d5171e08635))
* update document ([46ee4f5](https://github.com/mbanq/core-sdk-js/commit/46ee4f5d23ac52ef935926c366f9a5a04b0ddffd))
* update README and package.json ([b29320b](https://github.com/mbanq/core-sdk-js/commit/b29320bb19610fd86697aad813dc1cc0b2836293))
* update unit test of transfer ([587f3fe](https://github.com/mbanq/core-sdk-js/commit/587f3fe97d292687a5f5af860663d6295bdd019b))


### Features

* completed payment API with comprehensive Zod-based validation and TypeScript types and bearer token authentication support ([36ccbb3](https://github.com/mbanq/core-sdk-js/commit/36ccbb3708dc8f90d1c318836c5cc47caf55f857))
* init project ([8fe3c7e](https://github.com/mbanq/core-sdk-js/commit/8fe3c7ef915ffa5a2895f564aa474a9b45b828c6))
* now support get payments using command and allow to get all records ([06ab3bb](https://github.com/mbanq/core-sdk-js/commit/06ab3bbd6a71cf8f00b8008e76b7f666f3073bb5))
