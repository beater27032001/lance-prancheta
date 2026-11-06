import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'

import './globals.css'

const display = Barlow_Condensed({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
})
const body = Barlow({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'Lance · Prancheta tática',
  description:
    'Lance: a prancheta tática em que você escolhe a jogada, aperta play e arrasta os jogadores para testar outra ideia.',
}

export const viewport: Viewport = {
  themeColor: '#0d1210',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
