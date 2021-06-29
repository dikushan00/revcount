import {InferActionsTypes, ThunkType} from "./store-redux"
import {checkAuthMe} from "./auth-reducer";

let initialState = {
    initialized: false, //initialize app
    isModalMode: false
}

export type AppInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsApp>
type GetThunkType = ThunkType<ActionsType>

export const app_reducer = (state = initialState, action: ActionsType): AppInitialStateType => {

    switch (action.type) {

        case 'REVCOUNT/APP/INIT': {
            return {
                ...state,
                initialized: true
            }
        }
        case 'REVCOUNT/APP/SET_INIT': {
            return {
                ...state,
                initialized: action.isInit
            }
        }
        case 'REVCOUNT/APP/SET_IS_MODAL_MODE': {
            return {
                ...state,
                isModalMode: !state.isModalMode
            }
        }
        default:
            return state
    }
}

export const actionsApp = {
    initialize: () => ({
        type: 'REVCOUNT/APP/INIT'
    } as const),
    setInitialized: (isInit: boolean) => ({
        type: 'REVCOUNT/APP/SET_INIT',
        isInit
    } as const),
    toggleIsModalMode: () => ({
        type: 'REVCOUNT/APP/SET_IS_MODAL_MODE'
    } as const)
}

/**
 *   function to initialize app
 *  Passes through all promises and initializes app
 */
export const init = (): GetThunkType => async (dispatch, getState) => {
    let isAuth = getState().auth.userId
    if (isAuth) return
    let checkAuth = dispatch(checkAuthMe()).catch(() => {
        return null
    })
    Promise.all([checkAuth])
        .then(() => {
            dispatch(actionsApp.initialize())
        })
}
