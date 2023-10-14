"use client"
import {DndContext, DragEndEvent, useDroppable} from "@dnd-kit/core";
import dashboardStyles from "@/styles/dashboard/dashboardStyles.module.css"
import {useEffect, useState} from "react";
import AddList from "@/components/homepage/components/AddList";
import List from "@/components/homepage/components/List";
import {List as DBList} from "@prisma/client"
import {useSession} from "next-auth/react";
import {createList, updateList} from "@/utils/database/listManager";
import {restrictToParentElement, restrictToWindowEdges} from "@dnd-kit/modifiers";
import {restrictToEdges} from "@/utils/dndkit/restrictToScreenEdges";
import SaveState from "@/components/homepage/components/SaveState";

export default function HomepageContainer({initialLists}: {
  initialLists: DBList[] | null,
}) {
  const DEFAULTXPOSITION = 10
  const DEFAULTYPOSITION = 10
  const [isSaved, setIsSaved] = useState(true)
  const [lists, setLists] = useState<List[]>([])
  const [groups, setGroups] = useState()
  const [color, setColor] = useState({backgroundColor: "rgb(70, 155, 255)"} as React.CSSProperties)
  const {isOver, setNodeRef} = useDroppable({
    id: "homepage-container"
  })

  useEffect(() => {
    if (initialLists) setLists(initialLists.map((list: DBList): List => {
      return {
        id: list.id,
        title: list.title,
        userId: list.userId,
        position: {x: list.posX, y: list.posY},
        isLastActive: false
      }
    }))
  }, [initialLists]);

  const session = useSession()

  const handleAddList = async () => {
    const response = await fetch(`/api/v1/list`,
      {
        method: "POST",
        body: JSON.stringify(
          {
            title: "",
            posX: DEFAULTXPOSITION,
            posY: DEFAULTYPOSITION,
          })
      })
    const newList: List = await response.json()
    setLists([...lists, newList])
  }

  const handleUpdateList = async (list: List) => {
    if (session && session.data?.user) {
      await fetch("/api/v1/list", {method: "PATCH", body: JSON.stringify(list)})
    }
  }

  const handleSaveAll = async (e: React.EventHandler<any>) => {
    if(session && session.data?.user && lists.length > 0 && !isSaved){
      for (const list of lists) {
         await fetch("/api/v1/list", {method: "PATCH", body: JSON.stringify(list)})
      }
    }
    setIsSaved(true)
    console.log("isSaved in handleSaveAll",isSaved)
  }

  const handleAddGroup = async () => {
  }

  async function handleDragEnd(e: DragEndEvent) {
    const list = lists.find((x) => x.id.toString() === e.active.id)
    if (list) {
      list.position = {x: e.delta.x + list.position.x, y: e.delta.y + list.position.y}
      list.isLastActive = true
      setLists(lists.map((x) => {
        if (x.id === list.id) return list;
        return {...x, isLastActive: false};
      }))
      setIsSaved(false)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]} autoScroll={false}>
      <main
        ref={setNodeRef}
        className={dashboardStyles.dashboard}
      >
        {lists && lists.map((list) => {
            return (
              <List
                key={list.id}
                list={list}
              />
            )
          }
        )}
        <nav>
          <SaveState
            key={isSaved ? "saved" : "not saved"}
            saveAll={handleSaveAll}
            isSaved={isSaved}
          />
          <AddList
            handleGroupList={handleAddGroup}
            handleAddList={handleAddList}
          />
        </nav>
      </main>
    </DndContext>
  )
}