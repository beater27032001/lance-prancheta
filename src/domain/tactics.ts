// Campo em porcentagem: x de 0 a 100 da esquerda para a direita, y de 0 a 100 de cima para baixo.
export type Point = [number, number]
export type EntityId = string // 'h9' (casa), 'a4' (adversário) ou 'ball'

export interface Step {
  text: string
  duration: number
  moves: Record<EntityId, Point>
}

export interface Play {
  id: string
  name: string
  summary: string
  setup: Record<EntityId, Point>
  steps: Step[]
}

export const HOME_BASE: Record<string, Point> = {
  1: [5, 50],
  2: [24, 85],
  4: [20, 62],
  3: [20, 38],
  6: [24, 15],
  5: [38, 50],
  8: [45, 70],
  10: [45, 30],
  7: [64, 84],
  9: [70, 50],
  11: [64, 16],
}
export const AWAY_BASE: Record<string, Point> = {
  1: [95, 50],
  2: [80, 18],
  3: [78, 40],
  4: [78, 60],
  6: [80, 82],
  5: [60, 42],
  8: [60, 58],
  7: [62, 20],
  11: [62, 80],
  9: [45, 42],
  10: [45, 58],
}

export const ENTITIES: EntityId[] = [
  ...Object.keys(HOME_BASE).map((n) => `h${n}`),
  ...Object.keys(AWAY_BASE).map((n) => `a${n}`),
  'ball',
]

export const PLAYS: Play[] = [
  {
    id: 'contra-ataque',
    name: 'Contra-ataque',
    summary: 'Roubada na defesa, três passes até o gol',
    setup: {
      ball: [24, 58],
      a9: [26, 44],
      a10: [28, 62],
      a5: [38, 40],
      a8: [40, 58],
      a7: [46, 22],
      a11: [46, 80],
      a2: [60, 20],
      a3: [58, 40],
      a4: [58, 60],
      a6: [60, 80],
      h8: [34, 70],
      h10: [40, 32],
      h7: [48, 86],
      h11: [48, 14],
      h9: [54, 50],
    },
    steps: [
      {
        text: 'Zagueiro desarma e já olha para frente',
        duration: 0.8,
        moves: { h4: [23, 58], ball: [23, 58], a10: [25, 62] },
      },
      {
        text: 'Passe vertical para o 10 entre as linhas',
        duration: 1,
        moves: {
          ball: [42, 34],
          h10: [42, 34],
          h7: [60, 88],
          h11: [60, 12],
          a5: [40, 38],
        },
      },
      {
        text: 'O 10 conduz e atrai dois marcadores',
        duration: 1.2,
        moves: {
          h10: [58, 38],
          ball: [58, 38],
          a3: [62, 40],
          a5: [54, 36],
          h9: [76, 50],
          h7: [76, 86],
          h11: [74, 14],
          a2: [70, 18],
          a4: [68, 58],
        },
      },
      {
        text: 'Bola em profundidade para o 11',
        duration: 1,
        moves: { ball: [86, 18], h11: [86, 18], a2: [82, 24], h9: [84, 48] },
      },
      {
        text: 'Cruzamento rasteiro no meio da área',
        duration: 0.9,
        moves: { ball: [90, 49], h9: [90, 49], h7: [86, 64], a4: [86, 56] },
      },
      {
        text: 'Finalização de primeira',
        duration: 0.6,
        moves: { ball: [100, 47], a1: [97, 42] },
      },
    ],
  },
  {
    id: 'pressao-alta',
    name: 'Pressão alta',
    summary: 'Gatilho no passe do goleiro, roubada no ataque',
    setup: {
      ball: [95, 50],
      a2: [88, 22],
      a3: [88, 40],
      a4: [88, 62],
      a6: [86, 82],
      a5: [76, 46],
      a8: [76, 58],
      h9: [74, 50],
      h7: [70, 74],
      h11: [70, 26],
      h10: [62, 36],
      h8: [62, 62],
      h5: [54, 50],
      h2: [52, 86],
      h6: [52, 14],
      h4: [42, 60],
      h3: [42, 40],
    },
    steps: [
      {
        text: 'Goleiro sai curto pelo zagueiro direito',
        duration: 0.8,
        moves: { ball: [88, 62] },
      },
      {
        text: 'Gatilho: o 7 pressiona por dentro e fecha o passe de volta',
        duration: 0.9,
        moves: { h7: [84, 66], h9: [86, 52], a4: [87, 66] },
      },
      {
        text: 'O 8 encaixa no volante, o lateral sobe',
        duration: 0.9,
        moves: { h8: [74, 58], h2: [70, 88], h10: [76, 42], a8: [78, 60] },
      },
      {
        text: 'Passe forçado pela lateral',
        duration: 0.8,
        moves: { ball: [82, 92], a6: [82, 92] },
      },
      {
        text: 'Lateral rouba perto da área',
        duration: 0.6,
        moves: { h2: [82, 90], ball: [82, 90], a6: [80, 94] },
      },
      {
        text: 'Chute cruzado',
        duration: 0.7,
        moves: { ball: [100, 53], a1: [98, 58] },
      },
    ],
  },
  {
    id: 'escanteio-ensaiado',
    name: 'Escanteio ensaiado',
    summary: 'Escanteio curto e cruzamento no segundo pau',
    setup: {
      ball: [99.5, 99],
      h7: [99, 97],
      h10: [80, 76],
      h9: [86, 40],
      h4: [84, 56],
      h3: [83, 46],
      h5: [78, 62],
      h8: [72, 40],
      h2: [60, 70],
      h6: [60, 30],
      a2: [94, 40],
      a3: [94, 52],
      a4: [90, 46],
      a6: [90, 60],
      a5: [86, 34],
      a8: [84, 66],
      a7: [80, 82],
      a11: [76, 50],
      a9: [70, 60],
      a10: [70, 40],
    },
    steps: [
      {
        text: 'Bloqueio: 4 e 3 atacam o primeiro pau e arrastam a zona',
        duration: 0.8,
        moves: { h4: [95, 58], h3: [94, 48], a3: [95, 56] },
      },
      {
        text: 'Escanteio curto para o 10',
        duration: 0.7,
        moves: { h10: [90, 86], ball: [90, 86], a7: [86, 84] },
      },
      {
        text: 'Tabela: o 10 devolve para o 7 na linha',
        duration: 0.7,
        moves: { h7: [97, 88], ball: [97, 88], a7: [90, 86] },
      },
      {
        text: 'Cruzamento fechado no segundo pau',
        duration: 0.9,
        moves: { ball: [92, 30], h9: [92, 32], a5: [90, 34] },
      },
      {
        text: 'Cabeçada para baixo',
        duration: 0.5,
        moves: { ball: [100, 45], a1: [98, 52] },
      },
    ],
  },
]

