import { apiInstances } from 'src/boot/axios';

export default function useBots() {
  const getBotsApi = async () => {
    return await apiInstances.botsApi.listBotsBotsGet().then((res) => {
      console.log(res);
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  return { getBotsApi };
}
