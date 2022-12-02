export const Expansions = [
  'Classic',
  'Burning Crusade',
  'Wrath of the Lich King',
  'Cataclysm',
  'Mists of Pandaria',
  'Warlords of Draenor',
  'Legion',
  'Battle for Azeroth',
  'Shadowlands',
  'Dragonflight',
] as const

export type Expansion = typeof Expansions[number]

export interface ExpansionInstanceAchievements {
  ahead_of_the_curve: number
  cutting_edge: number
}

export type ExpansionAchievements = {
  [expansion in Expansion]: Record<string, ExpansionInstanceAchievements>
}

export const Achievements: Partial<
  Record<Expansion, Record<string, ExpansionInstanceAchievements>>
> = {
  'Legion': {
    'The Emerald Nightmare': {
      ahead_of_the_curve: 11194, // Ahead of the Curve: Xavius
      cutting_edge: 11191, // Cutting Edge: Xavius
    },
    'Trial of Valor': {
      ahead_of_the_curve: 11581, // Ahead of the Curve: Helya
      cutting_edge: 11580, // Cutting Edge: Helya
    },
    'The Nighthold': {
      ahead_of_the_curve: 11195, // Ahead of the Curve: Gul'dan
      cutting_edge: 11192, // Cutting Edge: Gul'dan
    },
    'Tomb of Sargeras': {
      ahead_of_the_curve: 11874, // Ahead of the Curve: Kil'jaeden
      cutting_edge: 11875, // Cutting Edge: Kil'jaeden
    },
    'Antorus, the Burning Throne': {
      ahead_of_the_curve: 12110, // Ahead of the Curve: Argus the Unmaker
      cutting_edge: 12111, // Cutting Edge: Argus the Unmaker
    },
  },
  'Battle for Azeroth': {
    'Uldir': {
      ahead_of_the_curve: 12536, // Ahead of the Curve: G'huun
      cutting_edge: 12535, // Cutting Edge: G'huun
    },
    "Battle of Dazar'alor": {
      ahead_of_the_curve: 13322, // Ahead of the Curve: Lady Jaina Proudmoore
      cutting_edge: 13323, // Cutting Edge: Lady Jaina Proudmoore
    },
    'Crucible of Storms': {
      ahead_of_the_curve: 13418, // Ahead of the Curve: Uu'nat, Harbinger of the Void
      cutting_edge: 13419, // Cutting Edge: Uu'nat, Harbinger of the Void
    },
    'The Eternal Palace': {
      ahead_of_the_curve: 13784, // Ahead of the Curve: Queen Azshara
      cutting_edge: 13785, // Cutting Edge: Queen Azshara
    },
    "Ny'alotha, the Waking City": {
      ahead_of_the_curve: 14068, // head of the Curve: N'Zoth the Corruptor
      cutting_edge: 14069, // Cutting Edge: N'Zoth the Corruptor
    },
  },
  'Shadowlands': {
    'Castle Nathria': {
      ahead_of_the_curve: 14460, // Ahead of the Curve: Sire Denathrius
      cutting_edge: 14461, // Cutting Edge: Sire Denathri
    },
    'Sanctum of Domination': {
      ahead_of_the_curve: 15134, // Ahead of the Curve: Sylvanas Windrunner
      cutting_edge: 15135, // Cutting Edge: Sylvanas Windrunner
    },
    'Sepulcher of the First Ones': {
      ahead_of_the_curve: 15470, // Ahead of the Curve: The Jailer
      cutting_edge: 15471, // Cutting Edge: The Jailer
    },
  },
  'Dragonflight': {
    'Vault of the Incarnates': {
      ahead_of_the_curve: 17107, // Ahead of the Curve: Raszageth the Storm-Eater
      cutting_edge: 17108, // Cutting Edge: Raszageth the Storm-Eater
    },
  },
} as const
