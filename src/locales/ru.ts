import { AUTH_ERRORS } from '@/features/auth'

import { LocaleType } from './en'

export const ru: LocaleType = {
  Auth: {
    [AUTH_ERRORS.EMAIL_INVALID_ERROR]: `Email должен быть формата
    example@example.com`,
    [AUTH_ERRORS.EMAIL_REQUIRED_ERROR]: 'Введите email',
    [AUTH_ERRORS.EMAIL_TAKEN_ERROR]: 'Пользователь с таким email уже зарегистрирован',
    [AUTH_ERRORS.PASSWORD_CONFIRMATION_INVALID_ERROR]: 'Пароли не совпадают',
    [AUTH_ERRORS.PASSWORD_CONFIRMATION_REQUIRED_ERROR]: 'Подтвердите пароль',
    [AUTH_ERRORS.PASSWORD_INVALID_ERROR]:
      'Пароль должен содержать a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~',
    [AUTH_ERRORS.PASSWORD_REQUIRED_ERROR]: 'Введите пароль',
    [AUTH_ERRORS.PASSWORD_TOO_LONG_ERROR]: 'Максимум 30 символов',
    [AUTH_ERRORS.PASSWORD_TOO_SHORT_ERROR]: 'Минимум 6 символов',
    [AUTH_ERRORS.PRIVACY_POLICY_REQUIRED_ERROR]: 'Заполните это поле',
    [AUTH_ERRORS.USERNAME_REQUIRED_ERROR]: 'Введите имя пользователя',
    [AUTH_ERRORS.USERNAME_TAKEN_ERROR]: 'Пользователь с таким именем уже зарегестрирован',
    [AUTH_ERRORS.USERNAME_TOO_LONG_ERROR]: 'Максимум 30 символов',
    [AUTH_ERRORS.USERNAME_TOO_SHORT_ERROR]: 'Минимум 6 символов',
    doYouHaveAnAccount: 'Уже есть аккаунт?',
    email: 'email',
    password: 'пароль',
    passwordConfirmation: 'подтвердите пароль',
    privacyPolicy: 'Я согласен с <1>Условиями</1> и <2>Политикой конфиденсальности</2>',
    signIn: 'Вход',
    signUp: 'Регистрация',
    username: 'имя пользователя',
  },
  Internationalization: {
    en: 'Английский',
    ru: 'Русский',
  },
}
