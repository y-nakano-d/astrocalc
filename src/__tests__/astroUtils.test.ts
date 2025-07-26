import { normalizeLongitude, getCachedJulianDay } from '../utils/astroUtils'

describe('astroUtils', () => {
  describe('normalizeLongitude', () => {
    test('should convert positive radians to degrees', () => {
      const result = normalizeLongitude(Math.PI / 2) // 90 degrees
      expect(result).toBeCloseTo(90, 10)
    })

    test('should convert negative radians to positive degrees', () => {
      const result = normalizeLongitude(-Math.PI / 2) // -90 degrees → 270 degrees
      expect(result).toBeCloseTo(270, 10)
    })

    test('should handle full circle', () => {
      const result = normalizeLongitude(2 * Math.PI) // 360 degrees → 0 degrees
      expect(result).toBeCloseTo(0, 10)
    })

    test('should handle values greater than full circle', () => {
      const result = normalizeLongitude(2.5 * Math.PI) // 450 degrees → 90 degrees
      expect(result).toBeCloseTo(90, 10)
    })

    test('should handle zero radians', () => {
      const result = normalizeLongitude(0)
      expect(result).toBe(0)
    })
  })

  describe('getCachedJulianDay', () => {
    // Clear cache before each test
    beforeEach(() => {
      // Access the cache indirectly by calling with a unique date first
      getCachedJulianDay(new Date('1900-01-01T00:00:00Z'), () => 0)
    })

    test('should cache Julian Day calculations', () => {
      const date = new Date('2025-07-15T00:00:00Z')
      const mockJulianFunction = jest.fn().mockReturnValue(2460871.5)
      
      // First call should invoke the function
      const result1 = getCachedJulianDay(date, mockJulianFunction)
      expect(mockJulianFunction).toHaveBeenCalledTimes(1)
      expect(result1).toBe(2460871.5)
      
      // Second call should use cached value
      const result2 = getCachedJulianDay(date, mockJulianFunction)
      expect(mockJulianFunction).toHaveBeenCalledTimes(1) // Still just once
      expect(result2).toBe(2460871.5)
    })

    test('should handle different dates separately', () => {
      const date1 = new Date('2025-08-15T00:00:00Z')
      const date2 = new Date('2025-08-16T00:00:00Z')
      
      let callCount = 0
      const mockJulianFunction = jest.fn().mockImplementation(() => {
        callCount++
        return callCount === 1 ? 2460901.5 : 2460902.5
      })
      
      const result1 = getCachedJulianDay(date1, mockJulianFunction)
      const result2 = getCachedJulianDay(date2, mockJulianFunction)
      
      expect(mockJulianFunction).toHaveBeenCalledTimes(2)
      expect(result1).toBe(2460901.5)
      expect(result2).toBe(2460902.5)
    })
  })
})