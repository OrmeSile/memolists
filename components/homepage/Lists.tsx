import utilStyles from "@/styles/utilStyles.module.css";
import {getAllLists} from "@/utils/database/lists";

async function getData() {
  const lists = await getAllLists()
  return {props: {lists}}
}
export default async function Lists() {
  const data = await getData()
  const lists = data.props.lists
  return (
    <ul className={utilStyles.listUl}>
      {lists!.map((list) => {
        return (
          <li key={list.id} className={utilStyles.listLi}>
            <p>list user: {list.user.name}</p>
            <p>list id : {list.id}</p>
            {list.rows.map((row) => {
              return (
                <div key={`${row.id}-row`}>
                  <p>date: {row.createdAt.toDateString()}</p>
                  <p>content: {row.content}</p>
                </div>
              )
            })}
          </li>
        )
      })}
    </ul>)
}