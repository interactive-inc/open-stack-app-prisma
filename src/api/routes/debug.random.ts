import { factory } from "@/api/factory"

export const [GET] = factory.createHandlers(async (c) => {
  return c.json({ value: Math.random() })
})
