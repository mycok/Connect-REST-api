const userModelSanitizer = (req, res, next) => {
  const { body } = req;
  const userProperties = Object.keys(body);
  const requiredNumberOfProperties = 3;

  if (userProperties.length !== requiredNumberOfProperties) {
    return res.status(400).json({
      error: 'User object requires only three properties',
      sample: {
        name: 'sample-name',
        email: 'sample-email',
        password: 'sample-password',
      },
    });
  }

  return next();
};

export default userModelSanitizer;
