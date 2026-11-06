'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'

export function Hero() {
  return (
    <section>
      <h1 className="m-0 mt-[.1em] mb-[.15em] overflow-hidden font-display text-[clamp(44px,7vw,92px)] leading-[.88] font-extrabold tracking-[.005em] uppercase">
        <motion.span
          className="block"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Prancheta tática
        </motion.span>
      </h1>
      <motion.p
        className="m-0 mb-[26px] max-w-[60ch] text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      >
        Escolha uma jogada e aperte play. Pause em qualquer momento, volte na
        barra ou arraste os jogadores para testar outra ideia.
      </motion.p>
    </section>
  )
}
