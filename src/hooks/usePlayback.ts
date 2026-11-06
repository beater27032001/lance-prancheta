'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { useAnimationFrame } from 'motion/react'

import {
  activeStep,
  PLAYS,
  positionsAt,
  timeline,
  type EntityId,
  type Override,
  type Point,
} from '@domain/tactics'

export const SPEEDS = [0.5, 1, 2] as const

/** Relógio da jogada: tempo, play/pausa, velocidade, troca de jogada e arraste. */
export function usePlayback() {
  const [playIndex, setPlayIndex] = useState(0)
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const [overrides, setOverrides] = useState<Record<EntityId, Override>>({})
  // reposicionamento animado ao trocar ou reiniciar a jogada
  const [settling, setSettling] = useState(false)
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const timeRef = useRef(0)

  const play = PLAYS[playIndex]
  const { steps, duration } = useMemo(() => timeline(play), [play])

  const setClock = useCallback((t: number) => {
    timeRef.current = t
    setTime(t)
  }, [])

  useAnimationFrame((_, delta) => {
    if (!playing) return
    const next = Math.min(duration, timeRef.current + (delta / 1000) * speed)
    setClock(next)
    if (next >= duration) setPlaying(false)
  })

  const settle = () => {
    setSettling(true)
    clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => setSettling(false), 650)
  }

  const reset = () => {
    setPlaying(false)
    setClock(0)
    setOverrides({})
    settle()
  }

  return {
    plays: PLAYS,
    playIndex,
    play,
    steps,
    duration,
    time,
    playing,
    speed,
    settling,
    positions: useMemo(
      () => positionsAt(play, time, overrides),
      [play, time, overrides],
    ),
    active: activeStep(play, time),
    finished: time >= duration,
    toggle: () => {
      if (playing) return setPlaying(false)
      if (timeRef.current >= duration) reset()
      setPlaying(true)
    },
    restart: reset,
    seek: (fraction: number) => {
      setPlaying(false)
      setClock(fraction * duration)
    },
    seekStep: (i: number) => {
      setClock(steps[i].start)
      setPlaying(true)
    },
    setSpeed,
    selectPlay: (i: number) => {
      setPlayIndex(i)
      reset()
    },
    /** Arrastar só com a jogada pausada; vale a partir do instante atual. */
    drag: (id: EntityId, pos: Point) => {
      if (playing) return
      setOverrides((o) => ({ ...o, [id]: { pos, at: timeRef.current } }))
    },
  }
}

export type Playback = ReturnType<typeof usePlayback>
