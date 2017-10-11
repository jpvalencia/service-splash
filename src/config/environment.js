exports.default = {
  DB_USER: process.env.DB_USER || "valencia",
  DB_PASSWORD: process.env.DB_PASSWORD || "valencia",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "3306",
  DB_NAME: process.env.DB_NAME || "hipopo"
};
module.exports = exports["default"];