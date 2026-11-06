import { Header } from '@organisms/Header'
import { Hero } from '@organisms/Hero'
import { MotionProvider } from '@providers/MotionProvider'

export default function Home() {
  return (
    <MotionProvider>
      <div className="wrap">
        <Header />
        <Hero />
      </div>
    </MotionProvider>
  )
}
