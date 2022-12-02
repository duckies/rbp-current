export * from './core/realms'
export * from './core/regions'

export const Expansions = [
  'Classic',
  'The Burning Crusade',
  'Wrath of the Lich King',
  'Cataclysm',
  'Mists of Pandaria',
  'Warlords of Draenor',
  'Legion',
  'Battle for Azeroth',
  'Shadowlands',
  'Dragonflight',
] as const

export const Instances: Partial<Record<Expansion, string[]>> = {
  Shadowlands: [
    'Castle Nathria',
    'Sanctum of Domination',
    'Sepulcher of the First Ones',
  ],
  Dragonflight: ['Vault of the Incarnates'],
}

export type Expansion = typeof Expansions[number]

export default {}
