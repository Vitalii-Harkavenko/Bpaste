import "./styles"
import { Inter, Montserrat } from 'next/font/google'
import NavbarOnCondition from "@/components/NavbarOnCondition"

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
        <NavbarOnCondition />
        {children}
      </body>
    </html>
  )
}
