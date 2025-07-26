import { PlanetName, PlanetPosition } from '../types/astro'
import { getPlanetPosition } from './getPlanetPosition'

// All planets that should be included in the response
const ALL_PLANETS: PlanetName[] = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
]

/**
 * Calculates the positions of all planets for a given date
 * @param date Date for calculation
 * @returns Array of PlanetPosition objects for all planets
 */
export function getAllPlanetPositions(date: Date): PlanetPosition[] {
  return ALL_PLANETS.map(planet => getPlanetPosition(planet, date))
}