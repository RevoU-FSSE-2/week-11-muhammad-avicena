const jwt = require("jsonwebtoken");
const StandardError = require("../utils/constant/standardError");
const { JWT_SIGN } = require("./config/jwtConfig.js");

const userAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new StandardError({ status: 401, message: "Unauthorized" });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      console.log("Verified user:", decodedToken);
      next();
    } catch (error) {
      next(error);
    }
  }
};

const authorizationMiddleware = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new StandardError({ status: 401, message: "Unauthorized" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      if (allowedRoles.includes(decodedToken.role)) {
        next();
      } else {
        throw new StandardError({ status: 401, message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }
};

const adminAuthorization = authorizationMiddleware(["admin", "manager"]);
const managerAuthorization = authorizationMiddleware(["manager"]);

module.exports = {
  userAuthentication,
  adminAuthorization,
  managerAuthorization
};
