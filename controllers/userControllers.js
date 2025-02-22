import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import { users, posts} from '../database/BlogProject.js'


const register_page = async(req, res)=>{
    res.render('Signup')
}

const register_user = async(req, res)=>{
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
}

const update_user = async(req, res)=>{
    
}

const delete_user = async(req, res)=>{

}

const login_user = async(req, res)=>{
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
}

const login_page = async(req, res)=>{
    res.render('Login')
}


export {
    register_page,
    register_user,
    //
    login_page,
    login_user,
    //
    update_user,
    delete_user,
}