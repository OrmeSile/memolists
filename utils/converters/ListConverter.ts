import List from "@/components/home/components/List";
import {List as DBList} from "@prisma/client";

export function toDBList(list: List): DBList {
  return {
    id: list.id,
    userId: list.userId,
    title: list.title,
    posX: list.position.x,
    posY: list.position.y,
  } as DBList
}

export function toAppList(list: DBList): List {
  return {
    id: list.id,
    userId: list.userId,
    title: list.title,
    position: {
      x: list.posX,
      y: list.posY
    },
    isLastActive: false
  }
}