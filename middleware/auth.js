const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
module.exports = (req, res, next) => {
    // Get token from the request header
    const token = req.header('x-auth-token');

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token and decode user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded.user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }

        res.status(401).json({ message: 'Token is not valid' });
    }
};

