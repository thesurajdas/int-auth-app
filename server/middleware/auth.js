import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({
      error: true,
      message: "Access Denied! No Token Provided.",
    });
  }
  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = tokenDetails;
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Access Denied! Invaild Token.",
    });
  }
};

export default auth;
