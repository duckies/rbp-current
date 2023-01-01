import { capitalize } from '@rbp/shared'
import { FindCharacterDTO } from '../../src/character/dto/find-character.dto'

type FixtureOptions = FindCharacterDTO & {
  id: string
}

export const EndpointOkResponse = ({ id, name }: FixtureOptions) =>
  ({
    'character-profile-summary': {
      _links: {
        self: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}?namespace=profile-us`,
        },
      },
      id,
      name: capitalize(name),
      gender: {
        type: `FEMALE`,
        name: `Female`,
      },
      faction: {
        type: `HORDE`,
        name: `Horde`,
      },
      race: {
        key: {
          href: `https://us.api.blizzard.com/data/wow/playable-race/10?namespace=static-10.0.0_46112-us`,
        },
        name: `Blood Elf`,
        id: 10,
      },
      character_class: {
        key: {
          href: `https://us.api.blizzard.com/data/wow/playable-class/10?namespace=static-10.0.0_46112-us`,
        },
        name: `Monk`,
        id: 10,
      },
      active_spec: {
        key: {
          href: `https://us.api.blizzard.com/data/wow/playable-specialization/270?namespace=static-10.0.0_46112-us`,
        },
        name: `Mistweaver`,
        id: 270,
      },
      realm: {
        key: {
          href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
        },
        name: `Area 52`,
        id: 1566,
        slug: `area-52`,
      },
      guild: {
        key: {
          href: `https://us.api.blizzard.com/data/wow/guild/area-52/guild-name?namespace=profile-us`,
        },
        name: `Guild Name`,
        id: 12345678,
        realm: {
          key: {
            href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
          },
          name: `Area 52`,
          id: 1566,
          slug: `area-52`,
        },
        faction: {
          type: `HORDE`,
          name: `Horde`,
        },
      },
      level: 60,
      experience: 0,
      achievement_points: 12345,
      achievements: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/achievements?namespace=profile-us`,
      },
      titles: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/titles?namespace=profile-us`,
      },
      pvp_summary: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/pvp-summary?namespace=profile-us`,
      },
      encounters: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/encounters?namespace=profile-us`,
      },
      media: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/character-media?namespace=profile-us`,
      },
      last_login_timestamp: 1667983752000,
      average_item_level: 304,
      equipped_item_level: 302,
      specializations: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/specializations?namespace=profile-us`,
      },
      statistics: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/statistics?namespace=profile-us`,
      },
      mythic_keystone_profile: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile?namespace=profile-us`,
      },
      equipment: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/equipment?namespace=profile-us`,
      },
      appearance: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/appearance?namespace=profile-us`,
      },
      collections: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/collections?namespace=profile-us`,
      },
      active_title: {
        key: {
          href: `https://us.api.blizzard.com/data/wow/title/112?namespace=static-10.0.0_46112-us`,
        },
        name: `the Insane`,
        id: 112,
        display_string: `{name} the Insane`,
      },
      reputations: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/reputations?namespace=profile-us`,
      },
      quests: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/quests?namespace=profile-us`,
      },
      achievements_statistics: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/achievements/statistics?namespace=profile-us`,
      },
      professions: {
        href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/professions?namespace=profile-us`,
      },
      covenant_progress: {
        chosen_covenant: {
          key: {
            href: `https://us.api.blizzard.com/data/wow/covenant/4?namespace=static-10.0.0_46112-us`,
          },
          name: `Necrolord`,
          id: 4,
        },
        renown_level: 80,
        soulbinds: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/soulbinds?namespace=profile-us`,
        },
      },
    },
    'character-media-summary': {
      _links: {
        self: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/character-media?namespace=profile-us`,
        },
      },
      character: {
        key: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}?namespace=profile-us`,
        },
        name: capitalize(name),
        id,
        realm: {
          key: {
            href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
          },
          name: 'Area 52',
          id: 1566,
          slug: 'area-52',
        },
      },
      assets: [
        {
          key: 'avatar',
          value: `https://render.worldofwarcraft.com/us/character/area-52/35/${id}-avatar.jpg`,
        },
        {
          key: 'inset',
          value: `https://render.worldofwarcraft.com/us/character/area-52/35/${id}-inset.jpg`,
        },
        {
          key: 'main',
          value: `https://render.worldofwarcraft.com/us/character/area-52/35/${id}-main.jpg`,
        },
        {
          key: 'main-raw',
          value: `https://render.worldofwarcraft.com/us/character/area-52/35/${id}-main-raw.png`,
        },
      ],
    },
    'character-mythic-keystone-profile': {
      _links: {
        self: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile?namespace=profile-us`,
        },
      },
      current_period: {
        period: {
          key: {
            href: `https://us.api.blizzard.com/data/wow/mythic-keystone/period/887?namespace=dynamic-us`,
          },
          id: 887,
        },
        best_runs: [
          {
            completed_timestamp: 1672172727000,
            duration: 2740340,
            keystone_level: 15,
            keystone_affixes: [
              {
                key: {
                  href: `https://us.api.blizzard.com/data/wow/keystone-affix/10?namespace=static-10.0.2_46479-us`,
                },
                name: 'Fortifie',
                id: 10,
              },
              {
                key: {
                  href: `https://us.api.blizzard.com/data/wow/keystone-affix/8?namespace=static-10.0.2_46479-us`,
                },
                name: 'Sanguine',
                id: 8,
              },
              {
                key: {
                  href: `https://us.api.blizzard.com/data/wow/keystone-affix/3?namespace=static-10.0.2_46479-us`,
                },
                name: 'Volcanic',
                id: 3,
              },
              {
                key: {
                  href: `https://us.api.blizzard.com/data/wow/keystone-affix/132?namespace=static-10.0.2_46479-us`,
                },
                name: 'Thundering',
                id: 132,
              },
            ],
            members: [
              {
                character: {
                  name: 'Tank',
                  id: 0,
                  realm: {
                    key: {
                      href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
                    },
                    id: 1566,
                    slug: 'area-52',
                  },
                },
                specialization: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-specialization/268?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Brewmaster',
                  id: 0,
                },
                race: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-race/10?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Blood Elf',
                  id: 10,
                },
                equipped_item_level: 394,
              },
              {
                character: {
                  name: 'Healer',
                  id: 0,
                  realm: {
                    key: {
                      href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
                    },
                    id: 1566,
                    slug: 'area-52',
                  },
                },
                specialization: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-specialization/270?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Mistweaver',
                  id: 270,
                },
                race: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-race/10?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Blood Elf',
                  id: 10,
                },
                equipped_item_level: 397,
              },
              {
                character: {
                  name: 'DPS 1',
                  id: 0,
                  realm: {
                    key: {
                      href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
                    },
                    id: 1566,
                    slug: 'area-52',
                  },
                },
                specialization: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-specialization/62?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Arcane',
                  id: 62,
                },
                race: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-race/2?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Orc',
                  id: 2,
                },
                equipped_item_level: 390,
              },
              {
                character: {
                  name: 'DPS 2',
                  id: 170539617,
                  realm: {
                    key: {
                      href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
                    },
                    id: 1566,
                    slug: 'area-52',
                  },
                },
                specialization: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-specialization/266?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Demonology',
                  id: 266,
                },
                race: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-race/2?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Orc',
                  id: 2,
                },
                equipped_item_level: 392,
              },
              {
                character: {
                  name: 'DPS 3',
                  id: 0,
                  realm: {
                    key: {
                      href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
                    },
                    id: 1566,
                    slug: 'area-52',
                  },
                },
                specialization: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-specialization/102?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Balance',
                  id: 102,
                },
                race: {
                  key: {
                    href: `https://us.api.blizzard.com/data/wow/playable-race/8?namespace=static-10.0.2_46479-us`,
                  },
                  name: 'Troll',
                  id: 8,
                },
                equipped_item_level: 392,
              },
            ],
            dungeon: {
              key: {
                href: `https://us.api.blizzard.com/data/wow/mythic-keystone/dungeon/400?namespace=dynamic-us`,
              },
              name: 'The Nokhud Offensive',
              id: 400,
            },
            is_completed_within_time: false,
            mythic_rating: {
              color: {
                r: 163,
                g: 53,
                b: 238,
                a: 1.0,
              },
              rating: 128.2274,
            },
            map_rating: {
              color: {
                r: 163,
                g: 53,
                b: 238,
                a: 1.0,
              },
              rating: 258.48032,
            },
          },
        ],
      },
      seasons: [
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/6?namespace=profile-us`,
          },
          id: 6,
        },
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/9?namespace=profile-us`,
          },
          id: 9,
        },
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/7?namespace=profile-us`,
          },
          id: 7,
        },
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/5?namespace=profile-us`,
          },
          id: 5,
        },
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/4?namespace=profile-us`,
          },
          id: 4,
        },
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/3?namespace=profile-us`,
          },
          id: 3,
        },
        {
          key: {
            href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/mythic-keystone-profile/season/8?namespace=profile-us`,
          },
          id: 8,
        },
      ],
      character: {
        key: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}?namespace=profile-us`,
        },
        name: capitalize(name),
        id,
        realm: {
          key: {
            href: `https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us`,
          },
          name: 'Area 52',
          id: 1566,
          slug: 'area-52',
        },
      },
      current_mythic_rating: {
        color: {
          r: 0,
          g: 112,
          b: 221,
          a: 1.0,
        },
        rating: 2041.0504,
      },
    },
    'character-raids': {
      _links: {
        self: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}/encounters/raids?namespace=profile-us`,
        },
      },
      character: {
        key: {
          href: `https://us.api.blizzard.com/profile/wow/character/area-52/${name}?namespace=profile-us`,
        },
        name: capitalize(name),
        id,
        realm: {
          key: {
            href: 'https://us.api.blizzard.com/data/wow/realm/1566?namespace=dynamic-us',
          },
          name: 'Area 52',
          id: 1566,
          slug: 'area-52',
        },
        expansions: [
          {
            expansion: {
              key: {
                href: 'https://us.api.blizzard.com/data/wow/journal-expansion/503?namespace=static-10.0.2_46479-us',
              },
              name: 'Dragonflight',
              id: 503,
            },
            instances: [
              {
                instance: {
                  key: {
                    href: 'https://us.api.blizzard.com/data/wow/journal-instance/1200?namespace=static-10.0.2_46479-us',
                  },
                  name: 'Vault of the Incarnates',
                  id: 1200,
                },
                modes: [
                  {
                    difficulty: {
                      type: 'NORMAL',
                      name: 'Normal',
                    },
                    status: {
                      type: 'COMPLETE',
                      name: 'Complete',
                    },
                    progress: {
                      completed_count: 8,
                      total_count: 8,
                      encounters: [
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2480?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Eranog',
                            id: 2480,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671764997000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2500?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Terros',
                            id: 2500,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671765715000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2486?namespace=static-10.0.2_46479-us',
                            },
                            name: 'The Primal Council',
                            id: 2486,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671767754000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2482?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Sennarth, the Cold Breath',
                            id: 2482,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671766283000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2502?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Dathea, Ascended',
                            id: 2502,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671768417000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2491?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Kurog Grimtotem',
                            id: 2491,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671766909000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2493?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Broodkeeper Diurna',
                            id: 2493,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671769430000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2499?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Raszageth the Storm-Eater',
                            id: 2499,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671771082000,
                        },
                      ],
                    },
                  },
                  {
                    difficulty: {
                      type: 'HEROIC',
                      name: 'Heroic',
                    },
                    status: {
                      type: 'IN_PROGRESS',
                      name: 'In Progress',
                    },
                    progress: {
                      completed_count: 7,
                      total_count: 8,
                      encounters: [
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2480?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Eranog',
                            id: 2480,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671772514000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2500?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Terros',
                            id: 2500,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671773397000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2486?namespace=static-10.0.2_46479-us',
                            },
                            name: 'The Primal Council',
                            id: 2486,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671775498000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2482?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Sennarth, the Cold Breath',
                            id: 2482,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671774324000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2502?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Dathea, Ascended',
                            id: 2502,
                          },
                          completed_count: 1,
                          last_kill_timestamp: 1672113511000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2491?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Kurog Grimtotem',
                            id: 2491,
                          },
                          completed_count: 2,
                          last_kill_timestamp: 1671776484000,
                        },
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2493?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Broodkeeper Diurna',
                            id: 2493,
                          },
                          completed_count: 1,
                          last_kill_timestamp: 1672119850000,
                        },
                      ],
                    },
                  },
                  {
                    difficulty: {
                      type: 'MYTHIC',
                      name: 'Mythic',
                    },
                    status: {
                      type: 'IN_PROGRESS',
                      name: 'In Progress',
                    },
                    progress: {
                      completed_count: 1,
                      total_count: 8,
                      encounters: [
                        {
                          encounter: {
                            key: {
                              href: 'https://us.api.blizzard.com/data/wow/journal-encounter/2480?namespace=static-10.0.2_46479-us',
                            },
                            name: 'Eranog',
                            id: 2480,
                          },
                          completed_count: 1,
                          last_kill_timestamp: 1672123253000,
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  } as const)

export const EndpointNotFoundResponse = {
  code: 404,
  type: 'BLZWEBAPI000000404',
  detail: 'Not Found',
}

export const EndpointFixtureMap = ({
  id,
  name,
  realm = 'area-52',
  region = 'us',
}: FixtureOptions) => ({
  'character-profile-summary': {
    url: `/character/${realm}/${name.toLowerCase()}?locale=en_US`,
    response: EndpointOkResponse({ id, name, realm, region })['character-profile-summary'],
  },
  'character-media-summary': {
    url: `/character/${realm}/${name.toLowerCase()}/character-media?locale=en_US`,
    response: EndpointOkResponse({ id, name, realm, region })['character-media-summary'],
  },
  'character-mythic-keystone-profile': {
    url: `/character/${realm}/${name.toLowerCase()}/mythic-keystone-profile?locale=en_US`,
    response: EndpointOkResponse({ id, name, realm, region })['character-mythic-keystone-profile'],
  },
  'character-raids': {
    url: `/character/${realm}/${name.toLowerCase()}/encounters/raids?locale=en_US`,
    response: EndpointOkResponse({ id, name, realm, region })['character-raids'],
  },
})
