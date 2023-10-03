'use client'
import listStyles from "@/styles/dashboard/dashboardStyles.module.css"
export default function List() {
// TODO ajouter un objet de transfert de données
  const handleDragStart = (event: React.DragEvent) => {
  }
  const handleDragEnd = (event: React.DragEvent) => {
  }
  return(
    <div
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
      className={listStyles.container}
    draggable={true}>
      <Header
        title={"title"}
        dateCreated={new Date(1588688545451).toDateString()}
      />
      <Content
        lines={["hello", "world", "HELLO", "WORLD"]}
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