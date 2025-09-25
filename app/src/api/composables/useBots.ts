import { apiInstances } from 'src/boot/axios';

export default function useBots() {
  const getBotsApi = async () => {
    return await apiInstances.botsApi.listBotsBotsGet().then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const getBotApi = async (bot_id: number) => {
    return await apiInstances.botsApi.listBotsBotsGet().then((res) => {
      if (res.status == 200) {
        return res.data.find(({ id }) => {
          return id == bot_id;
        });
      }
    });
  };

  return { getBotsApi, getBotApi };
}
