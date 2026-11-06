'use client'

import type { Playback } from '@hooks/usePlayback'
import { cn } from '@lib/utils'

export function PlayList({ pb }: { pb: Playback }) {
  return (
    <div className="flex flex-col gap-1.5">
      {pb.plays.map((play, i) => (
        <button
          key={play.id}
          aria-pressed={pb.playIndex === i}
          onClick={() => pb.selectPlay(i)}
          className={cn(
            'flex flex-col gap-0.5 rounded-lg border px-3.5 py-3 text-left transition-colors',
            pb.playIndex === i
              ? 'border-accent bg-accent/[.07]'
              : 'border-line bg-panel hover:border-muted',
          )}
        >
          <b className="font-display text-[22px] font-bold tracking-[.02em] uppercase">
            {play.name}
          </b>
          <span className="text-[13px] text-muted">{play.summary}</span>
        </button>
      ))}
    </div>
  )
}
