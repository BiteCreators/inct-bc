import { LocaleType } from '../en'

export const profileTranslationRu: LocaleType['Profile'] = {
  aboutMe: 'Обо мне',
  addProfilePhoto: 'Добавить фотографию профиля',
  citiesList: 'Санкт-Петербург,Москва,Тверь,Самара,Псков',
  city: 'Город',
  countriesList: 'Россия,Беларусь,Украина,Грузия,Абхазия',
  country: 'Страна',
  dateOfBirth: 'Дата рождения',
  editProfileError: {
    ageUser: 'Пользователь младше 13 лет не может создать профиль.Политика конфиденциальности',
    invalidFirstName: 'Имя может содержать символы A-Za-zА-Яа-я',
    invalidLastName: 'Фамилия может содержать символы A-Za-zА-Яа-я',
    invalidUserName: 'Имя пользователя может содержать символы A-Za-z0-9_-',
    maxLengthAboutMe: 'Максимальная длина 200 символов',
    maxLengthName: 'Максимальная длина 50 символов',
    maxLengthUserName: 'Максимальная длина 30 символов',
    minLengthUserName: 'Минимальная длина 6 символов',
    requiredError: 'Поле обязательно для заполнения',
    settingsNotSaved: 'Ошибка! Сервер недоступен',
  },
  firstName: 'Имя',
  followers: 'Подписчики',
  following: 'Подписки',
  lastName: 'Фамилия',
  publications: 'Публикации',
  saveChangesBtn: 'Сохранить изменения',
  selectYourCity: 'Выберите город',
  selectYourCountry: 'Выберите страну',
  settingsSaved: 'Настройки профиля сохранены!',
  userName: 'Имя пользователя',
}
