import React, { FormEvent, useState } from 'react'

import { profileApi } from '@/common/api/profile-api'

export default function Profile() {
  //--- getProfileData ---//

  const { data: getProfileData, error: getProfileError } = profileApi.useGetProfileQuery()

  console.log('getProfileSuccess', getProfileData)
  console.log('getProfileError', getProfileError)

  const profileData = {
    // aboutMe: 'Lorem Ipsum',
    // city: 'NoCity',
    // country: 'NoCountry',
    dateOfBirth: '01-01-1900',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    // region: 'NoRegion',
    userName: 'NickName',
  }
  const [editProfile] = profileApi.useEditProfileMutation()

  //--- editProfileData ---//

  const onSubmit = async () => {
    try {
      const res = await editProfile(profileData)

      console.log('editProfileSuccess', res)
    } catch (error) {
      console.log('editProfileError', error)
    }
  }

  //--- deleteProfile ---//

  const [deleteProfile] = profileApi.useDeleteProfileMutation()

  const handleDeleteProfile = async () => {
    try {
      const res = await deleteProfile()

      console.log('deleteProfileSuccess', res)
    } catch (error) {
      console.log('deleteProfileError', error)
    }
  }

  //--- setAvatarProfile ---//

  const [setAvatarProfile] = profileApi.useSetAvatarProfileMutation()
  const [file, setFile] = useState<File | null>(null)

  const handleUploadImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (file) {
        const res = await setAvatarProfile({ file })

        console.log('uploadImageSuccess', res)
      }
    } catch (error) {
      console.error('uploadImageError', error)
    }
  }

  //--- deleteAvatarProfile ---//

  const [deleteAvatarProfile] = profileApi.useDeleteAvatarProfileMutation()

  const handleDeleteAvatarProfile = async () => {
    try {
      const res = await deleteAvatarProfile()

      console.log('deleteAvatarProfileSuccess', res)
    } catch (error) {
      console.log('deleteAvatarProfileError', error)
    }
  }

  //--- deleteProfileForId ---//

  const [deleteProfileForId] = profileApi.useDeleteProfileForIdMutation()

  const handleDeleteProfileForProfile = async () => {
    try {
      const res = await deleteProfileForId({ id: 1072 })

      console.log('deleteProfileForIdSuccess', res)
    } catch (error) {
      console.log('deleteProfileForIdError', error)
    }
  }

  return (
    <>
      Profile <br />
      <img alt={''} src={getProfileData?.avatars[0]?.url} />
      <button onClick={onSubmit}>Edit Profile</button> <br />
      <form onSubmit={handleUploadImage}>
        <input onChange={e => setFile(e.currentTarget.files?.[0] ?? null)} type={'file'} />
        <button type={'submit'}>submit</button>
      </form>{' '}
      <br />
      <button onClick={handleDeleteAvatarProfile}>DELETE avatar</button>
      <br />
      <button onClick={handleDeleteProfile}>DELETE Profile</button> <br />
      <button onClick={handleDeleteProfileForProfile}>DELETE ProfileForId</button> <br />
    </>
  )
}
