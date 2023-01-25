interface Country {
  name: string
  code: string
  timezone: string
}

interface Image {
  medium: string
  original: string
}

interface Self {
  href: string
}

interface Links {
  self: Self
}

interface Person {
  id: number
  url: string
  name: string
  country: Country
  birthday: string
  deathday?: any
  gender: string
  image: Image
  updated: number
  _links: Links
}

interface Image2 {
  medium: string
  original: string
}

interface Self2 {
  href: string
}

interface Links2 {
  self: Self2
}

interface Character {
  id: number
  url: string
  name: string
  image: Image2
  _links: Links2
}

export interface CastType {
  person: Person
  character: Character
  self: boolean
  voice: boolean
}
