import userService from "../services/users";

require("babel-polyfill");

const exist = (username, password) => {
    return userService.exist(username, password);
};

const exist_email = (username) => {
    return userService.exist_email(username);
};

const get = (email, password) => {
    return userService.get(email, password);
};

const save = (email, password) => {
    return userService.save(email, password);
};

const save_email = (email) => {
    return userService.save_email(email);
};

const activate = (email, password, token) => {
    return userService.activate(email, password, token);
};

const validateTokenActivateAccount = (email, token) => {
    return userService.validateTokenActivateAccount(email, token);
};

export default { exist, exist_email, get, save, save_email, activate, validateTokenActivateAccount };
