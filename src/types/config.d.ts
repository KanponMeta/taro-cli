declare type Platform =
  | 'weapp'
  | 'lark'
  | 'h5'
  | 'pda'
  | 'androidMobile'
  | 'androidPad'
  | 'iosMobile'
  | 'iosPad';

declare interface Config {
  platform: Platform;
}
