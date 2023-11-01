import { Component, PropsWithChildren } from 'react'
import {Provider} from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';

import { updateLoginState } from '@/store/login';
import {initialStoreLocalConfig} from '@/store/localConfig';
import store from '@/store/index';

import './app.scss'

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    store.dispatch(updateLoginState());
    store.dispatch(initialStoreLocalConfig())
  }

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render ()  {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
export default App
