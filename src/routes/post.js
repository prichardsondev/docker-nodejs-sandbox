const {controller} = require('../controllers/post');

module.exports = (app) => {
    app.get('/posts', controller.getAllPosts);
    app.post('/posts', controller.createPost);
    app.get('/posts/:id', controller.getPostById);
    app.put('/posts/:id', controller.updatePostById);
    app.delete('/posts/:id', controller.deletePostById);
}

