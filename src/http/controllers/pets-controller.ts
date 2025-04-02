import { Request, Response } from 'express'

import { makeCreatePetUseCase } from '@/use-cases/pets/factories/make-create-pet-use-case'
import z from 'zod'

export class PetsController {
  public static async createPet(req: Request, res: Response) {
    const createPetBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      age: z.coerce.number(),
      size: z.string(),
      energy_level: z.string(),
      independency_level: z.string(),
      environment: z.string(),
      orgId: z.string().uuid(),
    })

    const {
      name,
      description,
      age,
      size,
      energy_level,
      environment,
      independency_level,
      orgId,
    } = createPetBodySchema.parse(req.body)

    try {
      const createPetsUseCase = makeCreatePetUseCase()

      const { pet } = await createPetsUseCase.execute({
        name,
        description,
        age,
        size,
        energy_level,
        environment,
        independency_level,
        orgId,
      })

      return res.status(200).send({
        pet,
      })
    } catch (error) {}
  }
}
