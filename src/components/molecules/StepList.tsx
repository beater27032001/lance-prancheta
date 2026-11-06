'use client'

import type { Playback } from '@hooks/usePlayback'
import { cn } from '@lib/utils'

export function StepList({ pb }: { pb: Playback }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
      {pb.play.steps.map((step, i) => {
        const on = pb.active === i
        const done = i < pb.active
        return (
          <li key={i}>
            <button
              onClick={() => pb.seekStep(i)}
              aria-current={on ? 'step' : undefined}
              className={cn(
                'grid w-full grid-cols-[26px_1fr] gap-2 rounded-md px-2.5 py-2 text-left text-[14.5px] transition-colors',
                on ? 'bg-panel text-fg' : 'text-muted hover:text-fg',
              )}
            >
              <span
                className={cn(
                  'font-display text-lg leading-[1.1] font-extrabold tabular-nums',
                  on ? 'text-accent' : done ? 'text-muted' : 'text-line',
                )}
              >
                {i + 1}
              </span>
              {step.text}
            </button>
          </li>
        )
      })}
    </ol>
  )
}
