const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (!post) {
                    throw new Error("post not found");
                }
                return post;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, {body}, context){
            const user = checkAuth(context);
            const newPost = new Post({
                body,
                username: user.username,
                user: user.id,
                createdAt: new Date().toISOString()
            })
            const res = await newPost.save();
            context.pubSub.publish('NEW_POST', { newPost: res})
            return res;
        },
        async likePost(_, {postId}, context){
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if (!post){
                throw new Error('post not found');
            }
            if(post.likes.find(e => e.username === username)){
                post.likes = post.likes.filter(e => e.username !== username);
            } else {
                post.likes.push({username, createdAt: new Date().toISOString()});
            }
            return await post.save();
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, {pubSub}) => pubSub.asyncIterator('NEW_POST')
        }
    }
};