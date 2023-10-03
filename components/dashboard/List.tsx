
import listStyles from "@/styles/dashboard/listStyles.module.css"
export default function List() {
  return(
    <div className={listStyles.container}>
      <Header
        title={"title"}
        dateCreated={Date.now()}
      />
      <Content
        lines={["hello", "world", "HELLO", "WORLD"]}
      />
    </div>
  )
}

function Header({title, dateCreated} : {title: string, dateCreated: number}) {
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