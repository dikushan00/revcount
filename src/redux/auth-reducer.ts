import {InferActionsTypes, ThunkType} from "./store-redux"
import {RoleType} from "../types/userTypes";

const initialState = {
    isAuth: false as boolean,
    token: null as string | null,
    roles: null as RoleType[] | null,
    userId: null as number | null
}

type AuthInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsAuth>
type GetThunkType = ThunkType<ActionsType>

export const auth_reducer = (state = initialState, action: ActionsType): AuthInitialStateType => {

    switch (action.type) {

        case 'REVCOUNT/AUTH/SET_NEW_AUTH': {
            return {
                ...state,
                isAuth: action.isAuth,
                roles: action.roles,
                token: action.token,
                userId: action.userId
            }
        }
        default:
            return state
    }
}

export const actionsAuth = {
    setNewAuth: (token: string, isAuth: boolean, roles: RoleType[] | null, userId: number) => ({
        type: 'REVCOUNT/AUTH/SET_NEW_AUTH',
        token,
        isAuth,
        roles,
        userId
    } as const),
    logout: () => ({
        type: 'REVCOUNT/AUTH/SET_NEW_AUTH',
        token: null,
        isAuth: false,
        roles: null,
        userId: null
    } as const)
}

export const checkAuthMe = (): GetThunkType => async (dispatch) => {
    // const res = await AuthAPI.checkAuthMe()
    // if (!res.error) {
    //     let {roles,id} = res
    //     dispatch(actionsAuth.setNewAuth(localStorage?.getItem("client_token") || "", true, roles, id))
    // }
}