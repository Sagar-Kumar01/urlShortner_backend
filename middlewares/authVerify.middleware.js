import jwt from 'jsonwebtoken';

export default async function authVerifyMiddleware(req, res, next) {
  // Add authentication logic here
  if (!req.cookies || !req.cookies.token) {
    next();
  } else {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  }
}
