import { CreatePetUseCase } from '../create-pet-use-case'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeCreatePetUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(repository)

  return useCase
}
