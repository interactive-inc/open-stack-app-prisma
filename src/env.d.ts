import type { PrismaClient } from "@prisma/client"
import type { YogaInitialContext } from "graphql-yoga"
import type { SessionPayload } from "@/api/types"

export type Bindings = Env & {
  JWT_COOKIE_SECRET: string
  JWT_SECRET: string
}

export type Variables = {
  database: PrismaClient
  session: SessionPayload | null
}

/**
 * Hono Context
 * @example new Hono<Env>()
 */
export type HonoEnv = {
  Bindings: Bindings
  Variables: Variables
}

/**
 * Context Storage
 * https://hono.dev/docs/middleware/builtin/context-storage#context-storage-middleware
 */
export type Context = {
  var: Variables
  env: Bindings
}

export type YogaContext = YogaInitialContext & Context
