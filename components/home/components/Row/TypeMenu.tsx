import {TypeButton} from "@/components/home/components/Row/TypeButton";
import rowStyles from "@/styles/home/row.module.css"
import {motion} from "framer-motion";
import {useState} from "react";

export const TypeMenu = ({onTypeClick, currentType}: {
  onTypeClick: (type: string) => void,
  currentType: string
}) => {
  const initTypes = ['text', 'movie']

  const sortTypes = (types: string[], firstType: string) => {
    return types.toSorted((a, b) => {
      if (a === firstType) return 0
      return 1
    })
  }

  const [types, setTypes] = useState(sortTypes(initTypes, currentType))
  const onClick = (type: string) => {
    setTypes(sortTypes(initTypes, type))
    onTypeClick(type)
  }
  return (
    <motion.div className={rowStyles.rowMenu}
                key={"menu"}
                animate={{width: '6rem'}}
                initial={{width: 0}}
                transition={{type: "spring", duration: 0.4}}
                exit={{
                  width: 0,
                  position: 'absolute',
                  boxShadow: "0 0 0 0 rgba(0,0,0,0)"
                }}
    >
      {types.map((type: string) => {
        return <TypeButton key={type} type={type}
                           onClick={() => onClick(type)}/>
      })}
    </motion.div>
  )
}