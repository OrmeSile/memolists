import {List, User} from "@prisma/client";
import {prisma} from "@/utils/database/databaseClient";

async function createList(list: {title: string, userId: string}) {
  return prisma.list.create(
      {data: list}
  );
}

async function getAllLists() {
  return prisma.list.findMany();
}

async function getOneList(id :number) {
    return prisma.list.findUnique({where: {id: id}})
}

export {
  createList,
  getAllLists,
  getOneList
}