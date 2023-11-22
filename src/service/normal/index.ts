import KpRequest from '@/service/core/index';
import {getBaseUrl} from '@/service/manager/url';
import store from '@/store/index';
import { setStoreNormal } from '@/store/normal';

export async function getNormal(): Promise<any> {
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
        message: response?.data?.message || '提交失败',
        success: false,
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
}


export async function getNormal2() {
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
    console.error('getOperators failed');
    return;
  }

  const operators = response.data.data.map((item: any) => {
    return {
      id: item?.ID || '',
      name: item?.Name || '',
    };
  });

  store.dispatch(setStoreOperator(operators));
}
