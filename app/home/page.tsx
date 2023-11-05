import homepageStyles from "@/styles/home/home.module.css"
import HomeContainer from "@/components/home/HomeContainer";
import {getListsOfUser} from "@/utils/database/listManager";
import {getServerSession} from "@/utils/database/auth";
import Link from "next/link";

export default async function HomePage({searchParams}: {searchParams: Record<string, string> | null | undefined}) {
  const session = await getServerSession()
  const initialLists = session ? await getListsOfUser(session.user.id) : null
  const showModal = searchParams?.logoutConfirmation
  if (session && session.user) {
    return (
      <div className={homepageStyles.container}>
        <HomeContainer
          initialLists={initialLists}
        />
      </div>
    )
  }

  return (<Link href={"/api/auth/signin"}>Sign in</Link>)
}