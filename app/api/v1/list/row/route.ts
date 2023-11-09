import {getServerSession} from "@/utils/database/auth";
import {createRow} from "@/utils/database/listManager";

export async function POST(request: Request) {
    const session = await getServerSession()
    if(!session) return Response.json({error: "session error"})
    const data: {listId : string} = await request.json()
    console.log(data)
    const dbRow = await createRow(data.listId)
    return Response.json(dbRow)
}