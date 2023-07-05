export default function RootLayout(
	{ children }: { children: React.ReactNode }
) {
  return (
    <html lang="en">
      <body>
		<main className="flex items-center justify-center">
       		{children}
		</main>
      </body>
    </html>
  )
}