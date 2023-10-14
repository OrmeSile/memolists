import listStyles from "@/styles/dashboard/components/list.module.css";
import {useDraggable} from "@dnd-kit/core";
import CSS from 'csstype';
import {useEffect, useState} from "react";

export default function List({list}: { list: List }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: list.id.toString()
  })
  const windowWidth = window.innerWidth
  const windowHeigth = window.innerHeight
  const staticStyles = {
    top: list.position.y,
    left: list.position.x
  } as React.CSSProperties

  const getPosition = () => {
    return
  }
  const transformStyles = transform
    ? {
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 10
    } as React.CSSProperties
    : undefined

  const activeStyles = list.isLastActive ? {
    zIndex: 9
  } as React.CSSProperties : undefined

  return (
    <div
      ref={setNodeRef}
      key={list.id}
      className={listStyles.listContainer}
      style={{...transformStyles, ...staticStyles, ...activeStyles}}
    >
      <button className={listStyles.handle}
        {...attributes}
        {...listeners}>
        Handle
      </button>
      <p className={listStyles.row}>{list.id}</p>
    </div>
  )
}