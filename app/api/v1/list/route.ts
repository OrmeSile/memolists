import {getServerSession} from "@/utils/database/auth";
import {createList, getListsOfUser, updateList, updateLists} from "@/utils/database/listManager";
import {List as DBList} from "@prisma/client"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  const lists = id ? await getListsOfUser(id) : null
  return Response.json(lists)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) return
  const newList: DBList = await request.json()
  const dbList = await createList({...newList, userId: session.user.id})
  return Response.json(dbList)
}

export async function PATCH(request: Request) {
  const session = await getServerSession()
  if(!session) return
  const patchedList = await updateLists(await request.json())
  return Response.json(patchedList)
}