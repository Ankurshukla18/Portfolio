import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ankur Shukla — Software Developer',
  description:
    'Software Developer focused on backend engineering, APIs, scalable systems and modern web technologies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">{children}</body>
    </html>
  )
}
