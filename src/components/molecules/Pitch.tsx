'use client'

import { Token } from '@atoms/Token'
import { ENTITIES, type Point } from '@domain/tactics'
import type { Playback } from '@hooks/usePlayback'

import { PitchMarkings } from './PitchMarkings'
import { StepCaption } from './StepCaption'

const points = (list: Point[]) => list.map((p) => p.join(',')).join(' ')

export function Pitch({ pb }: { pb: Playback }) {
  const step = pb.active >= 0 ? pb.steps[pb.active] : null
  const inMotion = step && pb.time < step.end

  // caminho da bola: o que já foi jogado fica sólido, o resto tracejado
  const ballTargets = pb.steps.filter((s) => s.moves.ball)
  const played: Point[] = [
    pb.play.setup.ball,
    ...ballTargets.filter((s) => s.end <= pb.time).map((s) => s.moves.ball),
    pb.positions.ball,
  ]
  const planned: Point[] = [
    pb.play.setup.ball,
    ...ballTargets.map((s) => s.moves.ball),
  ]

  return (
    <div className="relative aspect-[105/68] w-full overflow-hidden rounded-lg bg-[repeating-linear-gradient(90deg,var(--color-grass-1)_0_9.52%,var(--color-grass-2)_9.52%_19.04%)] shadow-[0_20px_50px_-20px_rgb(0_0_0/.8)]">
      <PitchMarkings />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      >
        <polyline
          points={points(planned)}
          fill="none"
          stroke="rgb(255 255 255 / .35)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={points(played)}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {ENTITIES.map((id, i) => (
        <Token
          key={id}
          id={id}
          index={i}
          pos={pb.positions[id]}
          moving={Boolean(inMotion && step.moves[id] && id !== 'ball')}
          draggable={!pb.playing}
          settling={pb.settling}
        />
      ))}
      <StepCaption pb={pb} />
    </div>
  )
}
