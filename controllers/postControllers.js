import { ObjectId } from 'mongodb';
import { posts } from '../database/BlogProject.js'


const create_post_page = async (req, res) => {
    res.render('post/PostForm', { isAuth: req.session.isAuth, post: false, update: false, data: { user_name: req.session.uname } })
}

const create_post = async (req, res) => {
    const data = req.body
    data['user_id'] = new ObjectId(req.uid)
    const collection = await posts();
    const acknowledged = await collection.insertOne(data)
    if (acknowledged) {
        res.status(200).json({ msg: 'post created', success: true })
    }
    else {
        res.status(401).json({ msg: 'error', success: false })
    }
}


const update_post_page = async (req, res) => {
    const { id } = (req.params)
    try {
        const post_collection = await posts();
        const post = await post_collection.findOne({ _id: new ObjectId(id) })
        res.render('post/PostForm', { post, isAuth: req.session.isAuth, update: true, data: { user_name: req.session.uname } })
    } catch (error) {
        res.status(404).json({ msg: 'post not found', success: false })
    }
}


const update_post = async (req, res) => {
    const { id } = (req.params)
    const { title, content, tags, date } = req.body
    try {
        const updateObj = {}
        if (title) {
            updateObj.title = title
        }
        if (content) {
            updateObj.content = content
        }
        if (tags) {
            updateObj.tags = tags.split(',')
        }
        const post_collection = await posts();
        const post = await post_collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updateObj, date } })
        console.log('update function', post)
        res.status(200).json({ msg: 'post update succesfully', success: true })
    } catch (error) {
        res.status(404).json({ msg: 'post not found', success: false })
    }
}

const delete_post_page = async (req, res) => {
    res.render('post/ConfirmDelete', { pid: req.params.id, isAuth: req.session.isAuth, data: { user_name: req.session.uname } })
}

const delete_post = async (req, res) => {
    const { id } = req.params;  // Get the ID from the request parameters
    try {
        const post_collection = await posts();  // Get the posts collection
        const acknowledged = await post_collection.deleteOne({ _id: new ObjectId(id) });
        // Check if the deletion was acknowledged and a post was deleted
        if (acknowledged.deletedCount == 1) {
            res.status(200).json({ msg: 'Post delete successfully', success: true });  // Redirect to homepage after successful deletion
        } else {
            // If no post was deleted (e.g., post not found)
            res.status(404).json({ msg: 'Post not found', success: false });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({ msg: 'Server error, could not delete post', success: false, err: error.message });
    }
};

const get_user_posts = async (req, res) => {
    const { id } = (req.params)
    const post_collection = await posts();
    const user_post = await post_collection.aggregate([{ $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }, { $match: { 'user._id': new ObjectId(id) } }, { $project: { 'user.password': 0 } }]).toArray();
    res.render('UserPost', { user_post, isAuth: req.session.isAuth, data: { user_name: req.session.uname } })
}

const view_post = async (req, res) => {
    const { id } = (req.params)
    const uid = req.uid
    const post_collection = await posts()
    const out_post = await post_collection.aggregate([{ $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }, { $match: { '_id': new ObjectId(id) } }, { $project: { 'user.password': 0 } }]).toArray();
    const post = out_post[0]
    let update = false
    if (post.user._id.toString() === uid) {
        update = true
    }
    res.render('post/ViewPost', { post, isAuth: req.session.isAuth, update, data: { user_name: req.session.uname } })
}



const like_post = async (req, res) => {
    try {
        const { id } = req.params
        const uid = req.uid
        const postcollection = await posts()
        const post = await postcollection.findOne({ _id: new ObjectId(id) })
        const isliked = post.likes.find((ele)=>ele.toString() == uid)
        if(isliked){
            const ack =await postcollection.updateOne( {_id: new ObjectId(id)},{ $pull : { likes: new ObjectId(uid) }} )
            return res.status(200).json({msg:'unliked', success:true})
        }
        const ack = await postcollection.updateOne( {_id: new ObjectId(id)},{ $addToSet: { likes: new ObjectId(uid) } } )
        return res.status(200).json({ msg: 'like update', success: true })
    } catch (error) {
        res.status(401).json({ msg: 'something went wrong', success: false })
    }
}
export {
    create_post,
    create_post_page,
    //
    view_post,
    get_user_posts,
    //
    delete_post_page,
    delete_post,
    //
    update_post_page,
    update_post,
    like_post,
}