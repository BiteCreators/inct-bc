import { authTranslationRu } from '@/locales/auth/auth.translation.ru'

import { LocaleType } from './en'

export const ru: LocaleType = {
  Common: {
    internalServerError: 'Произошла непредвиденная ошибка, попробуйте позже',
    networkError: 'Похоже у вас проблемы с сетью, проверьте подключение',
  },
  Auth: authTranslationRu,
  Internationalization: {
    en: 'Английский',
    ru: 'Русский',
  },
  Navigation: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    messenger: 'Мессенджер',
    myProfile: 'Профиль',
    search: 'Поиск',
    statistics: 'Статистика',
  },
}
