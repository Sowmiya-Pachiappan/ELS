const isAdmin = (req, res, next) => {
  console.log(req.user && req.user.isAdmin);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export default isAdmin;
