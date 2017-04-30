import userService from "../services/users";
require("babel-polyfill");

const exist = (username, password) => {
    return userService.exist(username, password);
};

const get = (email, password) => {
    return userService.get(email, password);
};

const save = async data => {
    return userService.save(data);
};

const activate = async data => {
    return userService.activate(data);
};

export default { exist, get, save, activate };
