import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const accessToken = req.header['Authorization'];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access Denied!'});
  }

  try {
    const decoded = jwt.verify(accessToken.split(" "))[1];
  
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

