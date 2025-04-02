import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { $Enums } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: number
  energy_level: string
  size: string
  environment: string
  independency_level: string
  orgId: string
}

export class CreatePetUseCase {
  constructor(private petsRepository: PrismaPetsRepository) {}
  async execute({
    name,
    description,
    age,
    energy_level,
    size,
    environment,
    independency_level,
    orgId,
  }: CreatePetUseCaseRequest) {
    const petCreated = await this.petsRepository.create({
      name,
      description,
      age,
      energy: energy_level as $Enums.Energy,
      size: size as $Enums.Size,
      environment: environment as $Enums.EnvironmentLevel,
      independency: independency_level as $Enums.IndependencyLevel,
      orgId,
    })

    return {
      pet: petCreated,
    }
  }
}
