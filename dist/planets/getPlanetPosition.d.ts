import { PlanetName, PlanetPosition } from '../types/astro.js';
/**
 * Calculates the geocentric ecliptic longitude of a planet for a given date
 * @param planet Planet name
 * @param date Date for calculation
 * @returns PlanetPosition with longitude, zodiac sign, and degree in sign
 */
export declare function getPlanetPosition(planet: PlanetName, date: Date): PlanetPosition;
