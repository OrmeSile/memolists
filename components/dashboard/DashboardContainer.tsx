'use client'
import {ReactNode, useRef, useState} from "react";
import dashboardStyles from "@/styles/dashboard/dashboardStyles.module.css"
export default function DashboardContainer({children}: {children?: ReactNode}) {
  // TODO ajouter un objet de transfert de données
  const [hovered, setHovered] = useState(false)
  const handleDragEnter = (event: React.DragEvent)=> {
    event.stopPropagation()
    event.preventDefault()
  }
  const handleDragLeave = (event: React.DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setHovered(false)
  }
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setHovered(true)
  }

  const handleDrop = (event: React.DragEvent) => {
    setHovered(false)
    event.preventDefault()
    console.log(event.dataTransfer)
  }
  return (
    <div
      style={hovered ? {background: "red"}: {}}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={dashboardStyles.dashboard}>
      {children}
    </div>
  )
}