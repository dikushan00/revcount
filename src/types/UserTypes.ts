
export type ProfileType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    organizationId: number | null;
    roles?: RoleType[]
    avatar?: string | null
};
export type RoleType = {
    id: number
    name: string
}
export type LoginType = {
    email: string
    password: string
}