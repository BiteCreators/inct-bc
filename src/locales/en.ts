export const en = {
  Auth: {
    congratulations: 'Congratulations!',
    doYouHaveAnAccount: 'Do you have an account?',
    dontHaveAnAccount: 'Don’t have an account?',
    email: 'Email*',
    emailInvalidError: `The email must match the format
    example@example.com`,
    emailIsNotValidOrAlreadyConfirmedError: "Email isn't valid or already confirmed",
    emailOrPasswordError: 'Invalid password or email',
    emailRequiredError: 'Email is required',
    emailSent: 'Email sent',
    emailTakenError: 'User with this email already registered',
    emailVerificationLinkSentAgain: 'We have sent a verification link again',
    forgotPassword: 'Forgot Password',
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
    username: 'Username',
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
  PrivacyPolicy: {
    text: `The purpose of these Rules is to ensure adequate protection of information from users,
     including their personal data, from unauthorized access and disclosure. Current 
     the edition of the Rules, which are a public document, is available to any Internet user at
    follow the link. The Site Administration has the right to make changes to theseRules. When changes
     are made to the Rules, the Site Administration notifies users of this 
    by posting a new version of the Rules on the Site at a permanent address not 
    later than 10 days before the relevant changes come into force. Previous editions of the Rules
    are stored in the documentation archive of the Site Administration. These Rules have been developed and are used in
    in accordance with the Site Use Rules posted on the Site at.In the event of contradictions between these Rules and 
    other official documents of the Website Administration, these Rules shall apply. By registering and using
     the Website, the User expresses their consent to the terms of these Rules. If the User disagrees with the 
     terms of these Rules, the use of the Website and its services must be immediately discontinued. If, in accordance
      with the law, separate consent from the User is required for the processing of personal data in connection.When 
      using the Website, such consent is requested from the User only in relation to the use of the Website. A single 
      consent request for all social networks and social interaction platforms is not permitted."`,
    title: 'Privacy Policy',
  },
}

export type LocaleType = typeof en
