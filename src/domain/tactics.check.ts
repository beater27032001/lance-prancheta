// Rode com: npm run check
import assert from 'node:assert/strict'

import {
  activeStep,
  ballPath,
  formatSeconds,
  PLAYS,
  positionsAt,
  startPositions,
  timeline,
} from './tactics.ts'

const play = PLAYS[0]
const { steps, duration } = timeline(play)
assert.equal(steps.length, 6)
assert.ok(
  Math.abs(duration - (5.5 + 6 * 0.25)) < 1e-9,
  'duração soma passos e pausas',
)

const start = startPositions(play)
assert.deepEqual(start.ball, [24, 58], 'setup sobrescreve a escalação')
assert.deepEqual(start.h1, [5, 50], 'quem não está no setup fica na base')

assert.deepEqual(positionsAt(play, 0).ball, [24, 58])
assert.deepEqual(
  positionsAt(play, steps[0].end).ball,
  [23, 58],
  'fim do passo chega ao destino',
)
assert.deepEqual(
  positionsAt(play, duration).ball,
  [100, 47],
  'fim da jogada: bola no gol',
)
const mid = positionsAt(play, steps[1].start + 0.5).ball
assert.ok(mid[0] > 23 && mid[0] < 42, 'no meio do passe a bola está a caminho')

// arrastar o 9 no começo: os movimentos dele partem da nova posição
const moved = positionsAt(play, 0.1, { h9: { pos: [30, 30], at: 0 } })
assert.deepEqual(moved.h9, [30, 30])
const later = positionsAt(play, steps[2].start + 0.01, {
  h9: { pos: [30, 30], at: 0 },
}).h9
assert.ok(later[0] < 40, 'o 9 sai de onde foi arrastado, não do setup')
assert.deepEqual(
  positionsAt(play, duration, { h9: { pos: [30, 30], at: 0 } }).h9,
  [90, 49],
  'e termina no destino da jogada',
)

assert.equal(activeStep(play, 0), -1)
assert.equal(activeStep(play, steps[2].start + 0.1), 2)
assert.equal(ballPath(play).length, 7)
assert.equal(formatSeconds(2.25), '2,3')
console.log('tactics ok')
