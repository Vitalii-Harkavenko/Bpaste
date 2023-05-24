"use client"

const Favicon = () => {
	const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	let favicon: string;
	prefersDarkTheme ? favicon = "/favicon/light.svg" : favicon = "/favicon/dark.svg";

  return (
		<link
			rel="icon" 
			href={
				window.matchMedia('(prefers-color-scheme: dark)').matches 
				? "/favicon/light.svg" 
				: "/favicon/dark.svg"
			}
			type="image/svg+xml"
		></link>
  )
}

export default Favicon