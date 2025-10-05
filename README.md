# Start Basic Cloudflare

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
