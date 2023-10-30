import Taro from '@tarojs/taro';
import {View, Text, Button} from '@tarojs/components';
import {useAppSelector} from '@/store/hooks';
import {selectLogin} from '@/store/login';
import './index.scss';

const Index = () => {
  const getEnv = (): string => {
    if (process.env.TARO_ENV !== 'rn')
      return `当前环境: ${process.env.TARO_ENV}`;

    const deviceInfo = Taro.getDeviceInfo();
    return `当前环境 ${deviceInfo.platform}`;
  };

  const login = useAppSelector(selectLogin);

  const logininfo = (): string => {
    return JSON.stringify(login);
  };

  return (
    <View className='index'>
      <View>{getEnv()}</View>
      <View>{'登录信息:' + logininfo() + '\n'}</View>
      <Button
        onClick={() =>
          Taro.scanCode({
            onlyFromCamera: true,
            success: res => {
              console.log(res);
            },
          })
        }
      >
        扫描录入
      </Button>
    </View>
  );
};

export default Index;
