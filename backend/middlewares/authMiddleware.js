const jwt=require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// exports.requireAuth = (req, res, next) => {
//     const authHeader=req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded; // Attach user info to request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error('JWT verification error:', error);
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// }
exports.requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
       console.log(req);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.userId,        // 👈 normalize it
            isAdmin: decoded.isAdmin,
        };
        next();
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
