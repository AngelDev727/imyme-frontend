# imyme-app

## Project setup
```
npm install
```

Create a file named `.env.local` file at the root of your project and add the following variables:
```
VUE_APP_SHOPIFY_STOREFRONT_API_KEY=<shopify-storefront-api-key>
```

The `<shopify-storefront-api-key>` can be obtained from the shopify admin panel.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### アプリの種類
imyme には以下の4種類が存在します。
+ imyme-advice （アドバイスシート用？）
+ imyme-app （Webアプリ用？）
+ imyme-signage （看板用？）
+ imyme-tablet （タブレット用？）

### CSS 周りの構成について
`src/{アプリ名}/assets/styles/css/main.css` はビルド時に
`src/{アプリ名}/assets/styles/sass/main.scss` を取り込んだ CSS ファイルになります。<br>
更新条件は以下の通りです。

1. インポート対象のファイルが `src/{アプリ名}/assets/styles/css/main.css` よりも後に更新されている場合
2. `npm run watch-app:sass` をターミナルにて実行した場合

### CSS のベストプラクティス
スタイルの影響範囲によって編集箇所が異なります。

1. 全ての imyme で統一すべきデザイン
   + `src\shared\assets\styles` 配下のファイルを修正する あるいは、 `src\shared\assets\styles` に新しいファイルを作成し、`src/{アプリ名}/assets/styles/sass/main.scss` にてインポート対象に設定する
2. 対象の imyme 内だけで統一すべきデザイン
   + `src/{アプリ名}/assets/styles/css/{アプリの種別}.css` に記載する<br>
   ※ `imyme-app` の場合、`src/imyme-app/assets/styles/css/app.css`<br>
   ※ `imyme-advice` の場合、`src/imyme-advice/assets/styles/css/advice.css`
3. 特定の箇所にだけ適用すべきデザイン
   + 対象のコンポーネント内の `style` に記載する
