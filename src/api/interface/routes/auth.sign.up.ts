import { zValidator } from "@hono/zod-validator"
import { hashSync } from "bcrypt-ts"
import { setSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"
import { z } from "zod"
import { factory } from "@/api/interface/factory"
import { vSessionPayload } from "@/lib/session/session-payload"

export const [POST] = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      email: z.string(),
      password: z.string(),
    }),
  ),
  async (c) => {
    const json = c.req.valid("json")

    const existingAccount = await c.var.database.prismaUser.findUnique({
      where: { email: json.email },
    })

    if (existingAccount !== null) {
      throw new HTTPException(409, {
        message: "このメールアドレスは既に使用されています",
      })
    }

    const hashedPassword = hashSync(json.password, 10)

    const userId = crypto.randomUUID()

    const account = await c.var.database.prismaUser.create({
      data: {
        id: userId,
        login: userId,
        email: json.email,
        hashedPassword: hashedPassword,
        name: userId,
      },
    })

    const payload = vSessionPayload.parse({
      userId: account.id,
      name: "foo",
      email: account.email,
    } satisfies z.infer<typeof vSessionPayload>)

    const cookie = await sign(payload, c.env.JWT_SECRET)

    await setSignedCookie(
      c,
      c.env.JWT_COOKIE_KEY,
      cookie,
      c.env.JWT_COOKIE_SECRET,
      {
        /**
         * クライアントのJavaScriptから参照できないようにする
         */
        httpOnly: true,
        /**
         * HTTPS通信のみでCookieを送信する
         */
        secure: true,
      },
    )

    return c.json({ id: account.id })
  },
)
