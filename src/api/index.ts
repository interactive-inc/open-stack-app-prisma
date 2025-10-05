import { createYoga } from "graphql-yoga"
import { contextStorage, getContext } from "hono/context-storage"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { factory } from "@/api/interface/factory"
import { databaseMiddleware } from "@/api/interface/middlewares/database-middleware"
import { sessionMiddleware } from "@/api/interface/middlewares/session-middleware"
import * as debug_random from "@/api/interface/routes/debug.random"
import * as index from "@/api/interface/routes/index"
import { schema } from "@/api/interface/schema"
import type { HonoEnv, YogaContext } from "@/env"

/**
 * GraphQL
 */
const graphql = createYoga({
  schema,
  graphqlEndpoint: "/",
  landingPage: false,
  logging: "info",
  cors: { origin: "*", credentials: true },
  context(context): YogaContext {
    const honoContext = getContext<HonoEnv>()
    return {
      ...context,
      var: honoContext.var,
      env: honoContext.env,
    }
  },
})

export const app = factory
  .createApp()
  .use(cors({ credentials: true, origin: (v) => v }))
  .use(contextStorage())
  .use(databaseMiddleware)
  .use(sessionMiddleware)
  .mount("/graphql", graphql)
  .basePath("/api")
  .get("/", index.GET)
  .get("/debug/random", debug_random.GET)

app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return c.json({ message: e.message }, { status: e.status })
  }
  return c.json({ message: e.message }, { status: 500 })
})
