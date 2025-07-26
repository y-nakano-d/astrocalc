const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];
/**
 * Converts ecliptic longitude to zodiac sign information
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns ZodiacSignInfo with sign and degree within sign
 */
export function getZodiacFromLongitude(longitude) {
    // Normalize longitude to 0-360 range
    const normalizedLongitude = ((longitude % 360) + 360) % 360;
    // Each sign is 30 degrees
    const signIndex = Math.floor(normalizedLongitude / 30);
    const degreeInSign = normalizedLongitude % 30;
    return {
        sign: ZODIAC_SIGNS[signIndex],
        degreeInSign: degreeInSign
    };
}
