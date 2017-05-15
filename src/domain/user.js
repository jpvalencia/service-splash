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

const activate = (email, password, token) => {
    return userService.activate(email, password, token);
};

const validateTokenActivateAccount = (email, token) => {
    return userService.validateTokenActivateAccount(email, token);
};

export default { exist, get, save, activate, validateTokenActivateAccount };
