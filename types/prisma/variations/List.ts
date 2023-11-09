import {Prisma} from "@prisma/client"

const listWithRows = Prisma.validator<Prisma.ListDefaultArgs>()({
    include: {rows: true}
})

export type DbListWithRows = Prisma.ListGetPayload<typeof listWithRows>