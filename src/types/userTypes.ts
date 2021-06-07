
export type ProfileType = {
    id: number;
    inviteId: number;
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
    firstName: string,
    lastName: string
}
export type LoginType = {
    email: string
    password: string
}