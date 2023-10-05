'use client'
import listStyles from "@/styles/dashboard/dashboardStyles.module.css"
import {useDraggable} from "@dnd-kit/core";
export default function List({list}: {list : {title: string, dateCreated: string, lines:string[]}}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `${list.title}-${list.dateCreated}`
  })
  return(
    <div
      className={listStyles.container}
      >
      <Header
        title={list.title}
        dateCreated={list.dateCreated}
      />
      <Content
        lines={list.lines}
      />
      <div className={listStyles.footer}></div>
    </div>
  )
}

function Header({title, dateCreated} : {title: string, dateCreated: string}) {
  return(
    <ul className={listStyles.header}>
      <li className={listStyles.line}>{title}</li>
      <li className={listStyles.line}>{dateCreated}</li>
    </ul>
  )
}

function Content({lines}: {lines: string[]}){
  return(
    <ul className={listStyles.content}>
      {lines.map((line, index) => {
        return (<li key={`${line}${index}`} className={listStyles.line}>{line}</li>)
      })}
    </ul>
  )
}