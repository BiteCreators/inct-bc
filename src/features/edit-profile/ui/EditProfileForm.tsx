import React from "react";

import { useLocation } from "@/features/profile/model/useLocation";
import { LocationsProps } from "@/pages/profile/[id]/settings";
import {
  Button,
  FormInput,
  FormSelect,
  FormTextArea,
  Loader,
} from "@byte-creators/ui-kit";
import { FormDatePicker } from "@byte-creators/ui-kit";
import { SearchableOptions } from "@byte-creators/ui-kit";

import { useEditProfileForm } from "../model/useEditProfileForm";
import { ProfileAvatar } from "./avatar/ProfileAvatar";

export const EditProfileForm = ({ cities, countries }: LocationsProps) => {
  const {
    control,
    handleSubmit,
    isError,
    isLoading,
    isShowAlert,
    isValid,
    message,
    onClose,
    profile,
    t,
  } = useEditProfileForm();

  const { checkError, cityOptions, countryOptions, handlerCountry } =
    useLocation(cities, countries, profile);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={"flex flex-col gap-10 text-sm relative lg:flex-row"}>
      <div className={"flex flex-col gap-6 min-w-[275px]"}>
        <ProfileAvatar />
      </div>
      <form
        className={"flex flex-col grow gap-6"}
        noValidate
        onSubmit={handleSubmit}
      >
        <FormInput
          control={control}
          label={t.userName}
          name={"userName"}
          required
        />
        <FormInput
          control={control}
          label={t.firstName}
          name={"firstName"}
          required
        />
        <FormInput
          control={control}
          label={t.lastName}
          name={"lastName"}
          required
        />
        <FormDatePicker
          className={"w-full p-[0px] bg-inherit"}
          control={control}
          inputClassName={"justify-between px-2 border border-dark-300"}
          label={t.dateOfBirth}
          mode={"single"}
          name={"dateOfBirth"}
          required
        />
        <div className={"flex gap-6"}>
          <div className={"w-full"}>
            <FormSelect
              control={control}
              defaultValue={profile?.country || ""}
              error={checkError(countryOptions)}
              label={t.selectYourCountry}
              name={"country"}
              onValueChange={(countyCode) => handlerCountry(countyCode)}
              placeholder={"Country"}
            >
              <SearchableOptions
                options={countryOptions.length !== 0 ? countryOptions : []}
                selectedValue={profile?.country || ""}
              />
            </FormSelect>
          </div>
          <div className={"w-full"}>
            <FormSelect
              control={control}
              defaultValue={profile?.city}
              label={t.selectYourCity}
              name={"city"}
              placeholder={"City"}
            >
              <SearchableOptions
                options={cityOptions.length !== 0 ? cityOptions : []}
                selectedValue={profile?.city || ""}
              />
            </FormSelect>
          </div>
        </div>
        <FormTextArea
          className={"mb-6"}
          control={control}
          label={t.aboutMe}
          name={"aboutMe"}
        />
        <Button
          className={"w-min-40 self-end"}
          disabled={!isValid}
          type={"submit"}
        >
          {t.saveChangesBtn}
        </Button>
      </form>
      <hr className={"border-dark-300 w-full absolute bottom-[60px]"}></hr>
    </div>
  );
};
