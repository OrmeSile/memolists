'use client'
import {getSession, SessionProvider} from "next-auth/react";

export default function AddNoteForm() {
    async function handleSubmit (formData: FormData) {
        const session = await getSession()
        console.log((session && session.user) ? session.user :'null')
    }
    return (
        <SessionProvider>
        <form action={handleSubmit}>
            <p>Add a note</p>
            <label htmlFor={"title"}>
                title
            </label>
            <input type={"text"} id={"title"} name={"title"}/>
            <input type={"submit"}/>
        </form>
        </SessionProvider>
    )
}