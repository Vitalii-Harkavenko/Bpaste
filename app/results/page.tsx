"use client"
import { useSearchParams } from 'next/navigation'

export default function Results() { 
	const search = useSearchParams().get('search');

  return <p>{search}</p>
}