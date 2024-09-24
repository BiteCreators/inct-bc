import { LocaleType } from './en'

export const ru: LocaleType = {
  Auth: {
    congratulations: 'Поздравляем!',
    doYouHaveAnAccount: 'Уже есть аккаунт?',
    email: 'email',
    emailInvalidError: `Email должен быть формата
    example@example.com`,
    emailRequiredError: 'Введите email',
    emailSent: 'Письмо отправлено',
    emailTakenError: 'Пользователь с таким email уже зарегистрирован',
    password: 'пароль',
    passwordConfirmation: 'подтвердите пароль',
    passwordConfirmationInvalidError: 'Пароли не совпадают',
    passwordConfirmationRequiredError: 'Подтвердите пароль',
    passwordInvalidError:
      'Пароль должен содержать a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~',
    passwordRequiredError: 'Введите пароль',
    passwordTooLongError: 'Максимум 30 символов',
    passwordTooShortError: 'Минимум 6 символов',
    privacyPolicy: 'Я согласен с <1>Условиями</1> и <2>Политикой конфиденсальности</2>',
    privacyPolicyRequiredError: 'Заполните это поле',
    signIn: 'Вход',
    signUp: 'Регистрация',
    username: 'имя пользователя',
    usernameRequiredError: 'Введите имя пользователя',
    usernameTakenError: 'Пользователь с таким именем уже зарегестрирован',
    usernameTooLongError: 'Максимум 30 символов',
    usernameTooShortError: 'Минимум 6 символов',
    verificationLinkExpired: 'Ссылка не действительна',
    verificationLinkExpiredBody:
      'Ваша ссылка подтверждения более не действительна, не волнуйтесь, мы можем отправить новую',
    weSentALinkToConfirmYourEmail: 'Письмо со ссылкой для подтверждения email была отправлена на',
    yourEmailConfirmed: 'Ваш email успешно подтверждён',
  },
  Internationalization: {
    en: 'Английский',
    ru: 'Русский',
  },
}
