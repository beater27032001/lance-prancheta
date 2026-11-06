'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'

export function Header() {
  return (
    <motion.header
      className="flex items-center justify-between gap-3 py-[18px]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className="font-display text-[26px] font-extrabold tracking-[.02em] uppercase">
        Lance<span className="text-accent">.</span>
      </span>
      <a
        href="#recursos"
        className="rounded-md border border-line bg-panel px-3 py-[7px] text-[13px] transition-colors hover:border-accent hover:text-accent"
      >
        Recursos
      </a>
    </motion.header>
  )
}
