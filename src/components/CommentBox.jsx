import { useState, useContext } from "react";
import { commentOnArticle, deleteCommentById } from "../../utils/api";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/User"
import CommentCard from "./CommentCard";

export default function CommentBox(props) {
  const { user } = useContext(UserContext)
  const [commentInput, setCommentInput] = useState("");
  const { comments: { comments, setComments }, articleId } = props;

  const handleCommentInputBlur = () => {
    if (commentInput.length > 100) return toast.error(`Invalid comment length!`);
  };

  const handleCommentSubmit = (e) => {
    const sender = e.target;
    if (commentInput === "") return toast.error(`Invalid comment!`);
    sender.disabled = true;
    const commentPromise = commentOnArticle(articleId, user, commentInput).then((data) => {
      // Doing it this way also puts the comments at the very top for the first render, awesome!
      const _comments = comments ? [data, ...comments] : [data]
      setComments(_comments)
      sender.disabled = false;
      setCommentInput("");
    });
    toast.promise(commentPromise, { pending: "Commenting...", success: "Added comment!", error: "Failed to comment."})
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value)
  }

  const deleteComment = (e) => {
    const sender = e.target;
    let comment = sender.parentNode;
    if (comment.tagName === "svg") comment = comment.parentNode
    const button = comment.getElementsByTagName("svg")[0]
    button.disabled = true;
    const deletePromise = deleteCommentById(comment.id).then(() => {
      const _comments = comments.filter(c => c.comment_id !== +comment.id)
      setComments(_comments)
    })
    toast.promise(deletePromise, { pending: "Deleting comment...", success: "Successfully deleted comment!", error: "Failed to delete comment." })
    button.disabled = false;
  }

  return (
    <div className="bg-heavy-metal m-2 p-2 rounded text-white">
      <div>
        <h1 className="font-bold text-xl">Comments</h1>
      </div>
      <div className="m-1">
        <textarea
          className="bg-dark-grey rounded w-full"
          name="comment"
          value={commentInput}
          onBlur={handleCommentInputBlur}
          onChange={handleCommentChange}
        />
        <button
          className="w-full bg-iris rounded"
          onClick={handleCommentSubmit}
        >
          Comment
        </button>
      </div>
      {!comments || comments.length === 0 ? (
        <label>It&apos;s lonely here.</label>
      ) : (
        <div>
          {comments.map((comment) => <CommentCard key={comment.comment_id} comment={comment} deleteComment={deleteComment}/>)}
        </div>
      )}
    </div>
  );
}
