import { LocaleType } from '@/locales/en'
import { z } from 'zod'

export const createEditProfileSchema = (t: LocaleType['Profile']) => {
  return z
    .object({
      aboutMe: z.string().max(200, t.editProfileError.maxLengthAboutMe).optional(),
      dateOfbirth: z.date().nullable().optional(),
      firstName: z
        .string()
        .min(1, t.editProfileError.requiredError)
        .max(50, t.editProfileError.maxLengthName)
        .regex(new RegExp(/^[a-zа-я]+$/, 'i')),
      lastName: z
        .string()
        .min(1, t.editProfileError.requiredError)
        .max(50, t.editProfileError.maxLengthName)
        .regex(new RegExp(/^[a-zа-я]+$/, 'i')),

      selectYourCity: z.string().optional(),
      selectYourCountry: z.string().optional(),
      userName: z
        .string()
        .min(6, t.editProfileError.minLengthUserName)
        .max(30, t.editProfileError.maxLengthUserName)
        .regex(new RegExp(/^[0-9a-z_-]+$/, 'i')),
    })
    .refine(
      data => {
        if (data.dateOfbirth !== null && data.dateOfbirth !== undefined) {
          return new Date().getFullYear() - data.dateOfbirth.getFullYear() >= 1 //исправить на 13 по ТЗ
        }

        return true
      },
      {
        message: t.editProfileError.ageUser,
        path: ['dateOfbirth'],
      }
    )
}

export type EditProfileFormData = z.infer<ReturnType<typeof createEditProfileSchema>>
