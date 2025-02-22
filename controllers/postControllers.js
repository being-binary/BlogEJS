import { ObjectId } from 'mongodb';
import { users, posts } from '../database/BlogProject.js'

const create_post = async (req, res) => {
    const data = req.body
    const collection = await posts();
    const acknowledged = await collection.insertOne(data)
    if (acknowledged) {
        res.status(200).json({ msg: 'post created', success: true })
    }
    else {
        res.status(401).json({ msg: 'error', success: false })
    }
}

const create_post_page = async (req, res) => {
    res.render('post/PostForm')
}

const update_post = async (req, res) => {

}

const delete_post = async (req, res) => {

}

const get_user_posts = async (req, res) => {
    const { id } = (req.params)
    const post_collection = await posts();
    const user_post = await post_collection.aggregate([{ $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }, { $match: { 'user._id': new ObjectId(id) } }, { $project: { 'user.password': 0 } }]).toArray();
    res.render('UserPost', { user_post })
}

const view_post = async (req, res)=>{
    const { id } = (req.params)
    const post_collection = await posts()
    const out_post = await post_collection.aggregate([{ $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }, { $match: { '_id': new ObjectId(id) } }, { $project: { 'user.password': 0 } }]).toArray();
    const post = out_post[0]
    res.render('post/ViewPost', {post} )
}
export {
    create_post,
    create_post_page,
    //
    get_user_posts,
    delete_post,
    update_post,
    view_post,
}