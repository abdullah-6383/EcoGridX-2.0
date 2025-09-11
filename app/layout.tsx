import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoGridX - AI-Powered Smart Grid Optimization',
  description: 'Revolutionary AI system for real-time energy distribution optimization, reducing costs and maximizing renewable energy utilization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-950 text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}