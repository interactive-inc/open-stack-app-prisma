import type { MutationFieldThunk } from "@pothos/core"
import { UpdateProject } from "@/api/application/project/update-project"
import { UnauthenticatedGraphQLError } from "@/api/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateProjectInput } from "@/api/interface/inputs/update-project-input"
import { PothosProjectNode } from "@/api/interface/objects/project-node"
import type { SchemaTypes } from "@/api/types"

export const updateProject: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosProjectNode,
    description: "プロジェクトを更新する",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: PothosUpdateProjectInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateProject(c)

      const result = await service.run({
        projectId: args.id,
        name: args.input.name,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaProject.findUnique({
        where: { id: args.id },
      })
    },
  })
}
