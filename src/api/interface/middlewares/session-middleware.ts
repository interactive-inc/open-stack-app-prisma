import { decode } from "hono/jwt"
import { factory } from "@/api/interface/factory"
import { vSessionPayload } from "@/lib/session/session-payload"

/**
 * c.var.sessionにログイン情報を設定する
 */
export const sessionMiddleware = factory.createMiddleware(async (c, next) => {
  c.set("session", null)

  const a = {}

  if (typeof a !== "string") {
    return next()
  }

  const session = vSessionPayload.safeParse(decode(a).payload)

  if (session.success === false) {
    return next()
  }

  c.set("session", session.data)

  return next()
})
