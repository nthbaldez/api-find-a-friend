import { InvalidCredentialsError } from '@/use-cases/orgs/errors/invalid-credentials-error'
import { OrgAlreadyExistsError } from '@/use-cases/orgs/errors/org-already-exists-error'
import { makeAuthenticateUseCase } from '@/use-cases/orgs/factories/make-authenticate-use-case'
import { makeCreateOrgUseCase } from '@/use-cases/orgs/factories/make-create-org-use-case'
import { JwtUseCase } from '@/use-cases/orgs/jwt-use-case'

import { Request, Response } from 'express'
import z from 'zod'

export class OrgController {
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const createOrgBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        cep: z.coerce.string(),
        address: z.string().min(9, { message: 'Endereço é obrigatório.' }),
        whatsapp: z.number().min(9, { message: 'Whatsapp é obrigatório.' }),
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
        whatsapp: whatsapp.toString(),
        city,
        county,
      })

      const response = {
        name: org.name,
        email: org.email,
        cep: org.cep,
        address: org.address,
        whatsapp: org.whatsapp,
        city: org.city,
        county: org.county,
      }

      return res.status(200).json({
        org: response,
      })
    } catch (error) {
      if (error instanceof OrgAlreadyExistsError) {
        return res.status(400).json({ message: error.message })
      }

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Erro na validação dos dados de entrada.',
          errors: error.flatten().fieldErrors,
        })
      }

      throw error
    }
  }

  public static async authenticate(req: Request, res: Response) {
    try {
      const authenticateOrgBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = authenticateOrgBodySchema.parse(req.body)

      const authenticateUseCase = makeAuthenticateUseCase()

      const { org } = await authenticateUseCase.execute({
        email,
        password,
      })

      const token = JwtUseCase.sign({
        email: org.email,
        name: org.name,
      })

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      })

      return res.status(200).json({
        message: 'Autenticação realizada com sucesso.',
        token,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).json({
          message: error.message,
        })
      }

      if (error instanceof z.ZodError) {
        console.log(error.flatten().fieldErrors)
        return res.status(400).json({
          message: 'Erro na validação dos dados de entrada.',
          errors: error.flatten().fieldErrors,
        })
      }

      throw error
    }
  }

  public static async logout(req: Request, res: Response) {
    res.clearCookie('token')
    return res.status(200).json({
      message: 'Logout realizado com sucesso.',
    })
  }
}
