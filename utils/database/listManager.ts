import prisma from "@/utils/database/databaseClient";
import {List as DBList} from "@prisma/client"
import {toAppList, toDBList} from "@/utils/converters/ListConverter";

async function createList(list: { title: string, userId: string, posX: number, posY: number }) {
  return toAppList(await prisma.list.create(
    {data: list}
  ))
}

async function getAllLists() {
  return prisma.list.findMany();
}

async function getOneList(id: string) {
  return prisma.list.findUnique({where: {id: id}})
}

async function getListsOfUser(id: string) {
  const lists = await prisma.list.findMany({where: {user: {id: id}}, include: {rows: true}})
  console.log("lists",lists)
  return lists

}

async function updateList(list: List) {
  return prisma.list.update({
    where: {id: list.id},
    data: toDBList(list)
  })
}

async function updateLists(lists: List[]) {
  return lists.map(async (list) => {
    return await updateList(list)
  })
}

async function createRow(listId: string) {
  return prisma.listRow.create({
    data: {
      listId,
      content: ''
    }
  })
}

export {
  createList,
  getAllLists,
  getOneList,
  getListsOfUser,
  updateList,
  updateLists,
  createRow
}