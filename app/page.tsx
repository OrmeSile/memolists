import buttonStyles from "@/styles/global/button.module.css"
import Link from "next/link";
import Header from "@/components/header/Header";
import {Modal} from "@/components/global/Modal";
import {SignIn} from "@/components/forms/SignIn";
import {Footer} from "@/components/footer/Footer";


export default function Main() {
  return (
    <div>
      <Header/>
      <h1>Memos: organize your notes</h1>
      <ul>
        <li>hop</li>
        <li>hop</li>
        <li>hop</li>
      </ul>
      <Footer/>
    </div>)
}