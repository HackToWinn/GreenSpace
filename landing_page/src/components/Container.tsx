export default function Container({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-28 py-14 md:py-20">
      {children}
    </div>
  )
}