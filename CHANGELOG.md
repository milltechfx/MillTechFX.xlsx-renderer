# Changelog

## [1.0.0](https://github.com/milltechfx/MillTechFX.xlsx-renderer/compare/v1.1.1...v1.0.0) (2023-03-30)


### Features

* implemented DUMP_EMPTY_COLS/MERGE_ROW_CELL/SHOW_CELL ([a1b4ed8](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/a1b4ed83255ea19a20f8e204c067e9dc7c7c81ba))
* **isValueMapper:** add isValueMapper into mappers ([29ab45a](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/29ab45a835ea41fd186638701031c06a1cc424ad))
* **Mappers:** add booleanMapper into mappers ([762b12b](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/762b12b18405e0b40833d4d16d71066e055a56df))
* **Mappers:** add integerMapper into mappers ([e093441](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/e09344138ea691b22bcd14a942493e1afb35703d))
* **Mappers:** add numberMapper into mappers ([9f89cae](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/9f89cae956a292fe3bca70d63eb788598aa56025))


### Bug Fixes

* [#154](https://github.com/milltechfx/MillTechFX.xlsx-renderer/issues/154) [BUG] The xlsx-renderer stops to work correctly after code compression. ([#155](https://github.com/milltechfx/MillTechFX.xlsx-renderer/issues/155)) ([efb6fb2](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/efb6fb27de4e80aabaebaf4d22936df1fa8825b0))
* `ForEachCell` should clear content before `scope.freezeOutput()` ([c22c223](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/c22c223a62c4bcca872d3ce8dce3fce270878f9a))
* **Mappers:** resolve booleanMapper behaviour for implicity remove noise after valid number ([f5afed2](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/f5afed2e4b7c8628629cca65d57d8728c00c27cb))
* satify worksheet name ([d6fa0ad](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/d6fa0ad940ccab1fa09daf1b1ba7f56d5a1bd2f2))
* SC-1995 used native clone on VM to not lose Date objects ([dcde18d](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/dcde18d1c80b676ade4e868c1e3d2f3cba462c93))
* Set correct path for workflow ([bad59c1](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/bad59c1e2dc599530a085b195ac5f606077b6b2c))


### Miscellaneous Chores

* release 1.0.0 ([bd7e188](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/bd7e1886a293d81ff19790b926b9eedb3431243a))

## [1.1.1](https://github.com/milltechfx/MillTechFX.xlsx-renderer/compare/v1.1.0...v1.1.1) (2023-03-30)


### Bug Fixes

* SC-1995 used native clone on VM to not lose Date objects ([dcde18d](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/dcde18d1c80b676ade4e868c1e3d2f3cba462c93))

## [1.1.0](https://github.com/milltechfx/MillTechFX.xlsx-renderer/compare/v1.0.0...v1.1.0) (2023-03-30)


### Features

* implemented DUMP_EMPTY_COLS/MERGE_ROW_CELL/SHOW_CELL ([a1b4ed8](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/a1b4ed83255ea19a20f8e204c067e9dc7c7c81ba))

## 1.0.0 (2023-03-20)


### Features

* Initial fork setup


### Miscellaneous Chores

* release 1.0.0 ([bd7e188](https://github.com/milltechfx/MillTechFX.xlsx-renderer/commit/bd7e1886a293d81ff19790b926b9eedb3431243a))
