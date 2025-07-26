import { getPlanetPosition } from '../planets/getPlanetPosition'
import { getZodiacFromLongitude } from '../zodiac/getZodiacFromLongitude'

describe('Integration Tests', () => {
  test('should perform complete astrological calculation workflow', () => {
    const date = new Date('2025-07-15T12:00:00Z')
    
    // Test multiple planets at once
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'] as const
    const results = planets.map(planet => getPlanetPosition(planet, date))
    
    // Verify all calculations completed successfully
    expect(results).toHaveLength(7)
    
    // Verify each result has valid structure
    results.forEach(result => {
      expect(result.planet).toBeDefined()
      expect(result.longitude).toBeGreaterThanOrEqual(0)
      expect(result.longitude).toBeLessThan(360)
      expect(result.sign).toBeDefined()
      expect(result.degreeInSign).toBeGreaterThanOrEqual(0)
      expect(result.degreeInSign).toBeLessThan(30)
    })
    
    // Verify Sun is in Cancer during summer (around July 15)
    const sunResult = results.find(r => r.planet === 'Sun')!
    expect(sunResult.sign).toBe('Cancer')
  })

  test('should handle multiple calculations for different dates efficiently', () => {
    const dates = [
      new Date('2025-01-01T00:00:00Z'),
      new Date('2025-04-01T00:00:00Z'),
      new Date('2025-07-01T00:00:00Z'),
      new Date('2025-10-01T00:00:00Z')
    ]
    
    const startTime = Date.now()
    
    // Calculate Sun position for all seasons
    const results = dates.map(date => getPlanetPosition('Sun', date))
    
    const endTime = Date.now()
    const duration = endTime - startTime
    
    // Should complete calculations reasonably quickly (under 1 second)
    expect(duration).toBeLessThan(1000)
    
    // Verify we get different zodiac signs across seasons
    const signs = results.map(r => r.sign)
    const uniqueSigns = new Set(signs)
    expect(uniqueSigns.size).toBeGreaterThan(1) // Should have different signs across seasons
  })

  test('should maintain accuracy for astronomical vs astrological calculations', () => {
    const date = new Date('2025-04-15T12:00:00Z') // Mid-April should be in Aries
    const sunResult = getPlanetPosition('Sun', date)
    
    // Sun should be in Aries during April
    expect(sunResult.sign).toBe('Aries')
    expect(sunResult.degreeInSign).toBeGreaterThanOrEqual(0)
    expect(sunResult.degreeInSign).toBeLessThan(30)
  })

  test('should handle zodiac calculations correctly across sign boundaries', () => {
    // Test longitude values at sign boundaries
    const testCases = [
      { longitude: 0, expectedSign: 'Aries', expectedDegree: 0 },
      { longitude: 29.99, expectedSign: 'Aries', expectedDegree: 29.99 },
      { longitude: 30, expectedSign: 'Taurus', expectedDegree: 0 },
      { longitude: 359.99, expectedSign: 'Pisces', expectedDegree: 29.99 }
    ]
    
    testCases.forEach(testCase => {
      const result = getZodiacFromLongitude(testCase.longitude)
      expect(result.sign).toBe(testCase.expectedSign)
      expect(result.degreeInSign).toBeCloseTo(testCase.expectedDegree, 2)
    })
  })
})