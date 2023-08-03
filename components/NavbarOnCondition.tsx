"use client"

import { usePathname } from 'next/navigation'
import Navbar from "@/components/Navbar"

export default function NavbarOnCondition() {
	const pathname = usePathname();
	return pathname.startsWith('/auth') || pathname === "/" || pathname === "/results" ? null : <Navbar />
}
