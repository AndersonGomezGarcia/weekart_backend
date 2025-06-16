import Comment from "../models/Comment.js";

export default {
  async list(req, res) {
    try {
      const comments = await Comment.getCommentsByPost();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comments", error });
    }
  },
  async create(req, res) {
    const { author_id, post_id, content, reply_to } = req.body;
    const created_at = new Date(Date.now());
    try {
      const comment = await Comment.createComment({
        author_id,
        post_id,
        content,
        reply_to,
        created_at,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({
        message: "Error creating comment",
        error: error.message,
        detail: error.detail,
      });
    }
  },

  async listByPost(req, res) {
    const { postId } = req.params;
    try {
      const comments = await Comment.getCommentsByPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comments", error });
    }
  },

  async show(req, res) {
    const { id } = req.params;
    try {
      const comment = await Comment.getCommentById(id);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comment", error });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Comment.deleteComment(id);
      if (!deleted) return res.status(404).json({ message: "Comment not found" });
      res.status(200).json({ message: "Comment deleted", comment: deleted });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  }
}