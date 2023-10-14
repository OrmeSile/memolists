import Header from "@/components/home/components/Header";

export default function HomeLayout({children}: {children: React.ReactNode}){
  return (<div>
    <Header/>
    {children}
  </div>)
}