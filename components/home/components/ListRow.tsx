import rowStyles from "@/styles/home/row.module.css"
import {RowType} from "@/components/home/components/Row/RowType";
import {useState} from "react";
import {TypeMenu} from "@/components/home/components/Row/TypeMenu";
import {AnimatePresence} from "framer-motion";
import {ListRow as ListRowType} from "@prisma/client";

export const ListRow = ({
                          listIsOpen,
                          isEdit,
                          handleEdit,
                          row,
                          handleConfirm,
                          handleChangeType,
                          deleteRow,
                        }:
                          {
                            listIsOpen: boolean,
                            isEdit: boolean,
                            handleEdit: (id: string) => void,
                            row: ListRowType,
                            handleConfirm: ({id, content}: {
                              id: string,
                              content: string | undefined
                            }) => void,
                            handleChangeType: ({id, type}: {
                              id: string,
                              type: string
                            }) => void,
                            deleteRow: (id: string) => void
                          }) => {
  const [content, setContent] = useState<string | undefined>(undefined)
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false)
  const disabledStyles = listIsOpen ? undefined : {
    cursor: 'default',
    pointerEvents: 'none'
  } as React.CSSProperties
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value)
  }

  const onConfirm = () => {
    handleConfirm({id: row.id, content})
  }

  const onEditClick = () => {
    handleEdit(row.id)
  }

  const handleOpenTypeMenu = () => {
    setIsTypeMenuOpen(true)
  }

  const onTypeMenuClick = (type: string) => {
    handleChangeType({id: row.id, type})
    setIsTypeMenuOpen(false)
  }


  return (
    <div className={rowStyles.row}>
      {isTypeMenuOpen && <div className={rowStyles.overlay}/>}
      <AnimatePresence>
        <RowType type={row.type} onButtonClick={handleOpenTypeMenu}
                 disabled={!listIsOpen}/>
        {isTypeMenuOpen && (
          <>
            <TypeMenu key={"menu"} currentType={row.type}
                      onTypeClick={onTypeMenuClick}/>
          </>
        )}
      </AnimatePresence>
      <div className={rowStyles.contentContainer}>
        <div className={rowStyles.editContainer}>
          {isEdit && listIsOpen
            ? (
              <>
            <textarea className={rowStyles.rowTextArea}
                      onChange={onTextChange}
                      value={content}
                      placeholder={'add content...'}
                      autoFocus={true}
            >
            </textarea>
                <button style={disabledStyles}
                        className={rowStyles.confirm}
                        onClick={onConfirm}>confirm
                </button>
              </>
            )
            : <>
              <div className={rowStyles.rowText}
                   style={disabledStyles}>{content ? content : 'add content...'}</div>
              {listIsOpen &&
                <>
                  <button
                    style={disabledStyles}
                    className={rowStyles.confirm}
                    onClick={onEditClick}>
                    edit
                  </button>
                  <button style={disabledStyles}
                          className={rowStyles.confirm}
                          onClick={() => deleteRow(row.id)}
                  >
                    delete
                  </button>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}