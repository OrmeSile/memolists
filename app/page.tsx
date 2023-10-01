import type {InferGetServerSidePropsType, GetServerSideProps} from "next";
import {getAllLists} from "@/utils/lists";

async function getData() {
  const lists = await getAllLists()
  return {props: {lists}}
}
export default async function Page(){
  const data = await getData()
  const list = data.props.lists!.map(l => l.rows.map(r =>{
    return (
    <li key={r.id}>
      <p>{r.createdAt.toDateString()}</p>
      <p>{r.content}</p>
    </li>
  )}))
  return (
    <>
      <h1>Homepage</h1>
      <ul>
        {list}
      </ul>
    </>
  )
}