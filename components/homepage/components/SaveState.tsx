'use client'
import Image from "next/image";
import {motion} from "framer-motion";
import saveStyles from "@/styles/dashboard/components/saveButton.module.css"
import {SessionProvider} from "next-auth/react";
import {Dispatch, SetStateAction, useEffect} from "react";
import {useIsSmall} from "@/utils/hooks/useMediaQuery";

export default function SaveState({isSaved, saveAll}: {
  isSaved: boolean,
  saveAll: any
}) {
  const color = isSaved ? {backgroundColor: "rgb(70, 155, 255)"} : {backgroundColor: "rgb(255,151,0)"}
  const isSmall = useIsSmall()
  const hoverMotion = {
    scale: 1.05,
  }
  const handleClick = () => {
    saveAll()
    console.log(isSaved)
  }
  return (
    <SessionProvider>
      <motion.div
        style={!isSmall ? {right: "2rem", bottom: "7rem" }: {}}
        onClick={handleClick}
        className={saveStyles.container}
        whileTap={{scale: 0.95}}
        whileHover={hoverMotion}
      >
        <motion.button
          style={color}
          className={saveStyles.button}
          whileTap={{backgroundColor: "rgb(0,114,255)"}}
        >
          <Image
            className={saveStyles.icon}
            src={"/icons/save.svg"}
            alt={"save"}
            width={40}
            height={40}
            color={"white"}
          />
        </motion.button>
      </motion.div>
    </SessionProvider>
  )
}