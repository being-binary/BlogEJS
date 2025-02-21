import { users, posts} from './database/BlogProject.js'
import express from 'express';
import cors from 'cors'
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const app = express()
const port = 8800

app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'));


const blogs = [{
    "title": "testTitle",
    "content": "this is a test Title",
    "date_posted": "12-12-1999",
    "author": "user_id"
  },
  {
    "title": "testTitle",
    "content": "this is a test Title",
    "date_posted": "12-12-1999",
    "author": "user_id"
  }]


app.get('/', async(req,res)=>{
    const collection  = await posts();
    // const blogs = await collection.find().limit(10)
    res.render('Index', {blogs})
})


app.post('/post/new',async (req, res) => {
    const data = req.body
    const collection  = await posts();
    const acknowledged  = await collection.insertOne(data)
    if(acknowledged){
        res.status(200).render('Index', {blogs})
    }
    else{
        res.status(401).json({msg:'error', success:false})
    }
})

app.get('/loginSignup', (req, res) => {
    res.render('LoginPage')
})

app.post('/signup', async (req, res)=>{
    const {email, password}  = req.body
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