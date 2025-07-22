import { getPlanetPosition } from '../planets/getPlanetPosition'

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

  test('should throw error for unsupported planet', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    // This would only fail if we passed an invalid planet name through TypeScript
    // But the test shows the error handling exists
    expect(() => {
      // @ts-ignore - intentionally testing runtime error
      getPlanetPosition('InvalidPlanet', date)
    }).toThrow()
  })
})