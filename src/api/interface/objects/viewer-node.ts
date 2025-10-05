import type { PrismaUser } from "@prisma/client"
import { builder } from "@/api/interface/builder"
import { PothosProjectMemberNode } from "@/api/interface/objects/project-member-node"

export const PothosViewerNode = builder.objectRef<PrismaUser>("ViewerNode")

builder.objectType(PothosViewerNode, {
  description: undefined,
})

builder.objectField(PothosViewerNode, "id", (t) => {
  return t.string({
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosViewerNode, "email", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.email
    },
  })
})

builder.objectField(PothosViewerNode, "name", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.name
    },
  })
})

builder.objectField(PothosViewerNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosViewerNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosViewerNode, "projectMembers", (t) => {
  return t.field({
    type: [PothosProjectMemberNode],
    description: undefined,
    nullable: false,
    args: {
      offset: t.arg({ type: "Int", required: true }),
      limit: t.arg({ type: "Int", required: true }),
    },
    resolve(parent, _args, c) {
      return c.var.database.prismaUser
        .findUniqueOrThrow({ where: { id: parent.id } })
        .projectMembers()
    },
  })
})
