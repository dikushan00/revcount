import {InferActionsTypes, ThunkType} from "./store-redux";
import {ProfileType} from "../types/UserTypes";

const initialState = {
    profile: null as ProfileType | null,
    isFetching: false
};

type ProfileInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsProfile>;
type GetThunkType = ThunkType<ActionsType>;

export const profile_reducer = (
    state = initialState,
    action: ActionsType
): ProfileInitialStateType => {

    switch (action.type) {

        case "REVCOUNT/PROFILE/SET_PROFILE": {
            return {
                ...state,
                profile: action.profile,
            };
        }
        case "REVCOUNT/PROFILE/TOGGLE_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return {...state}
    }
}

export const actionsProfile = {
    setProfile: (profile: ProfileType) =>
        ({type: "REVCOUNT/PROFILE/SET_PROFILE", profile} as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({
            type: "REVCOUNT/PROFILE/TOGGLE_FETCHING",
            isFetching,
        } as const),
};

export const getProfile = (id: number): GetThunkType => async (
    dispatch
) => {
    // await ProfileAPI.getProfile(id).then((res) => {
    //     if (res && !res.error)
    //         dispatch(actionsProfile.setProfile(res));
    // });
};
