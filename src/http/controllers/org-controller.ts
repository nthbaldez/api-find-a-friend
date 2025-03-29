import { OrgAlreadyExistsError } from '@/use-cases/orgs/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/orgs/factories/make-create-org-use-case'
import { Request, Response } from 'express'
import z from 'zod'

export class OrgController {
  static async create(req: Request, res: Response) {
    try {
      const createOrgBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        cep: z.coerce.string(),
        address: z.string(),
        whatsapp: z.coerce.string(),
        city: z.string(),
        county: z.string(),
      })

      const { name, email, password, cep, address, whatsapp, city, county } =
        createOrgBodySchema.parse(req.body)

      const createUseCase = makeCreateOrgUseCase()

      const { org } = await createUseCase.execute({
        name,
        email,
        password,
        cep,
        address,
        whatsapp,
        city,
        county,
      })

      res.status(200).json({
        org,
      })
    } catch (error) {
      if (error instanceof OrgAlreadyExistsError) {
        res.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
