import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../interfaces/orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  // findById(id: string): Promise<Org | null> {
  //   throw new Error('Method not implemented.')
  // }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
