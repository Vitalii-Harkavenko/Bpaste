import Navbar from "@/components/Navbar"
import './globals.css'
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: "--Montserrat"
})

export const metadata = {
  title: 'Bpaste',
  description: "Boilerplate code storage so you don't have to write something twice",
}

export default function RootLayout(
	{ children }: { children: React.ReactNode }
) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable}`}>
        <div className="sticky top-0 left-0 w-screen h-20 py-5 px-8 backdrop-blur-xl bg-main">
          <Navbar/>
        </div>
        {children}
      </body>
    </html>
  )
}
