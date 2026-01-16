# おみくじアプリ (Spring Boot)

Spring Bootで実装した単一のWebアプリケーションです。

## 起動方法

```bash
cd spring-boot
mvn spring-boot:run
```

アプリは `http://localhost:8080` で起動します。
ブラウザで `http://localhost:8080` にアクセスすると、おみくじアプリが表示されます。

## 機能

- おみくじを引くボタンでランダムに結果を表示
- 結果の管理機能（追加・削除）
- シンプルな白背景のデザイン

## API エンドポイント

ReactやFlutterアプリからも利用可能なREST APIエンドポイント：

### おみくじを引く
```
POST /api/omikuji/draw
```

### おみくじ結果一覧を取得
```
GET /api/omikuji/results
```

### おみくじ結果を追加
```
POST /api/omikuji/results
Content-Type: application/json

{
  "name": "超吉",
  "displayOrder": 8
}
```

### おみくじ結果を更新
```
PUT /api/omikuji/results/{id}
Content-Type: application/json

{
  "name": "超吉",
  "displayOrder": 8
}
```

### おみくじ結果を削除
```
DELETE /api/omikuji/results/{id}
```
