//check password to valid
export const checkPassword = (password: string) => {
    let pass = /^[A-Za-z0-9]\w{7,15}$/;
    return !!password.match(pass);
}