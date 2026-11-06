'use client'

import { AnimatePresence, motion } from 'motion/react'

import { EASE } from '@constants/motion'
import type { Playback } from '@hooks/usePlayback'

/** Narração do passo atual sobre o campo, para quem não está olhando a lista. */
export function StepCaption({ pb }: { pb: Playback }) {
  const step = pb.active >= 0 ? pb.play.steps[pb.active] : null
  // no celular fica abaixo do campo (sobre ele cobriria os jogadores); nas telas maiores, sobre o campo
  return (
    <div
      aria-live="polite"
      className="pointer-events-none mt-2 h-9 sm:absolute sm:inset-x-3 sm:bottom-3 sm:z-30 sm:mt-0 sm:h-auto"
    >
      <AnimatePresence mode="wait">
        {step && (
          <motion.p
            key={`${pb.playIndex}-${pb.active}`}
            className="m-0 inline-flex max-w-full items-baseline gap-2 rounded-md bg-bg/80 px-2.5 py-1.5 text-[13px] text-fg shadow-[0_6px_16px_-6px_rgb(0_0_0/.6)] backdrop-blur-sm sm:text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <span className="font-display font-extrabold text-accent">
              {pb.active + 1}
            </span>
            <span className="truncate">{step.text}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
