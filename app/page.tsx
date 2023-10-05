import {getServerSession} from "next-auth";
import {auth, config} from "@/utils/database/auth";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import homepageStyles from "@/styles/homepage/homepageStyles.module.css"
import {DndContext} from "@dnd-kit/core";
import AddNoteForm from "@/components/forms/AddNoteForm";
import HomepageContainer from "@/components/homepage/HomepageContainer";

export default async function HomePage() {
  const session = await getServerSession(config);
  return (
    <div className={homepageStyles.container}>
        <AddNoteForm/>
        <HomepageContainer/>
    </div>
  )
}