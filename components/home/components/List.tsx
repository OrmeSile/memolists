import listStyles from "@/styles/home/list.module.css";
import rowStyles from "@/styles/home/row.module.css";
import {useDraggable, useSensors} from "@dnd-kit/core";
import {motion} from "framer-motion";
import {useState} from "react";
import {ListRow} from "@/components/home/components/ListRow";

export default function List({list}: { list: List }) {
    const [isOpen, setIsOpen] = useState(false)

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: list.id.toString(), disabled: isOpen
    })
    const staticStyles = {
        top: list.position.y,
        left: list.position.x
    } as React.CSSProperties

    const getPosition = () => {
        return
    }
    const transformStyles = transform
        ? {
            boxShadow: "rgba(0, 0, 0, 0.8) 0px 15px 45px",
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            zIndex: 10
        } as React.CSSProperties
        : undefined

    const activeStyles = list.isLastActive ? {
        zIndex: 9
    } as React.CSSProperties : undefined

    const variants = {dragged: {width: "100%"}, static: {width: 0}}

    const openStyles = isOpen ? {
        minWidth: "80%",
        minHeight: "80%",
        position: "absolute",
        top: "10%",
        left: "10%"
    } as React.CSSProperties : undefined

    const handleButton = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div
            ref={setNodeRef}
            key={list.id}
            className={listStyles.listContainer}
            style={{...transformStyles, ...staticStyles, ...activeStyles, ...openStyles}}
            onClick={() => {
                if (!isOpen) setIsOpen(true)
            }}
        >
            <motion.div className={listStyles.handle}
                        initial={false}
                        style={isOpen ? {
                            backgroundColor: "rgb(50,110,255)"
                        } : undefined}
                        animate={transform ? "dragged" : "static"}
                        variants={
                            {
                                dragged:
                                    {
                                        color: "rgb(255,255,255)",
                                        backgroundColor: "rgba(0,0,0,0)"
                                    },
                                static:
                                    {
                                        color: isOpen ? "rgb(255,255,255)" : "rgb(0,0,0)"
                                    }
                            }
                        }
                        {...attributes}{...listeners}>
                {list.title ? list.title : "unnamed"}
                <motion.div className={listStyles.holdEffect} transition={{duration: 0.1}}
                            variants={variants}
                            whileTap={
                                {
                                    backgroundColor: "rgb(70,110,150)",
                                    width: "100%",
                                    height: "100%"
                                }
                            }
                />
            </motion.div>
            <div onClick={() => {
                setIsOpen(!isOpen)
            }
            }>
                {list.rows &&
                    <ul>
                        {list.rows.map((row) => {
                            return <ListRow key={row.id}/>
                        })}
                    </ul>
                }
                {isOpen &&
                    <li className={rowStyles.row}>
                        <button className={rowStyles.add} onClick={handleButton}>add a row</button>
                    </li>
                }
            </div>
        </div>
    )
}