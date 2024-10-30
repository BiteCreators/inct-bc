import { authTranslationEn } from '@/locales/auth'
import { commonTranslationEn } from '@/locales/common'
import { devicesTranslationsEn } from '@/locales/devices'
import { internationalizationTranslationEn } from '@/locales/internationalization'
import { navigationTranslationEn } from '@/locales/navigation'
import { privacyPolicyTranslationEn } from '@/locales/privacy-policy'
import { profileTranslationEn } from '@/locales/profile'
import { termsServiceTranslationEn } from '@/locales/terms-service'

export const en = {
  Auth: authTranslationEn,
  Common: commonTranslationEn,
  Devices: devicesTranslationsEn,
  Internationalization: internationalizationTranslationEn,
  Navigation: navigationTranslationEn,
  Posts: {},
  PrivacyPolicy: privacyPolicyTranslationEn,
  Profile: profileTranslationEn,
  TermsService: termsServiceTranslationEn,
}
export type LocaleType = typeof en
