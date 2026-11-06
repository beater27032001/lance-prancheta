'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'

const FEATURES = [
  {
    title: 'Monte no treino',
    text: 'Grave a sua jogada arrastando os jogadores e compartilhe com o elenco antes do jogo.',
  },
  {
    title: 'Mostre no vestiário',
    text: 'Modo tela cheia para TV, com passo a passo em letra grande e controle pelo celular.',
  },
  {
    title: 'Revise depois',
    text: 'Compare a jogada ensaiada com o lance real, lado a lado.',
  },
]

export function Features() {
  return (
    <section
      id="recursos"
      className="mt-[70px] scroll-mt-6 border-t border-line py-16 sm:py-20"
    >
      <motion.div
        className="wrap grid gap-[22px] md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            <span className="font-display text-sm font-bold text-accent tabular-nums">
              0{i + 1}
            </span>
            <h3 className="m-0 mt-1 mb-1.5 font-display text-[28px] leading-none font-extrabold uppercase">
              {f.title}
            </h3>
            <p className="m-0 text-muted">{f.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
