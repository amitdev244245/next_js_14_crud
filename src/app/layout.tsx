import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CRUD App',
  description: 'Generated by Amit Sharma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
