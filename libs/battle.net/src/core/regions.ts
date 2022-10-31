export const Regions = ['us', 'eu', 'kr', 'tw', 'cn'] as const;
export type Region = typeof Regions[number];

export type Locale = 'en_US' | 'es_MX' | 'pt_BR' | 'en_GB' | 'es_ES' | 'fr_FR' | 'ru_RU' | 'de_DE' | 'pt_PT' | 'it_IT' | 'zh_TW' | 'ko_KR' | 'zh_CN';

export interface RegionalLocale {
  default: Locale
  available: Locale[]
}

export type RegionalLocales = {
  [k in Region]: { default: Locale; available: Locale[] }
};

export const RegionalLocalesMap: RegionalLocales = {
  us: { default: 'en_US', available: ['en_US', 'es_MX', 'pt_BR'] },
  eu: { default: 'en_GB', available: ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT', 'it_IT'] },
  kr: { default: 'ko_KR', available: ['ko_KR', 'en_GB', 'en_US'] },
  tw: { default: 'zh_TW', available: ['zh_TW', 'en_GB', 'en_US'] },
  cn: { default: 'zh_CN', available: ['zh_CN', 'en_GB', 'en_US'] },
};
