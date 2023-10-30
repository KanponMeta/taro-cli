import KpRequest from '@/service/core/index';
import {getBaseUrl} from '@/service/manager/url';

export function login(): Promise<any> {
  console.log('url', getBaseUrl('login'))
  return KpRequest.post({
    url: getBaseUrl('login'),
    data: {
      username: 'johndoe',
      password: 'secret',
    },
    contentType: 'application/x-www-form-urlencoded',
  });
}
