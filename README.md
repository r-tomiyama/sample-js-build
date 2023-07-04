# JavaScript のビルド検証

## 試行したこと

### 1. [tsc](https://www.npmjs.com/package/tsc) でトランスパイル

tsconfig の targetに合わせて、構文が書き換えれている。  
一方flatMapなど、targetに指定したes5には存在しない関数の書き換えは行われていない。

cf. https://www.typescriptlang.org/tsconfig#target

#### ファイルサイズ

- functions.js: 145B
- index.js: 141B

### 2. [webpack](https://www.npmjs.com/package/webpack) でトランスパイル, バンドル

webpack.**.js にバンドルの設定を記述する。

- トランスパイルは ts-loader で行っている。
- tsc の場合と同様に、構文の書き換えは行われている。
- production モードの場合は、minify されている。

#### ファイルサイズ

- dev.js: 4.4K
- prod.js: 108B

### 3. [webpack](https://www.npmjs.com/package/webpack) でトランスパイル, バンドルしつつ、ポリフィル対応のため[core-js](https://www.npmjs.com/package/core-js)をimportする

大体は 2. と同じ。

entryポイントで、core-jsをimportする。  
polyfillをimportすることで、非対応ブラウザでもflatMapなどの関数を使えるようになる。

#### ファイルサイズ

必要なpolyfillのみをimportする場合

```typescript
import 'core-js/actual/array/flat-map';
```

- dev.js: 107K
- prod.js: 16K

全てのpolyfillをimportする場合

```typescript
import 'core-js/actual';
```

- dev.js: 1.2M
- prod.js: 205K

### 4. [babel](https://www.npmjs.com/package/@babel/core) でポリフィル対応する

一旦、webpackを使わない（トランスパイル・バンドルをしない）。  
JavaScriptを用意して、babel CLIでビルドする。

babel.config.jsonを定義する。  
`"useBuiltIns": "usage"` にすると、必要なcore-jsのpolyfillをimportする。  
core-jsを直接使う方法と違って、どのpolyfillをimportするかを明示的に書く必要がない。

※ デフォルトだと、提案stageが4のものしかpolyfillされないことが注意点。

- https://babeljs.io/docs/babel-preset-env#shippedproposals
- https://www.proposals.es/stages

#### ファイルサイズ

他と違うファイルを変換しているので、比較しない。

### 5. [webpack](https://www.npmjs.com/package/webpack) でトランスパイル, バンドルしつつ、ポリフィル対応のためbabel-loader経由で[core-js](https://www.npmjs.com/package/core-js)を使う

ts-loaderと組み合わせると想定通り動かなかったため、トランスパイルもbabel-loaderで行う。pluginを使う。

#### ファイルサイズ

- dev.js: 110K
- prod.js: 16K
