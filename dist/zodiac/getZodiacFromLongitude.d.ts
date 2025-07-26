import { ZodiacSignInfo } from '../types/astro.js';
/**
 * Converts ecliptic longitude to zodiac sign information
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns ZodiacSignInfo with sign and degree within sign
 */
export declare function getZodiacFromLongitude(longitude: number): ZodiacSignInfo;
