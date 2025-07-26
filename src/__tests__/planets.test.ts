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

  test('should calculate Mercury position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Mercury', date)
    
    expect(result.planet).toBe('Mercury')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Jupiter position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Jupiter', date)
    
    expect(result.planet).toBe('Jupiter')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Saturn position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Saturn', date)
    
    expect(result.planet).toBe('Saturn')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Uranus position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Uranus', date)
    
    expect(result.planet).toBe('Uranus')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Neptune position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Neptune', date)
    
    expect(result.planet).toBe('Neptune')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should calculate Pluto position for a specific date', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const result = getPlanetPosition('Pluto', date)
    
    expect(result.planet).toBe('Pluto')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
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
      // @ts-expect-error - intentionally testing runtime error
      getPlanetPosition('InvalidPlanet', date)
    }).toThrow()
  })

  // Edge case tests for dates
  test('should handle historical date (1900)', () => {
    const date = new Date('1900-01-01T00:00:00Z')
    const result = getPlanetPosition('Sun', date)
    
    expect(result.planet).toBe('Sun')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should handle future date (2100)', () => {
    const date = new Date('2100-12-31T00:00:00Z')
    const result = getPlanetPosition('Mars', date)
    
    expect(result.planet).toBe('Mars')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })

  test('should handle leap year date', () => {
    const date = new Date('2024-02-29T00:00:00Z') // Leap year
    const result = getPlanetPosition('Venus', date)
    
    expect(result.planet).toBe('Venus')
    expect(result.longitude).toBeGreaterThanOrEqual(0)
    expect(result.longitude).toBeLessThan(360)
    expect(result.sign).toBeDefined()
    expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(result.degreeInSign).toBeLessThan(30)
  })
})