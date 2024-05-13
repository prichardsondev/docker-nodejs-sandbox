const { controller } = require('../../src/controllers/post');
const Post = require('../../src/models/post');
jest.mock('../../src/models/post');

describe('Post Controller Tests', () => {
  test('getAllPosts returns all posts', async () => {
    const mockPosts = [{ title: 'Test Post', body: 'This is a test' }];
    Post.find.mockResolvedValue(mockPosts);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    await controller.getAllPosts(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      results: mockPosts.length,
      data: { posts: mockPosts }
    });
  });

  test('getPostById returns a post by ID', async () => {
    const post = { _id: '1', title: 'Test', body: 'Test body' };
    Post.findById.mockResolvedValue(post);

    const req = { params: { id: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    await controller.getPostById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: { post }
    });
  });
});
