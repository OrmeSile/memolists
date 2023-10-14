import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUser(email : string, password : string) {
  try{
    const user = await prisma.user.findUnique({
      where: {email : email}
    })
    if (typeof user === "undefined") return null
    await prisma.$disconnect()
    return user
  } catch (e){
    console.log(e)
    await prisma.$disconnect()
  }
}