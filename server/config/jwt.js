const jwt = require("jsonwebtoken");

const configJWT = Object.freeze({
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE || 60*60, //1 hours
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "gaming_social",
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 7*24*60*60, // 7 days
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "gaming_social"
});

const generateDataToken = async (payload) => {
  const generate = await Promise.all([
    generateToken(payload, configJWT.accessTokenSecret, configJWT.accessTokenLife),
    generateToken(payload, configJWT.refreshTokenSecret, configJWT.refreshTokenLife),
  ]);

  return {
    accessToken: generate[0],
    refreshToken: generate[1],
    expiredTime: Date.now() + (configJWT.accessTokenLife*1000),
  };
};

/*
  Generate token with option (access or refresh)
  */
const generateToken = (payload, secretSignature, tokenLife) => {
  return jwt.sign({ payload: payload }, secretSignature, {
    algorithm: "HS256",
    expiresIn: tokenLife,
  });
};

/*
  Exe verify token in type (access or refresh)
  */
const verifyToken = (token, type) => {
  let secretKey = type === "access" ? configJWT.accessTokenSecret : configJWT.refreshTokenSecret;
  return jwt.verify(token, secretKey);
};
module.exports = { generateDataToken, generateToken, verifyToken, configJWT };
