import { getAspects } from '../aspects/getAspects'
import { PlanetPosition, Aspect } from '../types/astro'

describe('getAspects', () => {
  // Helper function to create a planet position
  const createPlanetPosition = (planet: any, longitude: number): PlanetPosition => ({
    planet,
    longitude,
    sign: 'Aries', // Simplified for testing
    degreeInSign: longitude % 30
  })

  test('should return empty array for empty input', () => {
    expect(getAspects([])).toEqual([])
  })

  test('should return empty array for single planet', () => {
    const planets = [createPlanetPosition('Sun', 0)]
    expect(getAspects(planets)).toEqual([])
  })

  test('should detect conjunction (0°)', () => {
    const planets = [
      createPlanetPosition('Sun', 100),
      createPlanetPosition('Moon', 102) // 2° difference, within default 6° orb
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0]).toEqual({
      planetA: 'Sun',
      planetB: 'Moon',
      aspect: 'Conjunction',
      exact: 2
    })
  })

  test('should detect sextile (60°)', () => {
    const planets = [
      createPlanetPosition('Sun', 0),
      createPlanetPosition('Mars', 62) // 62° difference, close to 60°
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0]).toEqual({
      planetA: 'Sun',
      planetB: 'Mars',
      aspect: 'Sextile',
      exact: 62
    })
  })

  test('should detect square (90°)', () => {
    const planets = [
      createPlanetPosition('Venus', 45),
      createPlanetPosition('Jupiter', 135) // 90° difference
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0]).toEqual({
      planetA: 'Venus',
      planetB: 'Jupiter',
      aspect: 'Square',
      exact: 90
    })
  })

  test('should detect trine (120°)', () => {
    const planets = [
      createPlanetPosition('Sun', 30),
      createPlanetPosition('Moon', 150) // 120° difference
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0]).toEqual({
      planetA: 'Sun',
      planetB: 'Moon',
      aspect: 'Trine',
      exact: 120
    })
  })

  test('should detect opposition (180°)', () => {
    const planets = [
      createPlanetPosition('Mercury', 10),
      createPlanetPosition('Saturn', 190) // 180° difference
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0]).toEqual({
      planetA: 'Mercury',
      planetB: 'Saturn',
      aspect: 'Opposition',
      exact: 180
    })
  })

  test('should handle circular angles correctly', () => {
    const planets = [
      createPlanetPosition('Sun', 358), // Near 360°
      createPlanetPosition('Moon', 2)   // Near 0°, should be 4° apart
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0].aspect).toBe('Conjunction')
    expect(aspects[0].exact).toBe(4)
  })

  test('should handle opposition across 0° boundary', () => {
    const planets = [
      createPlanetPosition('Sun', 10),
      createPlanetPosition('Moon', 190) // 180° apart
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0].aspect).toBe('Opposition')
    expect(aspects[0].exact).toBe(180)
  })

  test('should respect custom orb parameter', () => {
    const planets = [
      createPlanetPosition('Sun', 0),
      createPlanetPosition('Moon', 4) // 4° difference
    ]
    
    // With default orb (6°), this should be detected
    const aspectsDefault = getAspects(planets)
    expect(aspectsDefault).toHaveLength(1)
    
    // With smaller orb (3°), this should not be detected
    const aspectsSmallOrb = getAspects(planets, 3)
    expect(aspectsSmallOrb).toHaveLength(0)
    
    // With larger orb (10°), this should be detected
    const aspectsLargeOrb = getAspects(planets, 10)
    expect(aspectsLargeOrb).toHaveLength(1)
  })

  test('should find multiple aspects among multiple planets', () => {
    const planets = [
      createPlanetPosition('Sun', 0),    // 0°
      createPlanetPosition('Moon', 60),  // 60° (Sextile with Sun)
      createPlanetPosition('Mars', 90),  // 90° (Square with Sun, Sextile with Moon)
      createPlanetPosition('Venus', 180) // 180° (Opposition with Sun, Trine with Moon, Square with Mars)
    ]
    
    const aspects = getAspects(planets)
    expect(aspects.length).toBeGreaterThan(1)
    
    // Check specific aspects
    const sunMoonAspect = aspects.find(a => 
      (a.planetA === 'Sun' && a.planetB === 'Moon') ||
      (a.planetA === 'Moon' && a.planetB === 'Sun')
    )
    expect(sunMoonAspect?.aspect).toBe('Sextile')
    
    const sunVenusAspect = aspects.find(a => 
      (a.planetA === 'Sun' && a.planetB === 'Venus') ||
      (a.planetA === 'Venus' && a.planetB === 'Sun')
    )
    expect(sunVenusAspect?.aspect).toBe('Opposition')
  })

  test('should not detect aspects outside orb tolerance', () => {
    const planets = [
      createPlanetPosition('Sun', 0),
      createPlanetPosition('Moon', 15) // 15° difference, too far from any major aspect
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(0)
  })

  test('should handle edge case where angular distance equals orb exactly', () => {
    const planets = [
      createPlanetPosition('Sun', 0),
      createPlanetPosition('Moon', 6) // Exactly at orb boundary for conjunction
    ]
    
    const aspects = getAspects(planets, 6)
    expect(aspects).toHaveLength(1)
    expect(aspects[0].aspect).toBe('Conjunction')
  })

  test('should handle planets with same position', () => {
    const planets = [
      createPlanetPosition('Sun', 100),
      createPlanetPosition('Moon', 100) // Exact same position
    ]
    
    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0].aspect).toBe('Conjunction')
    expect(aspects[0].exact).toBe(0)
  })
})