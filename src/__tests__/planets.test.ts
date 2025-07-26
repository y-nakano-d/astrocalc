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

  test('should calculate Moon position for a specific date and match expected format', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Moon', date)
    
    // Test the example usage from the issue
    console.log('Moon position result:', result)
    console.log('Formatted:', `{ planet: '${result.planet}', longitude: ${result.longitude.toFixed(1)}, sign: '${result.sign}', degreeInSign: ${result.degreeInSign.toFixed(1)} }`)
    
    // Verify all required properties exist and are correct types
    expect(result.planet).toBe('Moon')
    expect(typeof result.longitude).toBe('number')
    expect(result.longitude).toBeGreaterThan(0)
    expect(result.longitude).toBeLessThan(360)
    expect(typeof result.sign).toBe('string')
    expect(result.sign).toBeDefined()
    expect(typeof result.degreeInSign).toBe('number')
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
    
    // Verify the interface structure matches PlanetPosition
    expect(result).toHaveProperty('planet')
    expect(result).toHaveProperty('longitude')
    expect(result).toHaveProperty('sign')
    expect(result).toHaveProperty('degreeInSign')
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