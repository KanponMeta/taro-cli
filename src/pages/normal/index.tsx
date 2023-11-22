import Taro, {useRouter, useDidShow} from '@tarojs/taro';

import {useEffect, useState, useMemo} from 'react';
import {useAppSelector} from '@/store/hooks';
import {selectLogin} from '@/store/login';
import {getNormal} from '@/service/normal';

import {View, Text, Button} from '@tarojs/components';
import Scanner from '@/components/scanner';

import './index.scss';

const Index = () => {
  //#region  外部数据
  // 通过路由获取
  const router = useRouter(); // Next.js router
  const id = (router.params.id as string) ?? ''; // Get ticket ID from router params
  console.log('id', id);

  // 通过 store 获取
  const login = useAppSelector(selectLogin);
  const logininfo = (): string => {
    return JSON.stringify(login);
  };

  // 通过请求获取
  // ## 每次进入页面都会请求一次
  const [normals, setNormals] = useState([]);
  useDidShow(() => {
    getNormal();
    setNormals([]);
  });

  // ## 初次从上个页面进入页面请求一次
  useEffect(() => {
    getNormal();
    setNormals([]);
  }, []);

  //#endregion

  //#region  内部静态数据，不会频繁变更
  const getEnv = useMemo(() => {
    if (process.env.TARO_ENV !== 'rn')
      return `当前环境: ${process.env.TARO_ENV}`;

    try {
      const deviceInfo = Taro.getSystemInfoSync();
      return `当前环境: ${deviceInfo?.platform}`;
    } catch (e) {
      console.log(e);
    }

    return '';
  }, []);
  //#endregion

  //#region 页面上下文数据,用于页面渲染，不要频繁变更
  // 初始数据
  const originalContext = {
    standardTime: '',
    temperature: 0,
    humidity: 0,
    recorder: '',
    recorderId: '',
    description: '',
  };

  // 组装一个页面上下文数据
  const [context, setContext] = useState(originalContext);

  // 重置上下文
  const resetContext = () => {
    setContext(originalContext);
  };
  //#endregion

  //#region 页面交互,包含页面交互数据，用于频繁的变更还有页面交互逻辑
  const [interactiveData, setInteractiveData] = useState('');
  // 跳转配置
  const jumpToConfig = () => {
    Taro.navigateTo({
      url: '/pages/config/index',
    });
  };

  // 扫码录入
  const [code, setCode] = useState('');
  useEffect(() => {
    if (code === '') return;

    console.log('code', code);
  }, [code]);

  //#endregion

  return (
    <View className='index'>
      <View>{getEnv}</View>
      <View>{'登录信息:' + logininfo() + '\n'}</View>
      <View>{'扫码信息:' + code + '\n'}</View>
      <Scanner className='tt' title='扫码录入' onScanCode={setCode} />
      <Button className='btn' onClick={jumpToConfig}>
        进入配置页
      </Button>
    </View>
  );
};

export default Index;
