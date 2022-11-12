function authRole(role) {
  return (req, res, next) => {
    console.log(req.body);
    if (req.user.levelOfAccess !== role) {
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

module.exports = { authRole };
