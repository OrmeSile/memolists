'use client'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import dashboardStyles from "@/styles/home/home.module.css"
import {useContext, useEffect, useState} from "react";
import AddList from "@/components/home/components/AddList";
import List from "@/components/home/components/List";
import {useSession} from "next-auth/react";
import {restrictToParentElement} from "@dnd-kit/modifiers";
import SaveState from "@/components/home/components/SaveState";
import {DbListWithRows} from "@/types/prisma/variations/List";
import {useDispatchLists, useLists} from "@/components/context/ListContext";

export default function HomeContainer({initialLists}: {
  initialLists: DbListWithRows[] | null,
}) {
  const lists = useLists()
  const dispatch = useDispatchLists()
  const DEFAULTXPOSITION = 50
  const DEFAULTYPOSITION = 80
  const [isSaved, setIsSaved] = useState(true)
  const [groups, setGroups] = useState()
  const {isOver, setNodeRef} = useDroppable({
    id: "homepage-container"
  })

  useEffect(() => {
    if (initialLists) dispatch({
      type: 'init',
      payload: initialLists.map((list: DbListWithRows): List => {
        return {
          id: list.id,
          title: list.title,
          userId: list.userId,
          position: {x: list.posX, y: list.posY},
          isLastActive: false,
          rows: list.rows
        }
      })
    })
  }, []);
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 10
    }

  })
  const sensors = useSensors(touchSensor, mouseSensor)

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
    dispatch({
      type: 'add',
      payload: newList
    })
  }

  const handleAddRow = async (listId: string) => {
    const response = await fetch(`/api/v1/list/row`,
      {
        method: "POST",
        body: JSON.stringify({listId: listId})
      })
    const newRow = await response.json()
    const list = lists.find(list => list.id === listId)
    if(!list) throw new Error('list not found')
    dispatch({
      type: "change",
      payload: {...list, rows: [...list.rows, newRow]}
    })
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
      dispatch({
        type: "change",
        payload: list
      })
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
          {lists.length > 0 && lists.map((list) => {
              return (
                <List
                  addRow={handleAddRow}
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