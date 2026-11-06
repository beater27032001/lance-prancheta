'use client'

import { usePlayback } from '@hooks/usePlayback'
import { Pitch } from '@molecules/Pitch'
import { Transport } from '@molecules/Transport'

export function Board() {
  const pb = usePlayback()
  return (
    <div className="grid items-start gap-[22px] lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <Pitch pb={pb} />
        <Transport pb={pb} />
      </div>
    </div>
  )
}
