import {posts} from './database/BlogProject.js'
import express from 'express';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import path from 'path'
const monogdbSession = ConnectMongoDBSession(session);
import dotenv  from 'dotenv';
dotenv.config();

import Toastify from 'toastify-js'
import { fileURLToPath } from 'url';

// Replicate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const port = 8800
app.use(cors())
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(path.resolve(), 'public')));



const store = monogdbSession({
    uri : process.env.EXPRESS_MONGODB_DATABASE_CONNECTION_STRING,
    // uri : 'mongodb://localhost:27017/BlogProject',
    collection: 'loginSession'
}, (error) => {
    if (error) {
        console.error('Error connecting to MongoDB:', error);
    } else {
        console.log('Connected to MongoDB');
    }
});

app.use(session({
    secret : process.env.EXPRESS_SESSION_KEY,
    resave : process.env.EXPRESS_SESSION_RESAVE === 'false'? false : true,
    saveUninitialized: process.env.EXPRESS_SESSION_SAVEUNINITIALIZED === 'false'? false : true,
    store : store,
    cookie:   { 
        httpOnly: process.env.EXPRESS_SESSION_COOKIE_HTTPONLY === 'false'? false : true, // Make cookie accessible only to the server, not JavaScript
        secure: process.env.EXPRESS_SESSION_COOKIE_SECURE === 'false'? false : true,  // Set to true in production when using HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day expiration time for the session cookie
        sameSite: process.env.EXPRESS_SESSION_COOKIE_SAMESITE === 'false'? false : true // CSRF protection
      }
}))


app.get('/', async(req,res)=>{
    const collection  = await posts();
    const blogs = await collection.aggregate([{$lookup:{from:'users',localField:'user_id',foreignField:'_id', as:'user'}},{$project:{'user.password':0}},{$sort:{ _id: -1}}]).toArray();
    res.render('Index', {blogs, isAuth:req.session.isAuth, data: { user_name: req.session.uname  }} )
})

app.use('/post',postRoutes)

app.use('/user',userRoutes)


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})

// export default app