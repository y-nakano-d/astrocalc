import * as julian from 'astronomia/julian'
import * as planetposition from 'astronomia/planetposition'
import * as vsop87Bmercury from 'astronomia/vsop87Bmercury'
import * as vsop87Bvenus from 'astronomia/vsop87Bvenus'
import * as vsop87Bearth from 'astronomia/vsop87Bearth'
import * as vsop87Bmars from 'astronomia/vsop87Bmars'
import * as vsop87Bjupiter from 'astronomia/vsop87Bjupiter'
import * as vsop87Bsaturn from 'astronomia/vsop87Bsaturn'
import * as vsop87Buranus from 'astronomia/vsop87Buranus'
import * as vsop87Bneptune from 'astronomia/vsop87Bneptune'
import * as solarsystem from 'astronomia/solarsystem'
import * as moonposition from 'astronomia/moonposition'
import { PlanetName, PlanetPosition } from '../types/astro.js'
import { getZodiacFromLongitude } from '../zodiac/getZodiacFromLongitude.js'

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
  const jd = julian.DateTimeToJD(date)
  
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
    const plutoPos = solarsystem.plutoPosition(jd)
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
  
  // Convert radians to degrees
  const longitudeDegrees = (longitudeRadians * 180 / Math.PI) % 360
  const normalizedLongitude = longitudeDegrees < 0 ? longitudeDegrees + 360 : longitudeDegrees
  
  // Get zodiac sign information
  const zodiacInfo = getZodiacFromLongitude(normalizedLongitude)
  
  return {
    planet,
    longitude: normalizedLongitude,
    sign: zodiacInfo.sign,
    degreeInSign: zodiacInfo.degreeInSign
  }
}