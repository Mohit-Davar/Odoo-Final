import { userLogin } from '@/api/Login';
import { showErrorToast } from '@/lib/showToast';

export const handleUserLogin = async (
  data,
  setAccessToken,
  navigate,
) => {
  try {
    const { accessToken } = await userLogin(data);
    setAccessToken(accessToken);
    navigate("/dashboard");
  } catch {
    showErrorToast("Login failed");
  }
};