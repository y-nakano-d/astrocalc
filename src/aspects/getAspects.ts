import { PlanetPosition, PlanetName, Aspect } from '../types/astro.js'

const MAJOR_ASPECTS = [
  { name: 'Conjunction' as const, angle: 0 },
  { name: 'Sextile' as const, angle: 60 },
  { name: 'Square' as const, angle: 90 },
  { name: 'Trine' as const, angle: 120 },
  { name: 'Opposition' as const, angle: 180 }
]

function normalizeAngleDifference(angle: number): number {
  let diff = Math.abs(angle)
  if (diff > 180) {
    diff = 360 - diff
  }
  return diff
}

function findClosestAspect(angleDifference: number, orb: number): { aspect: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition', exactDiff: number } | null {
  for (const majorAspect of MAJOR_ASPECTS) {
    const exactDiff = Math.abs(angleDifference - majorAspect.angle)
    if (exactDiff <= orb) {
      return {
        aspect: majorAspect.name,
        exactDiff: angleDifference - majorAspect.angle
      }
    }
  }
  return null
}

export function getAspects(planets: PlanetPosition[], orb: number = 6): Aspect[] {
  const aspects: Aspect[] = []

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planetA = planets[i]
      const planetB = planets[j]
      
      const angleDifference = normalizeAngleDifference(planetA.longitude - planetB.longitude)
      const closestAspect = findClosestAspect(angleDifference, orb)
      
      if (closestAspect) {
        aspects.push({
          planetA: planetA.planet,
          planetB: planetB.planet,
          aspect: closestAspect.aspect,
          exact: closestAspect.exactDiff
        })
      }
    }
  }

  return aspects
}