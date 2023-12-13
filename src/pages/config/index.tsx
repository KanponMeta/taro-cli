import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {selectLocalConfig, storageLocalConfig} from '@/store/localConfig';

import { AtRadio } from 'taro-ui'
import {View} from '@tarojs/components';

import './index.scss';

const ConfigPage = () => {
  const originConfig = useAppSelector(selectLocalConfig);
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<Config>(originConfig);

  const handlePlatformChange = (platform: Platform) => {
    const tmpConfig = {...config};
    tmpConfig.platform = platform;
    setConfig(tmpConfig);
  };

  // 退出配置页面
  useEffect(() => {
    return () => {
      dispatch(storageLocalConfig(config));
    };
  });

  return (
    <View className='config'>
      <View className='config-item'>
        <View className='config-item-description'>配置当前设备</View>
        <AtRadio
          options={[
            {label: '苹果手机', value: 'iosMobile'},
            {label: '安卓手机', value: 'androidMobile'},
            {label: 'PDA设备', value: 'pda'},
            {label: '微信小程序', value: 'weapp'},
            {label: '飞书小程序', value: 'lark'},
            {label: '网页', value: 'h5'},

          ]}
          value={config.platform}
          onClick={value => {
            handlePlatformChange(value);
          }}
        />
      </View>
    </View>
  );
};
export default ConfigPage;
