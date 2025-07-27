import { PlanetPosition, Aspect, AspectType } from '../types/astro'

// Major aspects and their degrees
const MAJOR_ASPECTS: { [key in AspectType]: number } = {
  'Conjunction': 0,
  'Sextile': 60,
  'Square': 90,
  'Trine': 120,
  'Opposition': 180
}

/**
 * Calculates the angular distance between two longitudes (0-360°)
 * Takes into account the circular nature of degrees
 * @param lon1 First longitude in degrees
 * @param lon2 Second longitude in degrees
 * @returns Angular distance in degrees (0-180°)
 */
function getAngularDistance(lon1: number, lon2: number): number {
  const diff = Math.abs(lon1 - lon2)
  return Math.min(diff, 360 - diff)
}

/**
 * Checks if an angular distance matches any major aspect within the given orb
 * @param angularDistance The angular distance to check
 * @param orb The orb tolerance in degrees
 * @returns The aspect type if found, null otherwise
 */
function getAspectType(angularDistance: number, orb: number): AspectType | null {
  for (const [aspectName, aspectDegree] of Object.entries(MAJOR_ASPECTS)) {
    if (Math.abs(angularDistance - aspectDegree) <= orb) {
      return aspectName as AspectType
    }
  }
  return null
}

/**
 * Calculates aspects between planets based on their positions
 * @param planets Array of planet positions
 * @param orb Orb tolerance in degrees (default: 6)
 * @returns Array of aspects found between the planets
 */
export function getAspects(planets: PlanetPosition[], orb: number = 6): Aspect[] {
  if (!planets || planets.length < 2) {
    return []
  }

  const aspects: Aspect[] = []

  // Check all planet pairs
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planetA = planets[i]
      const planetB = planets[j]
      
      const angularDistance = getAngularDistance(planetA.longitude, planetB.longitude)
      const aspectType = getAspectType(angularDistance, orb)
      
      if (aspectType) {
        aspects.push({
          planetA: planetA.planet,
          planetB: planetB.planet,
          aspect: aspectType,
          exact: angularDistance
        })
      }
    }
  }

  return aspects
}