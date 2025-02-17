import { LocaleType } from '@/locales/en'
import { z } from 'zod'

export const createEditProfileSchema = (t: LocaleType['Profile']) => {
  return z
    .object({
      aboutMe: z.string().max(200, t.editProfileError.maxLengthAboutMe).optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      dateOfBirth: z.date({ message: t.editProfileError.requiredError }),

      firstName: z
        .string()
        .min(1, t.editProfileError.requiredError)
        .max(50, t.editProfileError.maxLengthName)
        .regex(new RegExp(/^[a-zа-я]+$/, 'i'), { message: t.editProfileError.invalidFirstName }),
      lastName: z
        .string()
        .min(1, t.editProfileError.requiredError)
        .max(50, t.editProfileError.maxLengthName)
        .regex(new RegExp(/^[a-zа-я]+$/, 'i'), { message: t.editProfileError.invalidLastName }),
      userName: z
        .string()
        .min(6, t.editProfileError.minLengthUserName)
        .max(30, t.editProfileError.maxLengthUserName)
        .regex(new RegExp(/^[0-9a-z_-]+$/, 'i'), { message: t.editProfileError.invalidUserName }),
    })
    .refine(
      data => {
        if (data.dateOfBirth !== null && data.dateOfBirth !== undefined) {
          const now = new Date()
          const age = now.getFullYear() - data.dateOfBirth.getFullYear()

          const isBeforeBirthdayThisYear =
            now.getMonth() < data.dateOfBirth.getMonth() ||
            (now.getMonth() === data.dateOfBirth.getMonth() &&
              now.getDate() < data.dateOfBirth.getDate())

          return age > 13 || (age === 13 && !isBeforeBirthdayThisYear)
        }

        return false
      },
      {
        message: t.editProfileError.ageUser,
        path: ['dateOfBirth'],
      }
    )
}
export type EditProfileFormData = z.infer<ReturnType<typeof createEditProfileSchema>>
