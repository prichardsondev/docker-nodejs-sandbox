const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const postRoutes = require('../../src/routes/post');
postRoutes(app); // This adds the /posts routes to the app

describe('Post Routes Tests', () => {
  test('GET /posts should return all posts', async () => {
    await request(app)
      .get('/posts')
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data.posts)).toBe(true);
      });
  });

  test('POST /posts should create a new post', async () => {
    const postData = { title: 'New Post', body: 'Content of the new post' };
    await request(app)
      .post('/posts')
      .send(postData)
      .expect(201)
      .then((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data.post.title).toBe(postData.title);
      });
  });
});
