/**
 * Utility functions for astronomical calculations
 */

/**
 * Normalizes longitude from radians to degrees (0-360)
 * @param longitudeRadians Longitude in radians
 * @returns Normalized longitude in degrees (0-360)
 */
export function normalizeLongitude(longitudeRadians: number): number {
  // Convert radians to degrees
  const longitudeDegrees = (longitudeRadians * 180 / Math.PI) % 360
  // Ensure the result is positive (0-360)
  return longitudeDegrees < 0 ? longitudeDegrees + 360 : longitudeDegrees
}

/**
 * Simple cache for Julian Day calculations to avoid repeated conversions
 */
const julianDayCache = new Map<string, number>()

/**
 * Caches Julian Day calculation for repeated date conversions
 * @param date The date to convert
 * @param julianFunction The julian conversion function
 * @returns Cached or newly calculated Julian Day
 */
export function getCachedJulianDay(
  date: Date, 
  julianFunction: (date: Date) => number
): number {
  const dateKey = date.toISOString()
  
  if (julianDayCache.has(dateKey)) {
    return julianDayCache.get(dateKey)!
  }
  
  const jd = julianFunction(date)
  julianDayCache.set(dateKey, jd)
  
  // Limit cache size to prevent memory issues
  if (julianDayCache.size > 1000) {
    const firstKey = julianDayCache.keys().next().value as string
    if (firstKey) {
      julianDayCache.delete(firstKey)
    }
  }
  
  return jd
}