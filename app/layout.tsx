import "./global.css"
import {Providers} from "@/components/provider/Providers";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
  viewport: "width=device-width, initial-scale=1.0"
}



export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
    <body>
    <Providers>{children}</Providers>
    </body>
    </html>
  )
}
