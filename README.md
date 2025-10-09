# Stack App with API - TanStack Start + Hono + Cloudflare + Prisma

https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack/

## Getting Started

### Install the dependencies

```bash
bun i
```

### Start the development server

```bash
bun dev
```

### Build for Production

```bash
bun build
```

### Preview the production build

```bash
bun preview
```

### Deploy to Cloudflare

```sh
bun run deploy
```

## Accessing bindings

You can access Cloudflare bindings in server functions by using importable `env`:

```ts
import { env } from 'cloudflare:workers'
```

See `src/api/routes/index.ts` for an example.

## マイグレーション

ここでは仮に「open-stack-cloudflare」というデータベース名を使用します。これは[.wrangler.json](./wrangler.json)の `database_name` と一致させてください。

以下のコマンドで空のファイルを作成します。

```
bun wrangler d1 migrations create open-stack-cloudflare create_user_table
```

次に、差分を計算しファイルの中にSQLを書き込むのですが、初回の場合は差分がないので `--from-empty` を使います。

```
bun prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --output prisma/migrations/0001_create_user_table.sql --script
```

以下のコマンドでローカルのデータベースを更新します。

```
bun wrangler d1 migrations apply open-stack-cloudflare --local
```

2回目以降の場合は、ローカルのデータベースのとの差分を計算します。

```
bun prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-local-d1 --script
```

### リモート環境のマイグレーション

以下のコマンドで本番環境のデータベースを更新します。

```
bun wrangler d1 migrations apply open-stack-cloudflare --remote
```

ただし、先にデータベースが作成されている必要があります。

```
bun wrangler d1 create open-stack-cloudflare
```

### リモートのデータベースと接続する

プロパティに`remote`を追加します。

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "open-stack-cloudflare",
      "database_id": "e0097010-e9a1-4800-8a7e-xxx",
      "remote": true
    }
  ]
}
```

# メモ

## ~ vs @

初期値では `~` ですが、Claudeが間違って `rm -rf ~/xxx` など実行した場合に危険なので `@` に変更しました。

```json
{ "resolve": { "alias": { "@": "/src" } } }
```

## route-tree.gen.ts

初期値では `routeTree.gen.ts` ですが、Claudeがこのファイル名を参考に他のファイルの命名規則を間違って `camelCase` にしてしまう可能性があるので、`kebab-case` に変更しました。

```json
{ "router": { "generatedRouteTree": "route-tree.gen.ts" } }
```
