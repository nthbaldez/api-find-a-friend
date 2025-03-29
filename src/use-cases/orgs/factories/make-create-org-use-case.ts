import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrg } from '../create-org'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrg(orgsRepository)

  return useCase
}
