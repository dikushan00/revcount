import {InferActionsTypes, ThunkType} from "./store-redux"

let initialState = {
    initialized: false, //initialize app
    isModalMode: false
}

export type AppInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsApp>
type GetThunkType = ThunkType<ActionsType>

export const app_reducer = (state = initialState, action: ActionsType):AppInitialStateType => {

    switch (action.type) {

        case 'REVCOUNT/APP/INIT': {
            return {
                ...state,
                initialized: true
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
    toggleIsModalMode: () => ({
        type: 'REVCOUNT/APP/SET_IS_MODAL_MODE'
    } as const)
}

/**
 *   function to initialize app
 *  Passes through all promises and initializes app
 */
export const init = (): GetThunkType => async (dispatch) => {
    Promise.all([])
        .then(() => {
            dispatch(actionsApp.initialize())
        })
}
