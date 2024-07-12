import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
} from "../types";

export const createAccount = async (formData: UserRegistrationForm) => {
  try {
    const url = "/auth/create-account";
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const confirmAccount = async (formData: ConfirmToken) => {
  try {
    const url = "/auth/confirm-account";
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const requestConfirmCode = async (
  formData: RequestConfirmationCodeForm
) => {
  try {
    const url = "/auth/request-code";
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const loginUser = async (formData: UserLoginForm) => {
  try {
    const url = "/auth/login";
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  try {
    const url = "/auth/forgot-password";
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const validateToken = async (formData: ConfirmToken) => {
  try {
    const url = "/auth/validate-token";
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const updatePasswordWithToken = async ({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) => {
  try {
    const url = `/auth/update-password/${token}`;
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};