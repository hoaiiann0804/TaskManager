const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const authMiddleware = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const token = req.cookies.accessToken;
    //lưu ý : cookie không nămf trong req.headers.authorization
    // if (!authHeader || !authHeader.startsWith('Bearer')) {
    //     return res.status(401).json({ message: 'Not Authorized' });
    // }
    if(!token) 
    {
        return res.status(401).json({ message: 'Not Authorized' });
    }
    // const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
