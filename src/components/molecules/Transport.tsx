'use client'

import { Pause, Play, RotateCcw } from 'lucide-react'

import { formatSeconds } from '@domain/tactics'
import { SPEEDS, type Playback } from '@hooks/usePlayback'
import { cn } from '@lib/utils'

export function Transport({ pb }: { pb: Playback }) {
  const label = pb.playing ? 'Pausa' : pb.finished ? 'De novo' : 'Play'
  const Icon = pb.playing ? Pause : pb.finished ? RotateCcw : Play
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2.5">
      <button
        onClick={pb.toggle}
        className="inline-flex min-w-[112px] items-center justify-center gap-2 rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-[#111] transition-transform active:scale-95"
      >
        <Icon
          aria-hidden
          className="size-4"
          fill="currentColor"
          strokeWidth={2.5}
        />
        {label}
      </button>
      <button
        onClick={pb.restart}
        aria-label="Voltar ao início"
        title="Voltar ao início"
        className="grid size-9 place-items-center rounded-md border border-line bg-panel transition-colors hover:border-muted"
      >
        <RotateCcw aria-hidden className="size-4" />
      </button>
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round((pb.time / pb.duration) * 1000)}
        onChange={(e) => pb.seek(+e.target.value / 1000)}
        aria-label="Posição na jogada"
        aria-valuetext={`${formatSeconds(pb.time)} de ${formatSeconds(pb.duration)} segundos`}
        className="min-w-0 flex-[1_1_180px] accent-accent"
      />
      <div
        role="group"
        aria-label="Velocidade"
        className="inline-flex overflow-hidden rounded-md border border-line"
      >
        {SPEEDS.map((s) => (
          <button
            key={s}
            aria-pressed={pb.speed === s}
            onClick={() => pb.setSpeed(s)}
            className={cn(
              'px-2.5 py-2 text-[13px] transition-colors',
              pb.speed === s ? 'bg-fg text-bg' : 'bg-panel hover:text-accent',
            )}
          >
            {String(s).replace('.', ',')}×
          </button>
        ))}
      </div>
      <span className="min-w-[78px] text-right text-[13px] text-muted tabular-nums">
        {formatSeconds(pb.time)} / {formatSeconds(pb.duration)} s
      </span>
    </div>
  )
}
