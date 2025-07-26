# astrocalc

TypeScript library for astronomical calculations focused on astrology. Built on top of the `astronomia` library with type-safe APIs for planetary positions and zodiac sign calculations.

## Features

- ✨ Calculate planetary positions (geocentric ecliptic longitude)
- 🔮 Convert longitude to zodiac signs and degrees within signs
- 🌍 Support for all major planets including Sun, Moon, and Pluto
- 📝 Full TypeScript support with comprehensive type definitions
- 🧪 VSOP87 astronomical models for high precision

## Installation

```bash
npm install astrocalc
```

## Usage

### Basic Example

```typescript
import { getPlanetPosition } from 'astrocalc'

const result = getPlanetPosition('Mars', new Date('2025-07-15T00:00:00Z'))
console.log(result)

// Output example:
// {
//   planet: 'Mars',
//   longitude: 112.5,
//   sign: 'Leo',
//   degreeInSign: 22.5
// }
```

### Get Zodiac Sign from Longitude

```typescript
import { getZodiacFromLongitude } from 'astrocalc'

const zodiacInfo = getZodiacFromLongitude(135) // 135° longitude
console.log(zodiacInfo)

// Output:
// {
//   sign: 'Leo',
//   degreeInSign: 15
// }
```

### Multiple Planets

```typescript
import { getPlanetPosition, PlanetName } from 'astrocalc'

const planets: PlanetName[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars']
const date = new Date('2025-07-15T12:00:00Z')

const positions = planets.map(planet => getPlanetPosition(planet, date))
console.log(positions)
```

## Supported Planets

- `Sun` - Solar position (geocentric)
- `Moon` - Lunar position
- `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn` - Classical planets
- `Uranus`, `Neptune` - Modern planets  
- `Pluto` - Dwarf planet (still used in astrology)

## API Reference

### Types

```typescript
type PlanetName =
  | 'Sun' | 'Moon'
  | 'Mercury' | 'Venus' | 'Mars'
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto'

type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'

interface ZodiacSignInfo {
  sign: ZodiacSign
  degreeInSign: number
}

interface PlanetPosition {
  planet: PlanetName
  longitude: number // degrees (0-360)
  sign: ZodiacSign
  degreeInSign: number
}
```

### Functions

#### `getPlanetPosition(planet: PlanetName, date: Date): PlanetPosition`

Calculates the geocentric ecliptic longitude of a planet for the given date and converts it to zodiac sign information.

**Parameters:**
- `planet` - Name of the planet to calculate
- `date` - JavaScript Date object for the calculation time

**Returns:** `PlanetPosition` object with longitude, zodiac sign, and degree within sign

#### `getZodiacFromLongitude(longitude: number): ZodiacSignInfo`

Converts an ecliptic longitude to zodiac sign information.

**Parameters:**
- `longitude` - Ecliptic longitude in degrees (0-360)

**Returns:** `ZodiacSignInfo` object with zodiac sign and degree within that sign

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

## License

MIT

## Acknowledgments

Built using the excellent [astronomia](https://www.npmjs.com/package/astronomia) library for astronomical calculations.