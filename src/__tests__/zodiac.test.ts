import { getZodiacFromLongitude } from '../zodiac/getZodiacFromLongitude'

describe('getZodiacFromLongitude', () => {
  test('should correctly map longitude to Aries', () => {
    const result = getZodiacFromLongitude(15)
    expect(result.sign).toBe('Aries')
    expect(result.degreeInSign).toBe(15)
  })

  test('should correctly map longitude to Leo', () => {
    const result = getZodiacFromLongitude(135) // 4 * 30 + 15 = Leo 15°
    expect(result.sign).toBe('Leo')
    expect(result.degreeInSign).toBe(15)
  })

  test('should correctly map longitude to Pisces', () => {
    const result = getZodiacFromLongitude(350) // 11 * 30 + 20 = Pisces 20°
    expect(result.sign).toBe('Pisces')
    expect(result.degreeInSign).toBe(20)
  })

  test('should handle 0 degrees correctly', () => {
    const result = getZodiacFromLongitude(0)
    expect(result.sign).toBe('Aries')
    expect(result.degreeInSign).toBe(0)
  })

  test('should handle 360 degrees correctly', () => {
    const result = getZodiacFromLongitude(360)
    expect(result.sign).toBe('Aries')
    expect(result.degreeInSign).toBe(0)
  })

  test('should handle negative longitudes', () => {
    const result = getZodiacFromLongitude(-30) // Should wrap to 330° = Pisces 0°
    expect(result.sign).toBe('Pisces')
    expect(result.degreeInSign).toBe(0)
  })

  test('should handle longitudes over 360', () => {
    const result = getZodiacFromLongitude(390) // Should wrap to 30° = Taurus 0°
    expect(result.sign).toBe('Taurus')
    expect(result.degreeInSign).toBe(0)
  })
})
