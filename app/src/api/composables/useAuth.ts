import { apiInstances } from 'src/boot/axios';
import { ForgotPasswordIn, LoginIn, RegisterIn, ResetPasswordIn, VerifyEmailIn } from '../api';
import { Cookies } from 'quasar';
import { AxiosError } from 'axios';

export default function useAuth() {
  const loginApi = async (data: LoginIn) => {
    return await apiInstances.authApi.loginAuthLoginPost(data).then((res) => {
      if (res.status == 200) {
        const { session_token, refresh_token } = res.data;
        if (session_token && refresh_token) {
          Cookies.set('session_token', session_token);
          Cookies.set('refresh_token', refresh_token);
        }
      }
    });
  };

  const registerApi = async (data: RegisterIn) => {
    return await apiInstances.authApi.registerAuthRegisterPost(data).catch((e: AxiosError) => {
      throw e;
    });
  };

  const confirmEmailApi = async (data: VerifyEmailIn) => {
    return await apiInstances.authApi.verifyEmailAuthVerifyEmailPost(data).then((res) => {
      if (res.status == 200) {
        const { session_token, refresh_token } = res.data;
        if (session_token && refresh_token) {
          Cookies.set('session_token', session_token);
          Cookies.set('refresh_token', refresh_token);
        }
      }
    });
  };

  const forgotPasswordApi = async (data: ForgotPasswordIn) => {
    return await apiInstances.authApi
      .forgotPasswordAuthForgotPasswordPost(data)
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  const resetPasswordApi = async (data: ResetPasswordIn) => {
    return await apiInstances.authApi
      .resetPasswordAuthResetPasswordPost(data)
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  const logoutApi = async () => {
    const session = Cookies.get('session_token');
    return await apiInstances.authApi.logoutAuthLogoutPost(session).finally(() => {
      Cookies.remove('refresh_token');
      Cookies.remove('session_token');
    });
  };

  return { loginApi, logoutApi, registerApi, confirmEmailApi, forgotPasswordApi, resetPasswordApi };
}
