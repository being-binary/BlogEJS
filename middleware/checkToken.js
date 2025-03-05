import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';  // ES6 import syntax
dotenv.config();

const TOKEN_KEY = process.env.EXPRESS_TOKEN_KEY || ''

const checkToken =  async (req, res, next) => {
    let token = req.session.jwt;
    try{
        const decode = jwt.verify(token, TOKEN_KEY)
        req.uid = decode._id;
        next()
    }catch (error){
        return res.status(401).json({msg:'unauthorized', success:false})
    }
}


export default checkToken