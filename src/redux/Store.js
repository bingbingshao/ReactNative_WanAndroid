/**
 * @author bingPo
 * @date 2020-04-04 09:36
 * @name: Store
 * @description：store 与中间件 saga
 *  store 存储整个项目的状态
 *  saga 异步事假流
 */
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';
import {middleware} from '../nav/Navigation';

//添加中间件saga，支持异步操作
const sagaMiddleware = createSagaMiddleware();

export default (initialAppState) => {
    const store = createStore(
        reducer,
        initialAppState,
        applyMiddleware(
            // loginMiddleware,
            sagaMiddleware,
            middleware,
        ),
    );
    sagaMiddleware.run(saga);
    return store;
}
