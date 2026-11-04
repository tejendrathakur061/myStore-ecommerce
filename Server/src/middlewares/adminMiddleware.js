const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Please Login First",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin Access Denied",
    });
  }
  next();
};

module.exports = adminMiddleware;
