import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';

import {createSlice} from '@reduxjs/toolkit';

interface Normal {
  id: string;
  name: string;
}
interface NormalState {
  data: Normal[];
}

// 使用该类型定义初始 state
const initialState: NormalState = {
  data: [],
};

const normalSlice = createSlice({
  name: 'normal',
  initialState,
  reducers: {
    // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
    // 并不是真正的改变状态值，因为它使用了 Immer 库
    // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
    // 不可变的状态
    setStoreNormal: (state, action: PayloadAction<Normal[]>) => {
      return {...state, data: action.payload};
    },
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const {setStoreNormal} = normalSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectOperator = (state: RootState) => state.normal.data;

export default normalSlice.reducer;

const a: NormalResponse
