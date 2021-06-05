import {
    applyMiddleware,
    combineReducers,
    createStore,
    compose, Action
} from 'redux'
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import appReducer from './app-reducer';
import {profile_reducer} from "./profile_reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    app: appReducer,
    profile: profile_reducer,
    auth: authReducer,
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

/** to get reducers actions type */
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

/** to get thunk type */
export type ThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A >

/**
 * add redux thunk middleWare
 * and create store
 */

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store