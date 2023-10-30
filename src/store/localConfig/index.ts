import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';
import type {Config, Platform} from '@/global/types/config';

import Taro from '@tarojs/taro';

import {configs} from 'src/pages/config/config';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const LOCAL_CONFIG_KEY = 'localConfig';
const initPlatform = (): Platform => {
  switch (process.env.TARO_ENV) {
    case 'weapp':
      return 'weapp';
    case 'lark':
      return 'lark';
    case 'h5':
      return 'h5';
    case 'rn':
      return 'pda';
    default:
      return 'pda';
  }
};

interface LocalConfigState {
  loading: boolean;
  error: string;
  data: Config;
}
// 使用该类型定义初始 state
const initialState: LocalConfigState = {
  loading: false,
  error: '',
  data: configs,
};

const localConfigSlice = createSlice({
  name: LOCAL_CONFIG_KEY,
  initialState,
  reducers: {
    setStoreLocalConfig: (
      state: LocalConfigState,
      action: PayloadAction<Config>,
    ) => {
      Taro.setStorage({
        key: LOCAL_CONFIG_KEY,
        data: action.payload,
      });
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initialStoreLocalConfig.pending, state => {
        state.loading = true;
      })
      .addCase(initialStoreLocalConfig.fulfilled, (state, action) => {
        state.loading = false;
        const localConfig = action.payload.data as unknown as Config;
        state.data = {...localConfig, platform: initPlatform()};
      })
      .addCase(initialStoreLocalConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'unknown error';
      });
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const {setStoreLocalConfig} = localConfigSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectLocalConfig = (state: RootState) => state.localConfig.data;
export const selectIsLocalPlatform = (state: RootState): boolean =>
  state.localConfig.data.platform === 'pda';

export const initialStoreLocalConfig = createAsyncThunk(
  'localConfig/initialStoreLocalConfig',
  async () => {
    return Taro.getStorage({
      key: LOCAL_CONFIG_KEY,
    });
  },
);

export default localConfigSlice.reducer;
