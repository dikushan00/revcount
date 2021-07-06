import {InferActionsTypes, ThunkType} from "./store-redux"
import {RoleType} from "../types/userTypes";
import {AuthAPI} from "../api/AuthAPI";
import {actionsProfile} from "./profile-reducer";

const initialState = {
    isAuth: false as boolean,
    token: null as string | null,
    roles: null as RoleType | null,
    userId: null as number | null,
    isFirstEnter: false,
    isFetching: false
}

type AuthInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsAuth>
type GetThunkType = ThunkType<ActionsType>;

export const auth_reducer = (state = initialState, action: ActionsType): AuthInitialStateType => {

    switch (action.type) {

        case 'REVCOUNT/AUTH/SET_NEW_AUTH': {
            return {
                ...state,
                isAuth: true,
                roles: action.roles,
                token: action.token,
                //@ts-ignore
                isFirstEnter: action.isFirstEnter,
                userId: action.userId
            }
        }
        case 'REVCOUNT/AUTH/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state
    }
}

export const actionsAuth = {
    setNewAuth: (token: string, roles: RoleType | null, userId?: number | null, isFirstEnter?: boolean) => ({
        type: 'REVCOUNT/AUTH/SET_NEW_AUTH',
        token,
        roles,
        userId: userId || null,
        isFirstEnter: isFirstEnter || false
    } as const),
    logout: () => ({
        type: 'REVCOUNT/AUTH/SET_NEW_AUTH',
        token: null,
        isAuth: false,
        roles: null,
        userId: null
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: 'REVCOUNT/AUTH/TOGGLE_IS_FETCHING',
        isFetching
    } as const)
}

export const checkAuthMe = (): GetThunkType => async (dispatch) => {
    try {
        dispatch(actionsAuth.setIsFetching(true))
        let response = await AuthAPI.checkAuth()
        if (response && response.user_id) {
            let token = localStorage.getItem("token")
            token && dispatch(actionsAuth.setNewAuth(token, null, response.user_id))
            //@ts-ignore
            dispatch(actionsProfile.setProfile(response))
            dispatch(actionsAuth.setIsFetching(false))
        }
    } catch (e) {
        dispatch(actionsAuth.setIsFetching(false))
        console.log(e)
    }
}