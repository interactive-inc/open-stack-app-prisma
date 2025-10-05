import { factory } from "@/api/factory"

import * as debug_random from "@/api/routes/debug.random"
import * as index from "@/api/routes/index"

export const app = factory
  .createApp()
  .basePath("/api")
  .get("/", index.GET)
  .get("/debug/random", debug_random.GET)
