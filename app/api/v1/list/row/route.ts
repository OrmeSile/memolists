import {getServerSession} from "@/utils/database/auth";
import {createRow, deleteRow} from "@/utils/database/listManager";

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) return Response.json(undefined, {status: 401})
  const data: { listId: string } = await request.json()
  const dbRow = await createRow(data.listId)
  return Response.json(dbRow)
}

export async function DELETE(request: Request) {
  const session = await getServerSession()
  if (!session) return Response.json(undefined, {status: 401})
  const {listId, rowId}: {
    listId: string,
    rowId: string
  } = await request.json()
  await deleteRow({listId, rowId})
  return Response.json({}, {status: 200})
}