import { useState } from "react";

import { profileApi } from "@/entities/profile";
import { useConfirmation, useScopedTranslation } from "@byte-creators/utils";

export const useProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile, isLoading: isProfileLoading } =
    profileApi.useGetProfileQuery();
  const [setAvatarProfile, { isLoading: isLoadingSet }] =
    profileApi.useSetAvatarProfileMutation();
  const [deleteAvatarProfile, { isLoading: isLoadingDelete }] =
    profileApi.useDeleteAvatarProfileMutation();
  const {
    confirmOpen,
    handleConfirm,
    handleReject,
    requestConfirmation,
    setConfirmOpen,
  } = useConfirmation();
  const t = useScopedTranslation("Profile");
  const [apiError, setApiError] = useState<null | string>(null);

  const isLoading = isProfileLoading || isLoadingSet || isLoadingDelete;
  const currentAvatar = profile?.avatars?.[0] || null;

  const updateAvatar = async (file: File) => {
    setApiError(null);
    try {
      await setAvatarProfile({ file }).unwrap();
    } catch (error) {
      setApiError(t.editProfileError.settingsNotSaved);
    }
  };

  const removeAvatar = async () => {
    if (!currentAvatar) {
      return;
    }

    const confirmed = await requestConfirmation();

    if (!confirmed) {
      return;
    }

    try {
      await deleteAvatarProfile().unwrap();
    } catch (error) {
      setApiError(t.editProfileError.settingsNotSaved);
    }
  };

  return {
    apiError,
    confirmOpen,
    currentAvatar,
    handleConfirm,
    handleReject,
    isLoading,
    isOpen,
    removeAvatar,
    setConfirmOpen,
    setIsOpen,
    updateAvatar,
  };
};
