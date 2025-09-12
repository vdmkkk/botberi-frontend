import { apiInstances } from 'src/boot/axios';

export default function useInstances() {
  const getInstancesApi = async () => {
    return await apiInstances.instancesApi.listInstancesInstancesGet().then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  return { getInstancesApi };
}
