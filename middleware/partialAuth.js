import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  // ES6 import syntax
dotenv.config();

const TOKEN_KEY = process.env.EXPRESS_TOKEN_KEY || ''
// Partial authentication middleware
const partialAuth = async (req, res, next) => {
    // Check if the user is authenticated (isAuth flag in session)
    if (req.session.isAuth === true && req.session.jwt) {
        // Check and verify the token if user is authenticated
        return checkToken(req, res, next);  // Pass control to checkToken if authenticated
    } else {
        // If user is not authenticated, continue to the next middleware
        return next();
    }
};

// Token validation function
const checkToken = async (req, res, next) => {
    const token = req.session.jwt;
    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, TOKEN_KEY);
        
        // Successfully decoded the token, add user ID to the request object
        req.uid = decoded._id;
        
        // Call next() to pass control to the next middleware/route handler
        next();
    } catch (error) {
        // Token verification failed
        return res.status(401).json({msg:'Token verification failed:', error:error});
    }
};

export default partialAuth;
