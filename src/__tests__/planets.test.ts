import { getPlanetPosition } from '../planets/getPlanetPosition'
import { getAllPlanetPositions } from '../planets/getAllPlanetPositions'
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

describe('getAllPlanetPositions', () => {
  test('should return positions for all 10 planets', () => {
    const date = new Date('2025-07-15T00:00:00Z')
    const results = getAllPlanetPositions(date)
    
    // Should return exactly 10 planets
    expect(results).toHaveLength(10)
    
    // Check that all expected planets are present
    const expectedPlanets: PlanetName[] = [
      'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 
      'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
    ]
    
    expectedPlanets.forEach(planet => {
      const planetResult = results.find(r => r.planet === planet)
      expect(planetResult).toBeDefined()
      expect(planetResult!.longitude).toBeGreaterThanOrEqual(0)
      expect(planetResult!.longitude).toBeLessThan(360)
      expect(planetResult!.sign).toBeDefined()
      expect(planetResult!.degreeInSign).toBeGreaterThanOrEqual(0)
      expect(planetResult!.degreeInSign).toBeLessThan(30)
    })
  })

  test('should handle invalid dates gracefully', () => {
    expect(() => getAllPlanetPositions(new Date('invalid')))
      .toThrow('Invalid date provided')
  })

  test('should return consistent results with individual getPlanetPosition calls', () => {
    const date = new Date('2025-01-01T00:00:00Z')
    const allPositions = getAllPlanetPositions(date)
    
    // Check that each result matches what we get from individual calls
    allPositions.forEach(position => {
      const individualResult = getPlanetPosition(position.planet, date)
      expect(position.longitude).toBeCloseTo(individualResult.longitude, 10)
      expect(position.sign).toBe(individualResult.sign)
      expect(position.degreeInSign).toBeCloseTo(individualResult.degreeInSign, 10)
    })
  })

})