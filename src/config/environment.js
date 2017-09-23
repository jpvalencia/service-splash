exports.default = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || "token",
  DB_USER: process.env.DB_USER || "tuto",
  DB_PASSWORD: process.env.DB_PASSWORD || "tuto",
  DB_HOST: process.env.DB_HOST || "tuto",
  DB_PORT: process.env.DB_PORT || "3306",
  DB_NAME: process.env.DB_NAME || "hipopo"
};
module.exports = exports["default"];