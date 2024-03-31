import { faker } from "@faker-js/faker"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

function main() {
  Array.from({ length: 10 }).map(async (_, i) => {
    // mock data
    await prisma.post.create({
      data: {
        id: faker.string.uuid(),
        accountId: faker.string.uuid(),
        contentText: faker.airline.recordLocator(),
        created_at: faker.date.anytime(),
        updated_at: faker.date.anytime(),
      }
    })
    console.log(i + "created")
  })
}

main()