import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {login} from "@/service/login";

interface Login {
  username: string;
  password: string;
}

interface LoginState {
  loading: boolean;
  error: string;
  data: Login;
}

// 使用该类型定义初始 state
const initialState: LoginState = {
  loading: false,
  error: "",
  data: {
    username: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
    // 并不是真正的改变状态值，因为它使用了 Immer 库
    // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
    // 不可变的状态
    setStoreLogin: (state, action: PayloadAction<Login>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLoginState.pending, (state) => {
        state.loading = true;
        console.log("loading")
      })
      .addCase(updateLoginState.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data as unknown as Login;
        console.log("fulfilled", action.payload.data)
      })
      .addCase(updateLoginState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "unknown error";
        console.log("rejected", action.error.message)
      });
  },
});

export const updateLoginState = createAsyncThunk(
  "login/updateLoginState",
  async () => {
    const response = login();
    return response
  }
);

// 每个 case reducer 函数会生成对应的 Action creators
export const { setStoreLogin } = loginSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectLogin = (state: RootState) => state.login.data;

export default loginSlice.reducer;
