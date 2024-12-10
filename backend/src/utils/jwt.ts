import jwt from 'jsonwebtoken';

export const generateJwt = () => {
  const data = {
    name: 'Luciano',
    credit_card: '1231231231321',
    password: 'password',
  };
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '6m',
  });
  return token;
};
