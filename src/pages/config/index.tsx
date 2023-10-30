import {useEffect, useState} from 'react';

import type {Config, Platform} from '@/global/types/config';

import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {selectLocalConfig, setStoreLocalConfig} from '@/store/localConfig';

import {AtRadio} from '@/components/kanpon-ui/index';
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
      dispatch(setStoreLocalConfig(config));
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
