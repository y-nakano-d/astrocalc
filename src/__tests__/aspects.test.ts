import { getAspects } from '../aspects/getAspects'
import { PlanetPosition } from '../types/astro'

describe('getAspects', () => {
  test('should detect conjunction between Sun and Moon', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 120,
        sign: 'Cancer',
        degreeInSign: 0
      },
      {
        planet: 'Moon',
        longitude: 123,
        sign: 'Cancer',
        degreeInSign: 3
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(1)
    expect(aspects[0].planetA).toBe('Sun')
    expect(aspects[0].planetB).toBe('Moon')
    expect(aspects[0].aspect).toBe('Conjunction')
    expect(aspects[0].exact).toBe(3)
  })

  test('should detect trine between Sun and Mars', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 0,
        sign: 'Aries',
        degreeInSign: 0
      },
      {
        planet: 'Mars',
        longitude: 122,
        sign: 'Cancer',
        degreeInSign: 2
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(1)
    expect(aspects[0].planetA).toBe('Sun')
    expect(aspects[0].planetB).toBe('Mars')
    expect(aspects[0].aspect).toBe('Trine')
    expect(aspects[0].exact).toBe(2)
  })

  test('should detect opposition between Venus and Jupiter', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Venus',
        longitude: 45,
        sign: 'Taurus',
        degreeInSign: 15
      },
      {
        planet: 'Jupiter',
        longitude: 223,
        sign: 'Scorpio',
        degreeInSign: 13
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(1)
    expect(aspects[0].planetA).toBe('Venus')
    expect(aspects[0].planetB).toBe('Jupiter')
    expect(aspects[0].aspect).toBe('Opposition')
    expect(aspects[0].exact).toBe(-2)
  })

  test('should detect square between Mercury and Saturn', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Mercury',
        longitude: 15,
        sign: 'Aries',
        degreeInSign: 15
      },
      {
        planet: 'Saturn',
        longitude: 108,
        sign: 'Cancer',
        degreeInSign: 18
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(1)
    expect(aspects[0].planetA).toBe('Mercury')
    expect(aspects[0].planetB).toBe('Saturn')
    expect(aspects[0].aspect).toBe('Square')
    expect(aspects[0].exact).toBe(3)
  })

  test('should detect sextile between Moon and Venus', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Moon',
        longitude: 30,
        sign: 'Taurus',
        degreeInSign: 0
      },
      {
        planet: 'Venus',
        longitude: 88,
        sign: 'Gemini',
        degreeInSign: 28
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(1)
    expect(aspects[0].planetA).toBe('Moon')
    expect(aspects[0].planetB).toBe('Venus')
    expect(aspects[0].aspect).toBe('Sextile')
    expect(aspects[0].exact).toBe(-2)
  })

  test('should handle custom orb values', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 0,
        sign: 'Aries',
        degreeInSign: 0
      },
      {
        planet: 'Moon',
        longitude: 8,
        sign: 'Aries',
        degreeInSign: 8
      }
    ]

    // With default orb (6 degrees), this should be detected
    let aspects = getAspects(planets)
    expect(aspects).toHaveLength(1)
    expect(aspects[0].aspect).toBe('Conjunction')

    // With smaller orb (5 degrees), this should not be detected
    aspects = getAspects(planets, 5)
    expect(aspects).toHaveLength(0)
  })

  test('should not detect aspects outside orb range', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 0,
        sign: 'Aries',
        degreeInSign: 0
      },
      {
        planet: 'Moon',
        longitude: 10,
        sign: 'Aries',
        degreeInSign: 10
      }
    ]

    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(0)
  })

  test('should handle multiple aspects correctly', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 0,
        sign: 'Aries',
        degreeInSign: 0
      },
      {
        planet: 'Moon',
        longitude: 3,
        sign: 'Aries',
        degreeInSign: 3
      },
      {
        planet: 'Venus',
        longitude: 122,
        sign: 'Cancer',
        degreeInSign: 2
      },
      {
        planet: 'Mars',
        longitude: 182,
        sign: 'Virgo',
        degreeInSign: 2
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(3)
    
    // Sun-Moon Conjunction
    const sunMoonAspect = aspects.find(a => 
      (a.planetA === 'Sun' && a.planetB === 'Moon') || 
      (a.planetA === 'Moon' && a.planetB === 'Sun')
    )
    expect(sunMoonAspect).toBeDefined()
    expect(sunMoonAspect!.aspect).toBe('Conjunction')

    // Sun-Venus Trine
    const sunVenusAspect = aspects.find(a => 
      (a.planetA === 'Sun' && a.planetB === 'Venus') || 
      (a.planetA === 'Venus' && a.planetB === 'Sun')
    )
    expect(sunVenusAspect).toBeDefined()
    expect(sunVenusAspect!.aspect).toBe('Trine')

    // Sun-Mars Opposition
    const sunMarsAspect = aspects.find(a => 
      (a.planetA === 'Sun' && a.planetB === 'Mars') || 
      (a.planetA === 'Mars' && a.planetB === 'Sun')
    )
    expect(sunMarsAspect).toBeDefined()
    expect(sunMarsAspect!.aspect).toBe('Opposition')
  })

  test('should handle edge case with longitude crossing 0 degrees', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 357,
        sign: 'Pisces',
        degreeInSign: 27
      },
      {
        planet: 'Moon',
        longitude: 2,
        sign: 'Aries',
        degreeInSign: 2
      }
    ]

    const aspects = getAspects(planets)
    
    expect(aspects).toHaveLength(1)
    expect(aspects[0].aspect).toBe('Conjunction')
    expect(aspects[0].exact).toBe(5)
  })

  test('should return empty array when no planets provided', () => {
    const aspects = getAspects([])
    expect(aspects).toHaveLength(0)
  })

  test('should return empty array when only one planet provided', () => {
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: 120,
        sign: 'Cancer',
        degreeInSign: 0
      }
    ]

    const aspects = getAspects(planets)
    expect(aspects).toHaveLength(0)
  })
})