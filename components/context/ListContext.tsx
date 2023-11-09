'use client'
import {createContext, Dispatch, useContext, useReducer} from "react";

export const ListsContext = createContext<List[]>([])
export const ListsDispatchContext = createContext<Dispatch<ListPayload>>({} as Dispatch<ListPayload>)
const initialLists: List[] = []
export const ListsProvider = ({children} : {children: React.ReactNode}) =>{
  const [lists, dispatch] = useReducer(listsReducer, initialLists)
  return (
    <ListsContext.Provider value={lists}>
      <ListsDispatchContext.Provider value={dispatch}>
        {children}
      </ListsDispatchContext.Provider>
    </ListsContext.Provider>
  )
}

const listsReducer = (lists: List[], action: ListPayload) => {
  switch (action.type) {
    case 'add': {
      return [...lists, action.payload]
    }
    case 'change': {
      return lists.map(list => {
        if(list.id === action.payload.id) return action.payload
        return list
      })
    }
    case 'init': {
      return [...lists, ...action.payload]
    }
    default: throw new Error('operation not supported')
  }
}

export const useLists = () => {
  return useContext(ListsContext)
}

export const useDispatchLists = () => {
  return useContext(ListsDispatchContext)
}