import { authTranslationEn } from '@/locales/auth/auth.translation.en'

export const en = {
  Auth: authTranslationEn,
  Common: {
    internalServerError: 'Unexpected server error occured, try again later',
    networkError: 'Seems like you have connection propblems, check out your network',
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
    myProfile: 'My Profile',
    profileSettings: 'Profile Settings',
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
    consent request for all social networks and social interaction platforms is not permitted.The Website 
    Administration processes information about Users, including their personal data, in order to fulfill its 
    obligations to Users regarding the use of the Website and its services. The collection of Users' personal
    data occurs on the Website during registration, as well as subsequently when Users voluntarily provide additional
    information about themselves using the Website's tools. Users' personal data is stored exclusively on electronic
    media and processed using automated systems, except in cases where non-automated processing of personal data is
    necessary to comply with legal requirements. Users' personal data is not transferred to any other third parties,
    except in cases explicitly provided for in these Rules. Upon the User's request or with the User's consent, the 
    transfer of the User's personal data to third parties—contractors of the Website Administration—is possible, 
    provided that such contractors undertake obligations to ensure the confidentiality of the received information, 
    particularly when using applications.`,
    title: 'Privacy Policy',
  },
  Profile: {
    aboutMe: 'About Me',
    citiesList: 'St. Petersburg, Moscow, Tver, Samara, Pskov',
    city: 'City',
    countriesList: 'Russia, Belarus, Ukraine, Georgia, Abkhazia',
    country: 'Country',
    dateOfBirth: 'Date of birth',
    editProfileError: {
      ageUser: 'A user under 13 cannot create a profile.Privacy Policy',
      invalidFirstName: 'The first name may contain the characters A-Za-zА-Яа-я',
      invalidLastName: 'The last name may contain the characters A-Za-zА-Яа-я',
      invalidUserName: 'The username may contain the characters A-Za-z0-9_-',
      maxLengthAboutMe: 'Maximum length is 200 characters',
      maxLengthName: 'Maximum length is 50 characters',
      maxLengthUserName: 'Maximum length is 30 characters',
      minLengthUserName: 'Minimum length is 6 characters',
      requiredError: 'Field is required',
    },
    firstName: 'First name',
    lastName: 'Last name',
    saveChangesBtn: 'Save changes',
    selectYourCity: 'Select your city',
    selectYourCountry: 'Select your country',
    userName: 'Username',
  },
  TermsService: {
    text: `Welcome to the website, an online resource that helps you stay connected with your old and new friends. 
    The site is a network project that brings people together based on their places of study or work. The site is
    a social network known by the name hosted on the internet at the address: and accessible to users through the
    website, mobile version of the site, applications, and other resources, representing the result of intellectual
    activity in the form of software for computers. The present Rules constitute a legally binding agreement between 
    the User and the Website Administration, the subject of which is the provision of access to the Website and its 
    functionalities by the Website Administration to the User. The User is required to fully familiarize themselves
    with these Rules before registering on the Website. The registration of the User on the Website signifies the 
    User's complete and unconditional acceptance of these Rules in accordance with Article 438 of the Civil Code of 
    the Russian Federation. Registration on the Website is free and voluntary. A User of the Website is an individual 
    who is registered on the Website in accordance with the procedures established by these Rules and has reached the
    age permitted by the legislation of the Russian Federation. The processing of the User's personal data is carried 
    out in accordance with the legislation of the Russian Federation.After registration, the User gains the right to 
    independently create, use, and determine the content of their personal page for personal purposes, as well as to
    set the access conditions for other Users to its content. The User also receives the ability to access and place 
    information on the personal pages of other Users. As the owner of the information posted on their personal page, 
    the User understands that, except for cases established by these Rules and applicable legislation of the Russian 
    Federation, the Website Administration does not participate in the formation and use of content or in controlling 
    access for other users to the User's personal page. By posting information on their personal page, including their 
    personal data, the User acknowledges and agrees that such information may be accessible to other users of the Internet,
    taking into account the architectural features and functionality of the Website. When using the Website, the User 
    is obliged to: comply with the provisions of the current legislation of the Russian Federation, these Rules, and
    other special documents of the Website Administration; provide accurate, complete, and up-to-date information during
    registration and ensure its relevance; inform the Website Administration about unauthorized access to their personal
    page and/or unauthorized access and/or use of the User's password and login; not grant access to other Users to their
    personal page or to specific information contained therein if it may lead to a violation of the legislation of the 
    Russian Federation and/or these Rules, as well as special documents of the Website Administration; not post on their 
    personal page information and objects (including links to them) that may violate the rights and interests of others; 
    evaluate the legality of posting information and objects (including but not limited to images of other people, texts 
    of various content, audio recordings, and videos) before posting; keep confidential and not disclose to other Users 
    and third parties personal data (including but not limited to home addresses, phone numbers, email addresses, ICQ numbers, 
    passport details, banking information) and information about the private lives of other Users and third parties that became
    known to them as a result of communication with other Users and other uses of the Website without obtaining the appropriate 
    prior consent of those individuals; perform backup of important information stored on their personal page. In case of doubts
    regarding the legality of certain actions, including posting information or granting access, the Website Administration 
    recommends refraining from such actions.`,
    title: 'Terms of Service',
  },
}
export type LocaleType = typeof en
