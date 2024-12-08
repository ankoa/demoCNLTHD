import React, { useState, useEffect } from "react";
import { loadComment, createComment, updateComment, deleteComment } from "../services/feedbackService";

const Comment = ({ comment, onDelete, onEdit }) => (
  <li>
    <div className="comment-main-level">
      <div className="comment-avatar">
        <img src={comment.avatar} alt="avatar" />
      </div>
      <div className="comment-box">
        <div className="comment-head">
          <h6 className={`comment-name ${comment.author === "Agustin Ortiz" ? "by-author" : ""}`}>
            {comment.author}
          </h6>
          <span>{comment.time}</span>
          <button onClick={() => onEdit(comment)}>Edit</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
        <div className="comment-content">{comment.content}</div>
      </div>
    </div>
    {comment.replies && comment.replies.length > 0 && (
      <ul className="comments-list reply-list">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ul>
    )}
  </li>
);

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await loadComment(1); // Load comments by testID
        setComments(data);
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    try {
      const commentData = { content: newComment, avatar: "https://example.com/avatar.jpg" };
      const addedComment = await createComment(commentData);
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (comment) => {
    setEditingComment(comment);
    setNewComment(comment.content);
  };

  const handleUpdateComment = async () => {
    try {
      const updatedComment = { ...editingComment, content: newComment };
      await updateComment(editingComment.id, updatedComment);
      setComments((prev) =>
        prev.map((c) => (c.id === editingComment.id ? updatedComment : c))
      );
      setEditingComment(null);
      setNewComment("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comments-container">
      <h1>Comments</h1>
      <ul id="comments-list" className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        ))}
      </ul>
      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        ></textarea>
        {editingComment ? (
          <button onClick={handleUpdateComment}>Update Comment</button>
        ) : (
          <button onClick={handleAddComment}>Add Comment</button>
        )}
      </div>
    </div>
  );
};

export default CommentsContainer;
