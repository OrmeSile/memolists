"use client"
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor, MouseSensor,
  PointerSensor, TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import dashboardStyles from "@/styles/home/home.module.css"
import {useEffect, useState} from "react";
import AddList from "@/components/home/components/AddList";
import List from "@/components/home/components/List";
import {List as DBList} from "@prisma/client"
import {useSession} from "next-auth/react";
import {restrictToParentElement} from "@dnd-kit/modifiers";
import SaveState from "@/components/home/components/SaveState";

export default function HomeContainer({initialLists}: {
  initialLists: DBList[] | null,
}) {
  const DEFAULTXPOSITION = 50
  const DEFAULTYPOSITION = 80
  const [isSaved, setIsSaved] = useState(true)
  const [lists, setLists] = useState<List[]>([])
  const [groups, setGroups] = useState()
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
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 10
    }

  })
  const sensors = useSensors(touchSensor,mouseSensor)

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

  const handleSaveAll = async (e: React.EventHandler<any>) => {
    if (session && session.data?.user && lists.length > 0 && !isSaved) {
      const response = await fetch("/api/v1/list", {method: "PATCH", body: JSON.stringify(lists)})
      if (response.ok) setIsSaved(true)
    }
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
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
      autoScroll={false}>
      <main
        ref={setNodeRef}
        className={dashboardStyles.homeContainer}
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