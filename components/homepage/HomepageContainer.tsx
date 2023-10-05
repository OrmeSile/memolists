'use client'
import {DndContext} from "@dnd-kit/core";
import DashboardContainer from "@/components/dashboard/DashboardContainer";

export default function HomepageContainer() {
    return (
        <DndContext>
            <DashboardContainer title={"one"}/>
            <DashboardContainer title={"two"}/>
        </DndContext>
    )
}