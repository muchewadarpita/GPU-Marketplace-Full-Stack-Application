import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, `dcc67318a1c4d7d78dcd914b1b1679fbf54ba410ac7140d71169a3960f837e596faf7414774e90a8f43fc1a51582309a2954c63e9f2aeae2aee9622e9cc8f8fc3dd38c429e12b778295edac06ffc85cfc567f5a7e2a468204b36ade279ad0333f51dde66f7d07d96a86fb07f5c2478899e538d0ddc2bee6395b867bceef76b146d8638ba9b1ea236e74b71887c0bc9bb624c03707d77c0f5c4e7355f7848c87e1014967aa7d0e1ba1cd12e92ba14bdf8eb03339ba60f7f645bb72deff9d0a8629db283a3f401fadd2988ac0b69ea96f5081c133331c7a327b58e805cf7ac2aedb37b78501eefaf3290c07dbce02de71b8a31cdf9a2f47ac56840f71a7d85ceab`);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}