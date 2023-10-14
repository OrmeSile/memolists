import homepageStyles from "@/styles/homepage/homepageStyles.module.css"
import HomepageContainer from "@/components/home/HomepageContainer";
import {List as DBList} from "@prisma/client";
import {createList, getListsOfUser, updateList as managerUpdateList} from "@/utils/database/listManager";
import {getServerSession} from "@/utils/database/auth";
import Link from "next/link";
import LogoutModal from "@/components/home/components/LogoutModal";

export default async function HomePage({searchParams}: {searchParams: Record<string, string> | null | undefined}) {
  const session = await getServerSession()
  const initialLists = session ? await getListsOfUser(session.user.id) : null
  const showModal = searchParams?.logoutConfirmation
  if (session && session.user) {
    return (
      <div className={homepageStyles.container}>
        {showModal && <LogoutModal/>}
        <HomepageContainer
          initialLists={initialLists}
        />
      </div>
    )
  }

  return (<Link href={"/api/auth/signin"}>Sign in</Link>)
}