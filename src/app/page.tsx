import { Board } from '@organisms/Board'
import { Features } from '@organisms/Features'
import { Footer } from '@organisms/Footer'
import { Header } from '@organisms/Header'
import { Hero } from '@organisms/Hero'
import { MotionProvider } from '@providers/MotionProvider'

export default function Home() {
  return (
    <MotionProvider>
      <div className="wrap">
        <Header />
        <Hero />
        <Board />
      </div>
      <Features />
      <Footer />
    </MotionProvider>
  )
}
