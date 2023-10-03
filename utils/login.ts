import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUser(username : string, password : string) {
  try{
    const user = await prisma.user.findUnique({
      where: {name : username}
    })
    if (typeof user === "undefined") return null
    await prisma.$disconnect()
    return user
  } catch (e){
    console.log(e)
    await prisma.$disconnect()
  }
}