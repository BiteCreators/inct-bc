import { AUTH_ERRORS } from '@/features/auth'

export const en = {
  Auth: {
    [AUTH_ERRORS.EMAIL_INVALID_ERROR]: `The email must match the format
    example@example.com`,
    [AUTH_ERRORS.EMAIL_REQUIRED_ERROR]: 'Email is required',
    [AUTH_ERRORS.EMAIL_TAKEN_ERROR]: 'User with this email already registered',
    [AUTH_ERRORS.PASSOWRD_CONFIRMATION_INVALID_ERROR]: "Passwords don't match",
    [AUTH_ERRORS.PASSOWRD_CONFIRMATION_REQUIRED_ERROR]: 'Confirm your password',
    [AUTH_ERRORS.PASSWORD_INVALID_ERROR]:
      'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~',
    [AUTH_ERRORS.PASSWORD_REQUIRED_ERROR]: 'Password is required',
    [AUTH_ERRORS.PASSWORD_TOO_LONG_ERROR]: 'Maximum number of characters 30',
    [AUTH_ERRORS.PASSWORD_TOO_SHORT_ERROR]: 'Minimum number of characters 6',
    [AUTH_ERRORS.PRIVACY_POLICY_REQUIRED_ERROR]: 'You must agree to privacy policy',
    [AUTH_ERRORS.USERNAME_REQUIRED_ERROR]: 'Username is required',
    [AUTH_ERRORS.USERNAME_TAKEN_ERROR]: 'User with this username already registered',
    [AUTH_ERRORS.USERNAME_TOO_LONG_ERROR]: 'Maximum number of characters 30',
    [AUTH_ERRORS.USERNAME_TOO_SHORT_ERROR]: 'Minimum number of characters 6',
    doYouHaveAnAccount: 'Do you have an account?',
    email: 'email',
    password: 'password',
    passwordConfirmation: 'password confirmation',
    privaccyPolicy: '???',
    signIn: 'Sign in',
    signUp: 'Sign Up',
    username: 'username',
  },
  Internationalization: {
    en: 'English',
    ru: 'Russian',
  },
}

export type LocaleType = typeof en
