import { 
  julian, 
  planetposition, 
  pluto, 
  moonposition 
} from 'astronomia'
import vsop87Bmercury from 'astronomia/data/vsop87Bmercury'
import vsop87Bvenus from 'astronomia/data/vsop87Bvenus'
import vsop87Bearth from 'astronomia/data/vsop87Bearth'
import vsop87Bmars from 'astronomia/data/vsop87Bmars'
import vsop87Bjupiter from 'astronomia/data/vsop87Bjupiter'
import vsop87Bsaturn from 'astronomia/data/vsop87Bsaturn'
import vsop87Buranus from 'astronomia/data/vsop87Buranus'
import vsop87Bneptune from 'astronomia/data/vsop87Bneptune'
import { PlanetName, PlanetPosition } from '../types/astro.js'
import { getZodiacFromLongitude } from '../zodiac/getZodiacFromLongitude'
import { normalizeLongitude } from '../utils/astroUtils'

// VSOP87 planet models
const PLANET_MODELS = {
  Mercury: vsop87Bmercury,
  Venus: vsop87Bvenus,
  Mars: vsop87Bmars,
  Jupiter: vsop87Bjupiter,
  Saturn: vsop87Bsaturn,
  Uranus: vsop87Buranus,
  Neptune: vsop87Bneptune
} as const

/**
 * Calculates the geocentric ecliptic longitude of a planet for a given date
 * @param planet Planet name
 * @param date Date for calculation
 * @returns PlanetPosition with longitude, zodiac sign, and degree in sign
 */
export function getPlanetPosition(planet: PlanetName, date: Date): PlanetPosition {
  // Convert date to Julian Day
  const jd = julian.DateToJD(date)
  
  let longitudeRadians: number
  
  if (planet === 'Sun') {
    // For Sun, we calculate the Earth's position and add 180°
    const earth = new planetposition.Planet(vsop87Bearth)
    const earthPos = earth.position2000(jd)
    longitudeRadians = earthPos.lon + Math.PI // Add 180° to get Sun's apparent position
  } else if (planet === 'Moon') {
    // Use Moon position calculation
    const moonPos = moonposition.position(jd)
    longitudeRadians = moonPos.lon
  } else if (planet === 'Pluto') {
    // Pluto uses a different calculation method
    const plutoPos = pluto.heliocentric(jd)
    longitudeRadians = plutoPos.lon
  } else {
    // Regular planets using VSOP87
    const planetModel = PLANET_MODELS[planet as keyof typeof PLANET_MODELS]
    if (!planetModel) {
      throw new Error(`Unsupported planet: ${planet}`)
    }
    
    const planetObj = new planetposition.Planet(planetModel)
    const position = planetObj.position2000(jd)
    longitudeRadians = position.lon
  }
  
  // Convert radians to degrees and normalize
  const normalizedLongitude = normalizeLongitude(longitudeRadians)
  
  // Get zodiac sign information
  const zodiacInfo = getZodiacFromLongitude(normalizedLongitude)
  
  return {
    planet,
    longitude: normalizedLongitude,
    sign: zodiacInfo.sign,
    degreeInSign: zodiacInfo.degreeInSign
  }
}
