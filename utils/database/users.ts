import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function createDummyUser() {
  try {
    await prisma.user.create({
      data: {
        name: 'Alice',
        password: 'password',
        lists: {
          create: {
            rows: {
              create: {
                content: "élément 1"
              }
            }
          }
        }
      }
    })
    await prisma.$disconnect()
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
  }
}
createDummyUser()
