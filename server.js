import { users, posts} from './database/BlogProject.js'
import express from 'express';
import cors from 'cors'
import bcrypt from "bcryptjs";
import { ObjectId } from 'mongodb';
const salt = bcrypt.genSaltSync(10);
const app = express()
const port = 8800

app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'));


app.get('/', async(req,res)=>{
    const collection  = await posts();
    const blogs = await collection.aggregate([{$lookup:{from:'users',localField:'user_id',foreignField:'_id', as:'user'}},{$project:{'user.password':0}}]).toArray();
    res.render('Index', {blogs})
})

app.get('/post',async (req, res) => {
    res.render('PostForm')
})

app.post('/post/new',async (req, res) => {
    const data = req.body
    const collection  = await posts();
    const acknowledged  = await collection.insertOne(data)
    if(acknowledged){
        res.status(200).json({msg:'post created', success:true})
    }
    else{
        res.status(401).json({msg:'error', success:false})
    }
})

app.get('/user/id=:id/post',async (req, res) => {
    const { id } = ( req.params )
    const post_collection  = await posts();
    const user_collection  = await users();
    const post  = await user_collection.findOne({_id:new ObjectId(id)})
    const user_post = await post_collection.aggregate([{$lookup:{from:'users',localField:'user_id',foreignField:'_id', as:'user'}},{$unwind:'$user'},{$match:{'user._id':new ObjectId(id)}},{$project:{'user.password':0}}]).toArray();
    console.log(user_post)
    res.render('UserPost', {user_post})
})

app.get('/loginSignup', (req, res) => {
    res.render('LoginPage')
})

app.get('/login', (req, res) => {
    res.render('Login')
})

app.get('/signup', (req, res) => {
    res.render('Signup')
})

app.post('/signup', async (req, res)=>{
    const {email, password}  = req.body
    console.log(req.body)
    const collection  = await users();
    const exist  = await collection.findOne({email})
    if(exist){
        return res.status(200).json({msg:"User Exist", success:false})
    }else{
        const hashpassword = bcrypt.hashSync(password, salt);
        const response =  await collection.insertOne({ email: email, password:hashpassword})
        if(response.acknowledged){
            return res.status(200).json({msg:"User Creation Successfull", success:true})
        }
        else{
            return res.status(400),json({msg:"Invalid Data", success:false})
        } 
    }
})

app.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const collection  = await users();
    const exist  = await collection.findOne({email})
    if(exist){
        const checkPassword = bcrypt.compareSync(password, exist.password);
        if (checkPassword){
            return res.status(200).json({msg:"Login Successfull", success:true, data:exist})
        }
        else{
            return res.status(401).json({msg:"Invalid Credentails", success:false})
        }
    }
    else{
        return res.status(401).json({msg:"Invalid Credentails", success:false})
    }
})


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})