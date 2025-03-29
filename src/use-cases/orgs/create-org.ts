import { OrgsRepository } from '@/repositories/interfaces/orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: string
  city: string
  county: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    whatsapp,
    city,
    county,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password_hash,
      cep,
      address,
      whatsapp,
      city,
      county,
    })

    return {
      org,
    }
  }
}
