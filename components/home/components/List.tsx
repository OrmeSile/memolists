import listStyles from "@/styles/home/list.module.css";
import rowStyles from "@/styles/home/row.module.css";
import {useDraggable} from "@dnd-kit/core";
import {motion} from "framer-motion";
import {useState} from "react";
import {ListRow} from "@/components/home/components/ListRow";
import {useDispatchLists} from "@/components/context/ListContext";

export default function List({list, addRow, deleteRow}: {
  list: List,
  addRow: (listId: string) => Promise<any>,
  deleteRow: ({listId, rowId}: {
    listId: string,
    rowId: string
  }) => Promise<void>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedRow, setEditedRow] = useState<string | undefined>(undefined)
  const dispatch = useDispatchLists()

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: list.id.toString(), disabled: isOpen
  })

  const staticStyles = {
    top: list.position.y,
    left: list.position.x
  } as React.CSSProperties

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

  const handleEffectVariants = {
    dragged: {
      width: "100%"
    }, static: {
      width: 0
    }
  }
  const openStyles = isOpen
    ? {
      touchAction: "auto",
      zIndex: 100000,
      top: "10vh",
      left: "10vw",
      width: "80vw",
      height: "70vh"
    } : {
      touchAction: "none",
      zIndex: 1,
      top: list.position.y,
      left: list.position.x
    }

  const handleDeleteRow = (rowId: string) => {
    deleteRow({listId: list.id, rowId})
  }

  const handleAddButton = async (e: React.MouseEvent) => {
    const id = await addRow(list.id)
    setEditedRow(id)

  }
  const handleEdit = (id: string) => {
    setEditedRow(id)
  }

  const handleClose = () => {
    setIsOpen(false)
    setEditedRow(undefined)
  }

  const handleConfirm = ({id, content}: {
    id: string,
    content: string | undefined
  }) => {
    dispatch({
      type: "change",
      payload: {
        ...list, rows: list.rows.map(row => {
          if (row.id === id) return {
            ...row,
            content: content ? content : ''
          }
          return row
        })
      }
    })
    setEditedRow(undefined)
  }

  const handleChangeType = ({id, type}: { id: string, type: string }) => {
    dispatch({
      type: "change",
      payload: {
        ...list, rows: list.rows.map(row => {
          if (row.id === id) return {...row, type: type}
          return row
        })
      }
    })
  }

  return (
    <div
      ref={setNodeRef}
      className={listStyles.listContainer}
      style={{...transformStyles, ...staticStyles, ...activeStyles, ...openStyles}}
      onClick={(e) => {
        e.stopPropagation()
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
        <motion.div className={listStyles.holdEffect}
                    transition={{duration: 0.1}}
                    variants={handleEffectVariants}
                    whileTap={
                      {
                        backgroundColor: "rgb(70,110,150)",
                        width: "100%",
                        height: "100%"
                      }
                    }
        />
      </motion.div>
      <div
        onClick={(e) => {
          if (!isOpen) setIsOpen(true)
        }}
        style={{width: '100%', height: '100%'}}
      >
        {isOpen && <button onClick={() => handleClose()}>close</button>}
        <ul style={isOpen ? {
          overflowY: 'scroll',
          height: '57vh'
        } : undefined} className={rowStyles.list}>
          {list.rows &&
            list.rows.map((row) => {
              return <ListRow
                row={row}
                deleteRow={handleDeleteRow}
                listIsOpen={isOpen}
                isEdit={editedRow === row.id}
                key={row.id}
                handleEdit={handleEdit}
                handleConfirm={handleConfirm}
                handleChangeType={handleChangeType}
              />
            })
          }
          {isOpen &&
            <li>
              <button className={rowStyles.add}
                      onClick={handleAddButton}>add a row
              </button>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}