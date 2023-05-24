import Favicon from "./Favicon"
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bpaste',
  description: "Boilerplate code storage so you don't have to write something twice",
}

export default function RootLayout(
	{ children }: { children: React.ReactNode }
) {
  return (
    <html lang="en">
			<head>
        <Favicon />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
