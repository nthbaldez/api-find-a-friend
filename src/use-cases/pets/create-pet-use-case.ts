import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: string
  energy_level: string
  size: string
  environment: string
  independency_level: string
  orgId: string
}

export class CreatePetUseCase {
  constructor(private petsRepository: PrismaPetsRepository) {}
  async execute(pet: CreatePetUseCaseRequest) {
    console.log(pet)
    return 'Hello World'
  }
}
