import {getServerSession} from "next-auth";
import {auth, config} from "@/utils/auth";
import List from "@/components/dashboard/List";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import homepageStyles from "@/styles/homepage/homepageStyles.module.css"

export default async function HomePage() {
  const session = await getServerSession(config);
  return (
    <div className={homepageStyles.container}>
      {/*{session ? <Lists/> : <Link href={"/api/auth/signin"}>login</Link>}*/}
      <DashboardContainer>
        <List/>
        <List/>
        <List/>
      </DashboardContainer>
      <DashboardContainer/>
    </div>
  )
}