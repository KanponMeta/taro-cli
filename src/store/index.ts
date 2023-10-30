import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './login'
import localConfigSlice from './localConfig'

const store = configureStore({
  reducer: {
    login: loginSlice,
    localConfig: localConfigSlice
  }
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;
