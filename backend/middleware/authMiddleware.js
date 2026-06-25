import jwt from "jsonwebtoken";

const protect = async (
  req,
  res,
  next
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {
    token =
      req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid Token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token");
  }
};

export default protect;