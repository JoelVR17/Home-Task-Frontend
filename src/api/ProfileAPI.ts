import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const { data } = await api.put(`/auth/profile`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const changePassword = async (
  formData: UpdateCurrentUserPasswordForm
) => {
  try {
    const { data } = await api.post(`/auth/update-password`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};
