import Taro from '@tarojs/taro';

import {useEffect, useState} from 'react';
import {useAppSelector} from '@/store/hooks';
import {selectLogin} from '@/store/login';

import {View, Text, Button} from '@tarojs/components';
import Scanner from '@/components/scanner';
import Picker from '@/components/Picker';
import DatePicker from '@/components/DatePicker';

import './index.scss';
import dayjs from 'dayjs';

const Index = () => {
  // 环境信息
  const getEnv = (): string => {
    if (process.env.TARO_ENV !== 'rn')
      return `当前环境: ${process.env.TARO_ENV}`;

    try {
      const deviceInfo = Taro.getSystemInfoSync();
      return `当前环境: ${deviceInfo?.platform}`;
    } catch (e) {
      console.log(e);
    }

    return '';
  };

  // 登录信息
  const login = useAppSelector(selectLogin);
  const logininfo = (): string => {
    return JSON.stringify(login);
  };

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

  // picker
  const pickerSelector = ['选项一', '选项二', '选项三'];
  const [pickerContent, setPickerContent] = useState('');

  // DatePacker
  const [pickerDate, setPickerDate] = useState('');

  return (
    <View className='index'>
      <View>{getEnv()}</View>
      <View>{'登录信息:' + logininfo() + '\n'}</View>
      <View>{'扫码信息:' + code + '\n'}</View>
      <Scanner className='tt' title='扫码录入' onScanCode={setCode} />
      <Button className='btn' onClick={jumpToConfig}>
        进入配置页
      </Button>
      <Picker
        mode='selector'
        content={pickerContent}
        range={pickerSelector}
        placeholder='请选择'
        onChange={e => {
          setPickerContent(pickerSelector[e.detail.value]);
        }}
      ></Picker>
      <DatePicker value={dayjs(pickerDate)} dayRange={10} onDateChange={(value) => {
        setPickerDate(dayjs(value).format('YYYY-MM-DD HH:mm:ss'));
      }}></DatePicker>
    </View>
  );
};

export default Index;
