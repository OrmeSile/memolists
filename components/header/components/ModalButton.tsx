'use client'
import headerStyles from "@/styles/global/header.module.css";
import {useState} from "react";
import {SignOut} from "@/components/forms/SignOut";
import {Modal} from "@/components/global/Modal";

export default function ModalButton({children, name}: {
  children: React.ReactNode,
  name: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={headerStyles.menu}>
      <div className={headerStyles.button}
           onClick={() => setIsOpen(true)}>
        {name}
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen}>{children}</Modal>}
    </div>
  )
}