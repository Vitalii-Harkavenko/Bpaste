"use client"

import Navbar from "@/components/Navbar"
import "./styles"
import { Inter, Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable}`}>
        {pathname.startsWith('/auth') ? null : <Navbar />}
        {children}
      </body>
    </html>
  )
}
