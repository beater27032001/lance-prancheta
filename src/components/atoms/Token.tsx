'use client'

import type { PointerEvent } from 'react'

import { motion } from 'motion/react'

import type { Point } from '@domain/tactics'
import { cn } from '@lib/utils'

interface Props {
  id: string
  pos: Point
  index: number
  moving: boolean
  draggable: boolean
  settling: boolean
  onDrag: (e: PointerEvent<HTMLDivElement>) => void
}

const LABEL = { h: 'Time da casa', a: 'Adversário' } as const

/** Jogador (h9, a4) ou bola, posicionado em % do campo. */
export function Token({
  id,
  pos,
  index,
  moving,
  draggable,
  settling,
  onDrag,
}: Props) {
  const isBall = id === 'ball'
  const side = id[0] as 'h' | 'a'
  const number = id.slice(1)
  return (
    <motion.div
      role={isBall ? undefined : 'img'}
      aria-label={isBall ? undefined : `${LABEL[side]} ${number}`}
      aria-hidden={isBall || undefined}
      onPointerDown={(e) => {
        if (!draggable) return
        e.currentTarget.setPointerCapture(e.pointerId)
        e.preventDefault()
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) onDrag(e)
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        delay: 0.4 + index * 0.025,
        type: 'spring',
        stiffness: 420,
        damping: 22,
      }}
      style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, x: '-50%', y: '-50%' }}
      className={cn(
        'absolute grid aspect-square place-items-center rounded-full shadow-[0_3px_6px_rgb(0_0_0/.4)] select-none',
        settling && 'transition-[left,top] duration-500 ease-out',
        isBall
          ? 'z-20 w-[clamp(9px,1.4%,15px)] border-2 border-[#111] bg-white'
          : 'z-10 w-[clamp(18px,3.1%,34px)] font-display text-[clamp(10px,1.4vw,16px)] font-extrabold',
        side === 'h' &&
          !isBall &&
          (number === '1'
            ? 'bg-[#ffcf33] text-home-text'
            : 'bg-home text-home-text'),
        side === 'a' &&
          !isBall &&
          (number === '1'
            ? 'bg-[#2b2b2b] text-white'
            : 'bg-away text-away-text'),
        draggable && !isBall && 'cursor-grab touch-none active:cursor-grabbing',
        draggable && isBall && 'cursor-grab touch-none',
        moving && 'ring-2 ring-accent ring-offset-1 ring-offset-transparent',
      )}
    >
      {isBall ? null : number}
    </motion.div>
  )
}
