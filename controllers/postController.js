import Post from "../models/Post.js";
import saveImage from "../services/imageStorage.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export default {
  async list(req, res) {
    try {
      const posts = await Post.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },

  async show(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving post", error });
    }
  },

  async create(req, res) {
    const { user_id, event_id, title, description } = req.body;
    const createdAt = new Date(Date.now()); // Simple ID generation based on timestamp
    let image_url = null;
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }
      image_url = saveImage(req.file).url;
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error uploading image", error: error.message });
    }

    try {
      const newPost = await Post.createPost({
        user_id,
        event_id,
        title,
        description,
        image_url,
        createdAt,
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({
        message: "Error creating post",
        error: error.message,
        detail: error.detail,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { user_id, event_id, content, image_url } = req.body;
    try {
      const updatedPost = await Post.updatePost(id, {
        user_id,
        event_id,
        content,
        image_url,
      });
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Error updating post", error });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedPost = await Post.deletePost(id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(deletedPost);
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error });
    }
  },

  async getPostsByUserId(req, res) {
    const { userId } = req.params;
    try {
      const posts = await Post.getPostsByUserId(userId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
  async getPostsByEventId(req, res) {
    const { eventId } = req.params;
    try {
      const posts = await Post.getPostsByEventId(eventId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
  async getPostsByEventId(req, res) {
    const { eventId } = req.params;
    try {
      const posts = await Post.getPostsByEventId(eventId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
  async getPostsByCreatedAt(req, res) {
    const { created_at } = req.params;
    try {
      const posts = await Post.getPostsByCreatedAt(created_at);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
  async getPostsByContent(req, res) {
    const { content } = req.params;
    try {
      const posts = await Post.getPostsByContent(content);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
  async getPostsByImageUrl(req, res) {
    const { image_url } = req.params;
    try {
      const posts = await Post.getPostsByImageUrl(image_url);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
  async getPostsByCreatedAt(req, res) {
    const { created_at } = req.params;
    try {
      const posts = await Post.getPostsByCreatedAt(created_at);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error });
    }
  },
};
