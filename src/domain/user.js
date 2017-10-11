import userService from "../services/users";

require("babel-polyfill");


const exist_email = (email) => {
    return userService.exist_email(email);
};

const save_email = (email) => {
    return userService.save_email(email);
};

export default { exist_email, save_email };
