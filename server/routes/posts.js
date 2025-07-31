// const router = require('express').Router();
// const Post   = require('../models/Post');
// const jwt    = require('jsonwebtoken');

// // Helper: extract user ID from header
// const getUserId = header => {
//   if (!header) return null;
//   try {
//     const token = header.split(' ')[1];
//     return jwt.verify(token, process.env.JWT_SECRET).id;
//   } catch {
//     return null;
//   }
// };

// // GET /api/posts
// // • if logged in → only that user’s posts (drafts + published)
// // • if not → only published posts
// router.get('/', async (req, res) => {
//   const userId = getUserId(req.headers.authorization);
//   const filter = userId
//     ? { author: userId }
//     : { status: 'published' };      // only published for public
//   const posts = await Post.find(filter)
//     .populate('author', 'name email');
//   res.json(posts);
// });

// // Auth middleware
// const requireAuth = (req, res, next) => {
//   const userId = getUserId(req.headers.authorization);
//   if (!userId) return res.status(401).json({ error: 'Authentication required' });
//   req.userId = userId;
//   next();
// };

// // CREATE
// router.post('/', requireAuth, async (req, res) => {
//   try {
//     const { title, content, category, status } = req.body;
//     const imagePath = req.file ? req.file.filename : null;
//     const post = await Post.create({
//       title, content, category, status, imagePath, author: req.userId
//     });
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // UPDATE
// router.put('/:id', requireAuth, async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   if (!post) return res.status(404).json({ error: 'Not found' });
//   if (post.author.toString() !== req.userId)
//     return res.status(403).json({ error: 'Forbidden' });

//   const { title, content, category, status } = req.body;
//   post.title    = title;
//   post.content  = content;
//   post.category = category;
//   post.status   = status;
//   if (req.file) post.imagePath = req.file.filename;
//   await post.save();
//   res.json(post);
// });

// // DELETE
// router.delete('/:id', requireAuth, async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   if (!post) return res.status(404).json({ error: 'Not found' });
//   if (post.author.toString() !== req.userId)
//     return res.status(403).json({ error: 'Forbidden' });

//   await post.deleteOne();
//   res.json({ message: 'Deleted' });
// });

// module.exports = router;
// const router = require('express').Router();
// const Post = require('../models/Post');
// const jwt = require('jsonwebtoken');

// // Helper: extract user ID from token
// const getUserId = header => {
//   if (!header) return null;
//   try {
//     const token = header.split(' ')[1];
//     return jwt.verify(token, process.env.JWT_SECRET).id;
//   } catch {
//     return null;
//   }
// };

// // Auth middleware
// const requireAuth = (req, res, next) => {
//   const userId = getUserId(req.headers.authorization);
//   if (!userId) return res.status(401).json({ error: 'Authentication required' });
//   req.userId = userId;
//   next();
// };

// // GET /api/posts
// // - If logged in: return that user’s posts (draft + published)
// // - If not: return only published posts
// router.get('/', async (req, res) => {
//   try {
//     const userId = getUserId(req.headers.authorization);
//     const filter = userId
//       ? { author: userId }
//       : { status: 'published' }; // Only public posts

//     const posts = await Post.find(filter).populate('author', 'name email');
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch posts' });
//   }
// });

// // GET /api/posts/:id
// // - Returns a single post by ID (public or private if owner)
// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id).populate('author', 'name email');
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // POST /api/posts
// // - Create a new post (auth required)
// router.post('/', requireAuth, async (req, res) => {
//   try {
//     const { title, content, category, status } = req.body;
//     const imagePath = req.file ? req.file.filename : null;

//     const post = await Post.create({
//       title,
//       content,
//       category,
//       status,
//       imagePath,
//       author: req.userId
//     });

//     res.status(201).json(post);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // PUT /api/posts/:id
// // - Update a post (only if owner)
// router.put('/:id', requireAuth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Not found' });
//     if (post.author.toString() !== req.userId)
//       return res.status(403).json({ error: 'Forbidden' });

//     const { title, content, category, status } = req.body;
//     post.title = title;
//     post.content = content;
//     post.category = category;
//     post.status = status;
//     if (req.file) post.imagePath = req.file.filename;

//     await post.save();
//     res.json(post);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE /api/posts/:id
// // - Delete a post (only if owner)
// router.delete('/:id', requireAuth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Not found' });
//     if (post.author.toString() !== req.userId)
//       return res.status(403).json({ error: 'Forbidden' });

//     await post.deleteOne();
//     res.json({ message: 'Deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete post' });
//   }
// });

// module.exports = router;
const router = require('express').Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Helper: extract user ID from token
const getUserId = header => {
  if (!header) return null;
  try {
    const token = header.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET).id;
  } catch {
    return null;
  }
};

// Auth middleware
const requireAuth = (req, res, next) => {
  const userId = getUserId(req.headers.authorization);
  if (!userId) return res.status(401).json({ error: 'Authentication required' });
  req.userId = userId;
  next();
};

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req.headers.authorization);
    const filter = userId
      ? { author: userId }
      : { status: 'published' };

    const posts = await Post.find(filter).populate('author', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/posts
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const post = await Post.create({
      title,
      content,
      category,
      status,
      imagePath,
      author: req.userId
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/posts/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ error: 'Forbidden' });

    const { title, content, category, status } = req.body;
    post.title = title;
    post.content = content;
    post.category = category;
    post.status = status;
    if (req.file) post.imagePath = req.file.filename;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ error: 'Forbidden' });

    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ✅ POST /api/posts/:id/like –– increment like count
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Liked successfully', likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// ✅ POST /api/posts/:id/comment –– add a comment to the post
router.post('/:id/comment', async (req, res) => {
  const { text, user } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = { text, user }; // user can be a string or userId
    post.comments.push(comment);
    await post.save();

    res.json({ message: 'Comment added', comments: post.comments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;
