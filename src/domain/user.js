import userService from "../services/users";
require("babel-polyfill");

const exist = (username, password) => {
    return userService.exist(username, password);
};

const get = (username, password) => {
    return userService.get(username, password);
};

const save = async data => {
    return userService.save(data);
};

export default { exist, get, save };
