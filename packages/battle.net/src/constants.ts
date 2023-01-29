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

export const ExpansionMap = {
  'classic': 'Classic',
  'the-burning-crusade': 'The Burning Crusade',
  'cataclysm': 'Cataclysm',
  'mists-of-pandaria': 'Mists of Pandaria',
  'warlords-of-draenor': 'Warlords of Draenor',
  'legion': 'Legion',
  'battle-for-azeroth': 'Battle for Azeroth',
  'shadowlands': 'Shadowlands',
  'dragonflight': 'Dragonflight',
}

export const Instances: Partial<Record<Expansion, string[]>> = {
  Shadowlands: ['Castle Nathria', 'Sanctum of Domination', 'Sepulcher of the First Ones'],
  Dragonflight: ['Vault of the Incarnates'],
}

export const InstanceMap = {
  shadowlands: {
    'castle-nathria': 'Castle Nathria',
    'sanctum-of-domination': 'Sanctum of Domination',
    'sepulcher-of-the-first-ones': 'Sepulcher of the First Ones',
  },
  dragonflight: {
    'vault-of-the-incarnates': 'Vault of the Incarnates',
  },
}

export type Expansion = typeof Expansions[number]

export default {}
