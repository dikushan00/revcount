//check password to valid
export const checkPassword = (password: string) => {
    let passw = /^[A-Za-z]\w{6,15}$/;
    return !!password.match(passw);
}