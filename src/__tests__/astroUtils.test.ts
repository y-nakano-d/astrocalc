import { normalizeLongitude } from '../utils/astroUtils'

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
})