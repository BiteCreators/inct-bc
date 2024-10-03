import { authTranslationEn } from '@/locales/auth/auth.translation.en'

export const en = {
  Common: {
    internalServerError: 'Unexpected server error occured, try again later',
    networkError: 'Seems like you have connection propblems, check out your network',
  },
  Auth: authTranslationEn,
  Internationalization: {
    en: 'English',
    ru: 'Russian',
  },
  Navigation: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    messenger: 'Messenger',
    myProfile: 'My Profile',
    search: 'Search',
    statistics: 'Statistics',
  },
}
export type LocaleType = typeof en
