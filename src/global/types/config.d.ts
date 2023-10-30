export type Platform =
  | 'weapp'
  | 'lark'
  | 'h5'
  | 'pda'
  | 'androidMobile'
  | 'androidPad'
  | 'iosMobile'
  | 'iosPad';

export interface Config {
  platform: Platform;
}
