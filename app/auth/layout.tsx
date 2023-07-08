export default function RootLayout(
	{ children }: { children: React.ReactNode }
) {
  return (
    <main className="flex items-center justify-center">
      {children}
    </main>
  )
}