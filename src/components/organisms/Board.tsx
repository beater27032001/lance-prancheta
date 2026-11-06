'use client'

import { usePlayback } from '@hooks/usePlayback'
import { Pitch } from '@molecules/Pitch'
import { PlayList } from '@molecules/PlayList'
import { StepList } from '@molecules/StepList'
import { Transport } from '@molecules/Transport'

const LABEL =
  'm-0 font-display text-sm font-bold tracking-[.12em] text-muted uppercase'

export function Board() {
  const pb = usePlayback()
  return (
    <div className="grid items-start gap-[22px] lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <Pitch pb={pb} />
        <Transport pb={pb} />
        <p className="mt-2 mb-0 text-[13px] text-muted">
          Pausado, dá para arrastar qualquer jogador. Play recomeça do ponto da
          barra.
        </p>
      </div>
      <aside className="flex min-w-0 flex-col gap-4">
        <h2 className={LABEL}>Jogadas</h2>
        <PlayList pb={pb} />
        <h2 className={LABEL}>Passo a passo</h2>
        <StepList pb={pb} />
      </aside>
    </div>
  )
}
