
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
    id: number,
    name: string,
    avatar: string,
    isOwner?: boolean
    role: RoleType,
    firstName: string,
    lastName: string
}
export type LoginType = {
    email: string
    password: string
}
export type SignUpType = {
    email: string
    password: string
}