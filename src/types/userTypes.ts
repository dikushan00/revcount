
export type ProfileType = {
    id: number;
    inviteId: number;
    balance?: number;
    firstName: string;
    lastName: string;
    email: string;
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
    name: string,
    avatar: string,
    isOwner?: boolean
    role: RoleType,
    first_name: string,
    lastName: string
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