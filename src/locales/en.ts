import { authTranslationEn } from '@/locales/auth'
import { commonTranslationEn } from '@/locales/common'
import { devicesTranslationsEn } from '@/locales/devices'
import { internationalizationTranslationEn } from '@/locales/internationalization'
import { navigationTranslationEn } from '@/locales/navigation'
import { privacyPolicyTranslationEn } from '@/locales/privacy-policy'
import { profileTranslationEn } from '@/locales/profile'
import { termsServiceTranslationEn } from '@/locales/terms-service'

import { paymentsTranslationsEn } from './payments'
import { postsTranslationsEn } from './posts'

export const en = {
  Auth: authTranslationEn,
  Common: commonTranslationEn,
  Devices: devicesTranslationsEn,
  Internationalization: internationalizationTranslationEn,
  Navigation: navigationTranslationEn,
  Payments: paymentsTranslationsEn,
  Posts: postsTranslationsEn,
  PrivacyPolicy: privacyPolicyTranslationEn,
  Profile: profileTranslationEn,
  TermsService: termsServiceTranslationEn,
}
export type LocaleType = typeof en
