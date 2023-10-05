'use client'
import {ReactNode} from "react";
import dashboardStyles from "@/styles/dashboard/dashboardStyles.module.css"
import {useDroppable} from "@dnd-kit/core";

export default function DashboardContainer({children, title}: {children?: ReactNode, title: string}) {
  // TODO ajouter un objet de transfert de données
  const {isOver, setNodeRef} = useDroppable({
    id: title
  })
  const style = {
    backgroundColor: isOver ? 'green' : undefined
  }
  return (
    <div
      ref={setNodeRef}
      className={dashboardStyles.dashboard}
      style={style}
    >
      <p>{title}</p>
    {children}
</div>
)
}