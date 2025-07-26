// VSOP87 planetary model data interface
interface VSOP87Model {
  // VSOP87 models contain orbital parameters for planetary position calculations
  // The exact structure is complex, but for type safety we define it as an object
  // that can be passed to planetposition.Planet constructor
  readonly [key: string]: unknown
}

declare module 'astronomia' {
  // Julian date utilities
  export const julian: {
    DateToJD(date: Date): number
  }

  // Planet position calculations
  export const planetposition: {
    Planet: new (model: VSOP87Model) => {
      position2000(jd: number): {
        lon: number
        lat: number
        range: number
      }
    }
  }

  // Pluto specific calculations
  export const pluto: {
    heliocentric(jd: number): {
      lon: number
      lat: number
      range: number
    }
  }

  // Moon position calculations
  export const moonposition: {
    position(jd: number): {
      lon: number
      lat: number
      range: number
    }
  }
}

declare module 'astronomia/data/vsop87Bmercury' {
  const vsop87Bmercury: VSOP87Model
  export default vsop87Bmercury
}

declare module 'astronomia/data/vsop87Bvenus' {
  const vsop87Bvenus: VSOP87Model
  export default vsop87Bvenus
}

declare module 'astronomia/data/vsop87Bearth' {
  const vsop87Bearth: VSOP87Model
  export default vsop87Bearth
}

declare module 'astronomia/data/vsop87Bmars' {
  const vsop87Bmars: VSOP87Model
  export default vsop87Bmars
}

declare module 'astronomia/data/vsop87Bjupiter' {
  const vsop87Bjupiter: VSOP87Model
  export default vsop87Bjupiter
}

declare module 'astronomia/data/vsop87Bsaturn' {
  const vsop87Bsaturn: VSOP87Model
  export default vsop87Bsaturn
}

declare module 'astronomia/data/vsop87Buranus' {
  const vsop87Buranus: VSOP87Model
  export default vsop87Buranus
}

declare module 'astronomia/data/vsop87Bneptune' {
  const vsop87Bneptune: VSOP87Model
  export default vsop87Bneptune
}
