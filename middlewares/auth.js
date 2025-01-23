const users = {
    [process.env.VALID_USER1]: process.env.PASSWORD_USER1,
    [process.env.VALID_USER2]: process.env.PASSWORD_USER2,
    [process.env.VALID_USER3]: process.env.PASSWORD_USER3
  };
  
  const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ success: false, message: 'Access denied' });
  
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
  
    if (users[username] && users[username] === password) {
      req.userId = username;
      next();
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  };
  
  module.exports = basicAuth;
  