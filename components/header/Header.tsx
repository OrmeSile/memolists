import Link from "next/link";
import {getServerSession} from "@/utils/database/auth";
import headerStyles from "@/styles/global/header.module.css"
import ModalButton from "@/components/header/components/ModalButton";
import {SignOut} from "@/components/forms/SignOut";
import {SignIn} from "@/components/forms/SignIn";

export default async function Header() {
    const session = await getServerSession()
    return (
        <header className={headerStyles.header}>
            <Link href={"/"} className={headerStyles.title}>Memos</Link>
            <div className={headerStyles.menu}>
                {session ?
                    <ModalButton name={"sign out"}>
                        <SignOut/>
                    </ModalButton>
                    : <ModalButton name={"sign in"}>
                        <SignIn/>
                    </ModalButton>
                }
            </div>
        </header>
    )
}