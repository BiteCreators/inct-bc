export const en = {
  Auth: {
    congratulations: 'Congratulations!',
    doYouHaveAnAccount: 'Do you have an account?',
    email: 'email',
    emailInvalidError: `The email must match the format
    example@example.com`,
    emailRequiredError: 'Email is required',
    emailSent: 'Email sent',
    emailTakenError: 'User with this email already registered',
    password: 'password',
    passwordConfirmation: 'password confirmation',
    passwordConfirmationInvalidError: "Passwords don't match",
    passwordConfirmationRequiredError: 'Confirm your password',
    passwordInvalidError:
      'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~',
    passwordRequiredError: 'Password is required',
    passwordTooLongError: 'Maximum number of characters 30',
    passwordTooShortError: 'Minimum number of characters 6',
    privacyPolicy: 'I agree to the <1>Terms of Service</1> and <2>Privacy Policy</2>',
    privacyPolicyRequiredError: 'You must agree to privacy policy',
    signIn: 'Sign in',
    signUp: 'Sign Up',
    username: 'username',
    usernameRequiredError: 'Username is required',
    usernameTakenError: 'User with this username already registered',
    usernameTooLongError: 'Maximum number of characters 30',
    usernameTooShortError: 'Minimum number of characters 6',
    weSentALinkToConfirmYourEmail: 'We have sent a link to confirm your email to',
    yourEmailConfirmed: 'Your email has been confirmed',
  },
  Internationalization: {
    en: 'English',
    ru: 'Russian',
  },
}

export type LocaleType = typeof en
