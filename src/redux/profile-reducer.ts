import {InferActionsTypes, ThunkType} from "./store-redux";
import {ProfileType, UserType} from "../types/userTypes";

const initialState = {
    profile: null as ProfileType | null,
    contacts: null as UserType[] | null,
    isFetching: false
};

type ProfileInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsProfile>;
type GetThunkType = ThunkType<ActionsType>;

export const profileReducer = (
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
        case "REVCOUNT/PROFILE/SET_CONTACTS": {
            return {
                ...state,
                contacts: action.contacts,
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
    setContacts: (contacts: UserType[] | null) =>
        ({type: "REVCOUNT/PROFILE/SET_CONTACTS", contacts} as const),
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