/** Pausa curta depois de cada passo, para o lance respirar. */
export const STEP_GAP = 0.25

export interface TimedStep extends Step {
  start: number
  end: number
}

export function timeline(play: Play) {
  let t = 0
  const steps: TimedStep[] = play.steps.map((s) => {
    const start = t
    t += s.duration + STEP_GAP
    return { ...s, start, end: start + s.duration }
  })
  return { steps, duration: t }
}

/** Formação inicial da jogada: escalação base com as posições do setup por cima. */
export function startPositions(play: Play): Record<EntityId, Point> {
  const pos: Record<EntityId, Point> = {}
  for (const [n, p] of Object.entries(HOME_BASE)) pos[`h${n}`] = p
  for (const [n, p] of Object.entries(AWAY_BASE)) pos[`a${n}`] = p
  return { ...pos, ...play.setup }
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeBall = (x: number) => 1 - (1 - x) ** 2 // a bola sai forte e freia
const easePlayer = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2
const lerp = (a: Point, b: Point, k: number): Point => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
]

/** Jogador arrastado: a partir de `at` ele está em `pos`, e os próximos movimentos partem dali. */
export interface Override {
  pos: Point
  at: number
}

/** Onde cada um está no instante t (segundos). */
export function positionsAt(
  play: Play,
  t: number,
  overrides: Record<EntityId, Override> = {},
): Record<EntityId, Point> {
  const { steps } = timeline(play)
  const start = startPositions(play)
  const out: Record<EntityId, Point> = {}
  for (const id of ENTITIES) {
    // antes do instante do arraste, vale a jogada original (dá para voltar na barra)
    const ov =
      overrides[id] && t >= overrides[id].at ? overrides[id] : undefined
    const ease = id === 'ball' ? easeBall : easePlayer
    let pos = start[id]
    let current = pos
    let applied = false
    for (const step of steps) {
      if (step.start > t) break
      // arrastado antes deste passo: a jogada continua de onde ele foi deixado
      if (ov && !applied && ov.at <= step.start) {
        pos = current = ov.pos
        applied = true
      }
      const target = step.moves[id]
      if (!target) continue
      let from = pos
      let begin = step.start
      // arrastado no meio do próprio movimento: o resto parte da posição arrastada
      if (ov && !applied && ov.at < step.end) {
        from = ov.pos
        begin = ov.at
        applied = true
      }
      current = lerp(
        from,
        target,
        ease(clamp01((t - begin) / (step.end - begin))),
      )
      pos = target
    }
    out[id] = ov && !applied ? ov.pos : current
  }
  return out
}

/** Passo em andamento no instante t; -1 antes de começar. */
export function activeStep(play: Play, t: number) {
  if (t <= 0) return -1
  const { steps } = timeline(play)
  let active = -1
  steps.forEach((s, i) => {
    if (t >= s.start - 0.001) active = i
  })
  return active
}

/** Pontos do caminho da bola: saída e cada destino, na ordem. */
export function ballPath(play: Play): Point[] {
  return [
    play.setup.ball,
    ...play.steps.flatMap((s) => (s.moves.ball ? [s.moves.ball] : [])),
  ]
}

export const formatSeconds = (s: number) => s.toFixed(1).replace('.', ',')
