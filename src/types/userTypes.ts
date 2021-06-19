
export type ProfileType = {
    id?: number;
    user_id: number;
    inviteId?: number;
    balance?: number;
    first_name: string;
    last_name?: string;
    username?: string;
    email?: string;
    role?: RoleType[]
    avatar?: string | null
};
export type RoleType = {
    id: number
    name: string
}
export type UserType = {
    user_id: number,
    username: string,
    isOwner?: boolean
    role: RoleType,
    first_name: string,
    avatar?: string,
    last_name?: string
}
export type LoginType = {
    username: string
    password: string
}
export type SignUpType = {
    username: string
    first_name: string
    password: string
}