import { apiInstances } from 'src/boot/axios';
import { UserUpdate } from '../api';
import { AxiosError } from 'axios';

export default function useUsers() {
  const getMe = async () => {
    return await apiInstances.usersApi.getMeUsersMeGet().then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const updateMe = async (data: UserUpdate) => {
    return await apiInstances.usersApi.updateMeUsersMePatch(data).catch((e: AxiosError) => {
      throw e;
    });
  };

  return { getMe, updateMe };
}
