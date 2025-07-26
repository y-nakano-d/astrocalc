import { getPlanetPosition } from '../planets/getPlanetPosition'
import { PlanetName } from '../types/astro'

describe('getPlanetPosition', () => {
  test('should calculate Mars position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Mars', date)
    
    expect(result.planet).toBe('Mars')
    expect(result.longitude).toBeGreaterThan(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Sun position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Sun', date)
    
    expect(result.planet).toBe('Sun')
    expect(result.longitude).toBeGreaterThan(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Moon position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Moon', date)
    
    expect(result.planet).toBe('Moon')
    expect(result.longitude).toBeGreaterThan(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
    
    // Specific validation for the issue example date
    // Expected result should be approximately in Pisces around 343-344°
    expect(result.sign).toBe('Pisces')
    expect(result.longitude).toBeCloseTo(343.7, 0) // Allow 1 degree tolerance
    expect(result.degreeInSign).toBeCloseTo(13.7, 0) // Allow 1 degree tolerance
  })

  test('should calculate Venus position for a specific date', () => {
    const date = new Date('2025-01-01T00:00:00Z')
    const result = getPlanetPosition('Venus', date)
    
    expect(result.planet).toBe('Venus')
    expect(result.longitude).toBeGreaterThan(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate all planet positions', () => {
    const planets: PlanetName[] = ['Mercury', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    const date = new Date('2025-07-15T00:00:00Z')
    
    planets.forEach(planet => {
      const result = getPlanetPosition(planet, date)
      expect(result.planet).toBe(planet)
      expect(result.longitude).toBeGreaterThanOrEqual(0)
      expect(result.longitude).toBeLessThan(360)
    })
  })

  test('should handle invalid dates gracefully', () => {
    expect(() => getPlanetPosition('Mars', new Date('invalid')))
      .toThrow('Invalid date provided')
  })

})