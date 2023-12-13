import {Component, PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import {updateLoginState} from '@/store/login';
import {initialStoreLocalConfig} from '@/store/localConfig';
import store from '@/store/index';

import './app.scss';

class App extends Component<PropsWithChildren> {
  // eslint-disable-next-line react/sort-comp
  timer: NodeJS.Timeout;

  componentDidMount() {
    store.dispatch(initialStoreLocalConfig());
  }

  componentDidShow() {
    // 在组件的生命周期方法中调用 SplashScreen.hide() 来隐藏启动屏幕
    SplashScreen.hide();

    // 更新登录状态
    store.dispatch(updateLoginState());

    this.timer = setInterval(() => {
      store.dispatch(updateLoginState());
    }, 3600 * 1000);

    setTimeout(() => {
      console.log('获取全局信息');
    }, 500);
  }

  componentDidHide() {
    clearInterval(this.timer);
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
export default App;
