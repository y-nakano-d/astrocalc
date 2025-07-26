import { ZodiacSign, ZodiacSignInfo } from '../types/astro.js'

const ZODIAC_SIGNS: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

/**
 * Converts ecliptic longitude to zodiac sign information
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns ZodiacSignInfo with sign and degree within sign
 */
export function getZodiacFromLongitude(longitude: number): ZodiacSignInfo {
  // Normalize longitude to 0-360 range
  let normalizedLongitude = ((longitude % 360) + 360) % 360
  
  // Handle the special case where longitude is exactly 360°
  if (normalizedLongitude === 360) {
    normalizedLongitude = 0
  }
  
  // Each sign is 30 degrees
  const signIndex = Math.floor(normalizedLongitude / 30)
  const degreeInSign = normalizedLongitude % 30
  
  // Ensure signIndex is within valid range (0-11)
  const validSignIndex = Math.min(signIndex, 11)
  
  return {
    sign: ZODIAC_SIGNS[validSignIndex],
    degreeInSign: degreeInSign
  }
}