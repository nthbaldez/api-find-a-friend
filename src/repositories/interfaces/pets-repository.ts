import { Prisma, Pet } from '@prisma/client'
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(email: string): Promise<Pet | null>
}
