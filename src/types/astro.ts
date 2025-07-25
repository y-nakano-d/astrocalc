export type PlanetName =
  | 'Sun' | 'Moon'
  | 'Mercury' | 'Venus' | 'Mars'
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto'

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'

export interface ZodiacSignInfo {
  sign: ZodiacSign
  degreeInSign: number
}

export interface PlanetPosition {
  planet: PlanetName
  longitude: number // degrees (0-360)
  sign: ZodiacSign
  degreeInSign: number
}