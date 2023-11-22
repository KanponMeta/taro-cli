import type { NormalResponse } from '@/types/global';

import KpRequest from '@/service/core/index';
import {getBaseUrl} from '@/service/manager/url';
import store from '@/store/index';
import { setStoreNormal } from '@/store/normal';

export async function getNormal(): Promise<NormalResponse> {
  const response = await KpRequest.get(
    {
      url: getBaseUrl('normal'),
    },
    {
      header: {
        Authorization: store.getState().login.data || '',
      },
    },
  );

  console.log(JSON.stringify(response));

  if (response?.data.code !== 3000) {
    return new Promise((resolve, reject) => {
      reject({
        data: response?.data?.message || '提交失败',
        success: false,
        type: 'failed',
      });
    });
  }

  const normals = response.data.data.map((item: any) => {
    return {
      id: item?.ID || '',
      name: item?.Name || '',
    };
  });

  store.dispatch(setStoreNormal(normals));
  return new Promise((resolve) => {
    resolve({
      data: normals,
      success: true,
      type: 'success',
    });
  });
}
