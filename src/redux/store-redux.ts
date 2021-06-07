import {Action, applyMiddleware, combineReducers, createStore, Store} from 'redux'
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import {profileReducer} from "./profile-reducer";
import {composeWithDevTools} from 'redux-devtools-extension'
import {useMemo} from "react";
import {projects_reducer} from "./projects-reducer";
import {app_reducer} from "./app-reducer";
import {auth_reducer} from "./auth-reducer";

let store: Store | undefined
let reducers = combineReducers({
    app: app_reducer,
    profile: profileReducer,
    auth: auth_reducer,
    projects: projects_reducer
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


function initStore(initialState: any) {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleWare))
    )
}

export const initializeStore = (preloadedState: any) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export const useStore = (initialState: any) => {
    return useMemo(() => initializeStore(initialState), [initialState])
}

export default store