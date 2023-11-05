'use client'

import {signOut} from "next-auth/react";
import modalStyles from "@/styles/home/modal.module.css";
import Link from "next/link";
import globalStyles from "@/styles/global/button.module.css";

export const SignOut = () => {
  const handleLogout = async () => {
    await signOut({redirect: true, callbackUrl: "/"})
  }
  return (
    <div>
      <div>
        <p>Sign out ?</p>
        <button onClick={handleLogout} className={globalStyles.button}
        >Yes
        </button>
      </div>
    </div>
  )
}