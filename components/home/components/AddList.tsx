'use client'
import {SessionProvider} from "next-auth/react";
import addButtonStyles from "@/styles/home/add.module.css"
import {motion} from "framer-motion";
import {useState} from "react";
import {useIsSmall} from "@/utils/hooks/useMediaQuery";

export default function AddList(
  {
    handleAddList: handleAddList = () => {
    },
    handleGroupList: handleAddGroup = () => {
    }
  }
) {
  const [isOn, setIsOn] = useState(false)
  const hoverMotion = {
    scale: 1.05,
    transition: {duration: 0.1},
  }
  const tapMotion = {
    backgroundColor: "rgb(69,116,255)"
  }

  const rowHoverMotion = {
    backgroundColor: "rgb(69,88,255)",
    color: "rgb(255,255,255)",
    transition: {
      duration: 0.2
    }
  }
  async function handleButtonClick(e: React.MouseEvent) {
    setIsOn(!isOn)

  }

  async function handleNoteClick(e: React.MouseEvent) {
    setIsOn(!isOn)
    handleAddList()
  }

  async function handleGroupClick(e: React.MouseEvent) {
    setIsOn(!isOn)
    handleAddGroup()
  }

  const isSmall = useIsSmall()
  const variants = isSmall
    ? {
      minWidth: {
        minWidth: "60vw",
      }
    } :
    {
      minWidth: {
        minWidth: "20rem"
      }
    }

  return (
    <div className={addButtonStyles.container}
         style={!isSmall ? {flexDirection: "row"} : {}}>
      {isOn &&
        <motion.menu layout
                     className={addButtonStyles.menu}
                     variants={variants}
                     animate={isOn && "minWidth"}
        >
          <motion.button
            className={addButtonStyles.row}
            whileHover={rowHoverMotion}
            whileTap={tapMotion}
            onClick={handleNoteClick}

          >
            Add a note...
          </motion.button>
          <motion.button
            className={addButtonStyles.row}
            whileHover={rowHoverMotion}
            whileTap={tapMotion}
            onClick={handleGroupClick}
          >
            Add a group...
          </motion.button>
        </motion.menu>
      }
      <motion.button
        onClick={handleButtonClick}
        layout
        whileHover={{
          ...hoverMotion
        }}
        className={addButtonStyles.button}
        type={"submit"}
        id={"new-note"}
        name={"new-note"}
        animate={isOn ? {
            ...hoverMotion,
            backgroundColor: "rgb(255,35,35)",
            scale: 1.05
          }
          : {}
        }
      >
        <motion.span
          className={addButtonStyles.text}
          whileHover={hoverMotion}
          animate={isOn ? {rotate: -45, scale: 1.05} : {}}
        >
          &#65291;
        </motion.span>
      </motion.button>
    </div>
  )
}