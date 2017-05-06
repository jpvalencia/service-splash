import userService from "../services/users";

require("babel-polyfill");

const exist = (username, password) => {
    return userService.exist(username, password);
};

const get = (email, password) => {
    return userService.get(email, password);
};

const save = (email, password) => {
    return userService.save(email, password);
};

const activate = (email, password) => {
    return userService.activate(email, password);
};

export default { exist, get, save, activate };
