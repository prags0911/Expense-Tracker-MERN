import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. No token provided.",
      });
    }

    // Expected format: Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    // Store decoded user data
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default verifyToken;