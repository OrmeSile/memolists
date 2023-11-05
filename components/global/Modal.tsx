import {Dispatch, SetStateAction, useState} from "react";
import modalStyles from "@/styles/global/modal.module.css"

export const Modal = ({children, setIsOpen}: { children?: React.ReactNode, setIsOpen: Dispatch<SetStateAction<boolean>>}) => {

  return (
    <div className={modalStyles.overlay}>
        <div className={modalStyles.container}>
          <div className={modalStyles.buttonContainer}>
            <button className={modalStyles.button} onClick={() => setIsOpen(false)}>
              Close X
            </button>
          </div>
            {children}
        </div>
    </div>
)
}