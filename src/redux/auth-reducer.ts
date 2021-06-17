import {InferActionsTypes} from "./store-redux"
import {RoleType} from "../types/userTypes";

const initialState = {
    isAuth: false as boolean,
    token: null as string | null,
    roles: null as RoleType | null,
    userId: null as number | null
}

type AuthInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsAuth>

export const auth_reducer = (state = initialState, action: ActionsType): AuthInitialStateType => {

    switch (action.type) {

        case 'REVCOUNT/AUTH/SET_NEW_AUTH': {
            return {
                ...state,
                isAuth: true,
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
    setNewAuth: (token: string, roles: RoleType | null, userId: number) => ({
        type: 'REVCOUNT/AUTH/SET_NEW_AUTH',
        token,
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