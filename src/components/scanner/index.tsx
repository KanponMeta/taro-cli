import Taro from '@tarojs/taro';
import {useEffect, useState} from 'react';
import classNames from 'classnames';

import {useAppSelector} from '@/store/hooks';
import {selectIsPDA} from '@/store/localConfig';

import type {BaseComponent} from '../base/type';

import {Button, Input, Text, View} from '@tarojs/components';

interface ScannerProps extends BaseComponent {
  title: string;
  onScanCode: (code: string) => void;
}

const Scanner = (props: ScannerProps) => {
  const isPDA = useAppSelector(selectIsPDA);
  const [code, setCode] = useState<string>('');

  //#region 扫描
  // Update the content when the code changes
  useEffect(() => {
    if (code === '') return;

    props.onScanCode(code);
    setCode('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // 手机摄像头扫描
  const phoneScanAction = () => {
    Taro.scanCode({
      onlyFromCamera: true,
      success: res => {
        setCode(res?.result);
      }
    }).catch(err => {
      console.log(err);
    });
  };
  //#endregion
  const rootClass = classNames('scanner', props.className);

  return (
    <View className={rootClass}>
      {isPDA ? (
        <Button className={rootClass+ "-input"}>
          <Input
            type='text'
            placeholder={props.title}
            style={{
              color: '#fff',
            }}
            value=''
            focus
            onBlur={e => {
              setCode(e.detail.value);
            }}
          />
        </Button>
      ) : (
        <Button className={rootClass+ "-input"} onClick={phoneScanAction}>
          <Text className={rootClass+ "-input-text"} style={{color: '#707070'}}>{props.title}</Text>
        </Button>
      )}
    </View>
  );
};

export default Scanner;
