import Link from "next/link";

export default function Header() {
  
  const signout = () => {

  }
  return (<div>
    <button><Link href={"/?logoutConfirmation=true"}>Sign out</Link></button>
  </div>)
}