import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()

export async function getAllLists() {
  try {
    const lists = await prisma.list.findMany({
      include: {
        rows: true,
        user: true
      }
    })
    await prisma.$disconnect()
    return lists
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
  }
}

(async () => console.dir(await getAllLists(), {depth: null}))()