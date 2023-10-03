import Lists from "@/components/homepage/Lists";
import {getServerSession} from "next-auth";
import {auth, config} from "@/utils/auth";
import Link from "next/link";
import List from "@/components/dashboard/List";

export default async function Page(){
  const session = await getServerSession(config);
  return (
    <>
      <h1>Homepage</h1>
      {/*{session ? <Lists/> : <Link href={"/api/auth/signin"}>login</Link>}*/}
      <List/>
    </>
  )
}