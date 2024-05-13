const Post = require('../models/post');

const controller = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find();
            res.status(200).json({
                status: 'success',
                results: posts.length,
                data: {
                    posts,
                },
            });
        } catch (error) {
            console.error('Error fetching posts:', error); // Useful for logging
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error. Please try again later.',
            });
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Post not found',
                });
            }

            res.status(200).json({
                status: 'success',
                data: {
                    post,
                },
            });
        } catch (error) {
            if (error.name === 'CastError') {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid post ID',
                });
            }

            console.error('Error fetching post:', error);
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error. Please try again later.',
            });
        }
    },

    createPost: async (req, res) => {
        try {
            const { title, body } = req.body;

            // Validate incoming data
            if (!title || !body) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Missing required fields: title and body.',
                });
            }

            const newPost = await Post.create({ title, body });

            res.status(201).json({
                status: 'success',
                data: {
                    post: newPost,
                },
            });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error. Please try again later.',
            });
        }
    },

    updatePostById: async (req, res) => {
        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true, // Return the updated document
                runValidators: true, // Validate the updates
            });

            if (!updatedPost) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Post not found',
                });
            }

            res.status(200).json({
                status: 'success',
                data: {
                    post: updatedPost,
                },
            });
        } catch (error) {
            if (error.name === 'CastError') {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid post ID',
                });
            }

            console.error('Error updating post:', error);
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error. Please try again later.',
            });
        }
    },

    deletePostById: async (req, res) => {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);

            if (!post) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Post not found',
                });
            }

            res.status(204).json({
                status: 'success',
                data: null, // No content
            });
        } catch (error) {
            if (error.name === 'CastError') {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid post ID',
                });
            }

            console.error('Error deleting post:', error);
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error. Please try again later.',
            });
        }
    }

}

module.exports = {
    controller
};
