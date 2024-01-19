import Header from "@/components/header/Header";

export default function HomeLayout({children}: { children: React.ReactNode }) {
  return (<div style={{height: "100vh"}}>
    <Header/>
    {children}
  </div>)
}