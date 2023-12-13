import {ComponentType} from 'react';
import type {
  PickerSelectorProps,
  PickerMultiSelectorProps,
  PickerTimeProps,
  PickerDateProps,
  PickerRegionProps,
} from '@tarojs/components';
import {View, Picker as TaroPicker} from '@tarojs/components';
import {AtIcon} from 'taro-ui';

import './index.scss';

const Picker: ComponentType<
  (
    | PickerMultiSelectorProps
    | PickerTimeProps
    | PickerDateProps
    | PickerRegionProps
    | PickerSelectorProps
  ) & {content: string}
> = props => {
  return (
    <View className='picker'>
      <TaroPicker {...props}>
        <View className='picker-content'>
          <View className='picker-content-text'>{props.content}</View>
          <AtIcon value='chevron-down' size='20' color='#a8a8a8' />
        </View>
      </TaroPicker>
    </View>
  );
};

export default Picker;
