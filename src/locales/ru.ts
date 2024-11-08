import { myPaymentsTranslationRu } from '@/locales/payments/payments.ru'

import { authTranslationRu } from './auth'
import { commonTranslationRu } from './common'
import { devicesTranslationsRu } from './devices'
import { LocaleType } from './en'
import { internationalizationTranslationRu } from './internationalization'
import { navigationTranslationRu } from './navigation'
import { postsTranslationsRu } from './posts'
import { privacyPolicyTranslationRu } from './privacy-policy'
import { profileTranslationRu } from './profile'
import { termsServiceTranslationRu } from './terms-service'

export const ru: LocaleType = {
  Auth: authTranslationRu,
  Common: commonTranslationRu,
  Devices: devicesTranslationsRu,
  Internationalization: internationalizationTranslationRu,
  Navigation: navigationTranslationRu,
  Payments: myPaymentsTranslationRu,
  Posts: postsTranslationsRu,
  PrivacyPolicy: privacyPolicyTranslationRu,
  Profile: profileTranslationRu,
  TermsService: termsServiceTranslationRu,
}
