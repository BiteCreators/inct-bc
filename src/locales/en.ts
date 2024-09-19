export const en = {
  Auth: {
    doYouHaveAnAccount: 'Do you have an account?',
    email: 'email',
    emailInvalidError: `The email must match the format
    example@example.com`,
    emailRequiredError: 'Email is required',
    password: 'password',
    passwordConfirmation: 'password confirmation',
    passwordConfirmationRequiredError: 'Please confirm the password',
    passwordRequiredError: 'password is required',
    passwordShortError: 'Minimum number of characters 6',
    privaccyPolicy: '???',
    privacyPolicyRequiredError: 'You must agree to privacy policy',
    signUp: 'Sign Up',
    username: 'username',
    usernameLongError: 'Maximum number of characters 30',
  },
  Internationalization: {
    en: 'English',
    ru: 'Russian',
  },
}

export type LocaleType = typeof en
