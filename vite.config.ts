import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: { alias: { "@": "/src" } },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      spa: { enabled: true },
      router: { generatedRouteTree: "route-tree.gen.ts" },
    }),
    viteReact(),
    tailwindcss(),
  ],
  /**
   * https://github.com/TanStack/router/issues/5213#issuecomment-3341078755
   */
  define: {
    "globalThis.Cloudflare.compatibilityFlags": JSON.stringify({
      enable_nodejs_process_v2: true,
    }),
  },
})
