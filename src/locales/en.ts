export const en = {
  Auth: {
    congratulations: 'Congratulations!',
    doYouHaveAnAccount: 'Do you have an account?',
    email: 'email',
    emailInvalidError: `The email must match the format
    example@example.com`,
    emailIsNotValidOrAlreadyConfirmedError: "Email isn't valid or already confirmed",
    emailRequiredError: 'Email is required',
    emailSent: 'Email sent',
    emailTakenError: 'User with this email already registered',
    emailVerificationLinkSentAgain: 'We have sent a verification link again',
    logOut: 'Log out',
    password: 'password',
    passwordConfirmation: 'password confirmation',
    passwordConfirmationInvalidError: "Passwords don't match",
    passwordConfirmationRequiredError: 'Confirm your password',
    passwordInvalidError:
      'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~',
    passwordNotStrongEnoughError:
      'Passowod must contain at least one special character, one uppercase letter and one number',
    passwordRequiredError: 'Password is required',
    passwordTooLongError: 'Maximum number of characters 30',
    passwordTooShortError: 'Minimum number of characters 6',
    privacyPolicy: 'I agree to the <1>Terms of Service</1> and <2>Privacy Policy</2>',
    privacyPolicyRequiredError: 'You must agree to privacy policy',
    resendVerificationLink: 'Resend verification link',
    signIn: 'Sign in',
    signUp: 'Sign Up',
    username: 'username',
    usernameRequiredError: 'Username is required',
    usernameTakenError: 'User with this username already registered',
    usernameTooLongError: 'Maximum number of characters 30',
    usernameTooShortError: 'Minimum number of characters 6',
    verificationLinkExpired: 'Email verification link expired',
    verificationLinkExpiredBody:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    weSentALinkToConfirmYourEmail: 'We have sent a link to confirm your email to',
    yourEmailConfirmed: 'Your email has been confirmed',
  },
  Internationalization: {
    en: 'English',
    ru: 'Russian',
  },
  Navigation: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    messenger: 'Messenger',
    myProfile: 'My profile',
    search: 'Search',
    statistics: 'Statistics',
  },
}

export type LocaleType = typeof en
