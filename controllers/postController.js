import Post from '../models/Post.js';


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
        const { user_id, event_id, content, image_url } = req.body;
        try {
            const newPost = await Post.createPost({ user_id, event_id, content, image_url });
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({
                message: "Error creating post",
                error: error.message,
                detail: error.detail
            });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { user_id, event_id, content, image_url } = req.body;
        try {
            const updatedPost = await Post.updatePost(id, { user_id, event_id, content, image_url });
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
        const { user_id } = req.params;
        try {
            const posts = await Post.getPostsByUserId(user_id);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving posts", error });
        }
    },
    async getPostsByEventId(req, res) {
        const { event_id } = req.params;
        try {
            const posts = await Post.getPostsByEventId(event_id);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving posts", error });
        }
    },
    async getPostsByEventId(req, res) {
        const { event_id } = req.params;
        try {
            const posts = await Post.getPostsByEventId(event_id);
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
    }
}