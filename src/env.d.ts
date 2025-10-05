import type { PrismaClient } from "@prisma/client"
import type { YogaInitialContext } from "graphql-yoga"
import type { SessionPayload } from "@/api/types"

/**
 * 変数
 */
export type Variables = {
  database: PrismaClient
  session: SessionPayload | null
}

/**
 * Hono Context
 * @example new Hono<Env>()
 */
export type HonoEnv = {
  Bindings: Env
  Variables: Variables
}

/**
 * Context Storage
 * https://hono.dev/docs/middleware/builtin/context-storage#context-storage-middleware
 */
export type Context = {
  var: Variables
  env: Env
}

export type YogaContext = YogaInitialContext & Context
