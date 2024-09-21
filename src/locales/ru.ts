import { LocaleType } from './en'

export const ru: LocaleType = {
  Auth: {
    doYouHaveAnAccount: 'Уже есть аккаунт?',
    email: 'email',
    emailInvalidError: `Email должен быть формата
    example@example.com`,
    emailRequiredError: 'Введите email',
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
  },
  Internationalization: {
    en: 'Английский',
    ru: 'Русский',
  },
}
