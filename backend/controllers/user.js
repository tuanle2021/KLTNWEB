exports.home = (req, res) => {
  res.status(403).json({
    message: "HELLO WORLD",
    error: "This is a protected route",
  });
};
