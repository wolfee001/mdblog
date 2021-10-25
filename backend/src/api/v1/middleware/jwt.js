const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let user = {};
  try {
    user = parseToken(req);
  } catch (err) {
    return res.status(err.code).json({ err: err.text });
  }
  req.user = user;
  next();
};

const parseToken = (req) => {
  const authHeader = req.headers.authorization;
  let retVal = null;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new Error({ code: 403, text: 'Token is not valid!' });
      }
      retVal = user;
    });
  } else {
    throw new Error({ code: 401, text: 'You are not authenticated!' });
  }
  return retVal;
};

module.exports = { verifyToken, parseToken };
