# おみくじハッカソン

Flutter、React、Spring Bootで同じ動作のおみくじアプリです。

## プロジェクト構成

- `spring-boot/` - Webアプリケーション（Spring Boot）
- `react/` - Webアプリ（React）
- `flutter/` - モバイルアプリ（Flutter）

## 機能

- ボタンを押すと、大凶、凶、小吉、中吉、大吉、吉、末吉がランダムに表示される
- おみくじ結果の管理機能（追加・削除が容易）
- シンプルな白背景のデザイン

## 起動方法

### 1. Spring Boot Webアプリを起動

```bash
cd spring-boot
mvn spring-boot:run
```

アプリは `http://localhost:8080` で起動します。
ブラウザで `http://localhost:8080` にアクセスすると、おみくじアプリが表示されます。

### 2. React アプリを起動

```bash
cd react
npm install
npm start
```

アプリは `http://localhost:3000` で起動します。

### 3. Flutter アプリを起動

```bash
cd flutter
flutter pub get
flutter run
```

## おみくじ結果の管理

各アプリには管理画面があり、以下の操作が可能です：

- **追加**: 新しいおみくじ結果を追加
- **削除**: 既存のおみくじ結果を削除

結果はデータベースに保存され、すべてのアプリ（Spring Boot、React、Flutter）で共有されます。
Spring Bootアプリは単一のWebアプリケーションとして動作し、ReactやFlutterアプリは同じAPIエンドポイントを使用します。

## デフォルトのおみくじ結果

- 大凶
- 凶
- 末吉
- 小吉
- 中吉
- 吉
- 大吉
