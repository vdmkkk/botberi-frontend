import { apiInstances } from 'src/boot/axios';
import {
  InstanceCreate,
  InstanceStatusUpdate,
  InstanceUpdate,
  KBEntryCreate,
  KBEntryOut,
} from '../api';
import { AxiosError } from 'axios';
import moment from 'moment';
import StatsWindow from 'src/types/StatsWindow.type';
import useStatsWindow from 'src/composables/useStatsWindow';

export default function useInstances() {
  const getInstancesApi = async () => {
    return await apiInstances.instancesApi.listInstancesInstancesGet().then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const getInstanceApi = async (id: number) => {
    return await apiInstances.instancesApi.getInstanceInstancesIidGet(id).then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const createInstanceApi = async (data: InstanceCreate) => {
    return await apiInstances.instancesApi.createInstanceInstancesPost(data).then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const updateInstance = async (id: number, data: InstanceUpdate) => {
    return await apiInstances.instancesApi
      .updateInstanceInstancesIidPut(id, data)
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  const deleteInstanceApi = async (id: number) => {
    return await apiInstances.instancesApi
      .deleteInstanceInstancesIidDelete(id)
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  const changeInstanceStatusApi = async (id: number, data: InstanceStatusUpdate) => {
    return await apiInstances.instancesApi
      .setInstanceStatusInstancesIidStatusPatch(id, data)
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  const getInstanceStats = async (id: number, window: StatsWindow) => {
    const to = moment();
    const from = useStatsWindow(window, to);
    return await apiInstances.instancesApi
      .getInstanceStatsInstancesIidStatsGet(id, from.toISOString(), to.toISOString(), true)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
      });
  };

  const addKBEntry = async (id: number, data: KBEntryCreate): Promise<KBEntryOut> => {
    return await apiInstances.instancesApi
      .kbAddEntryInstancesIidKbEntriesPost(id, data)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
      })
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  const deleteKBEntry = async (id: number, entryId: number) => {
    return await apiInstances.instancesApi
      .kbDeleteEntryRouteInstancesIidKbEntriesEntryIdDelete(id, entryId)
      .catch((e: AxiosError) => {
        throw e;
      });
  };

  return {
    getInstancesApi,
    getInstanceApi,
    createInstanceApi,
    updateInstance,
    changeInstanceStatusApi,
    getInstanceStats,
    deleteInstanceApi,
    addKBEntry,
    deleteKBEntry,
  };
}
