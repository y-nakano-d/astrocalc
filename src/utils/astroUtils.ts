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