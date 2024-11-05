import { useState, useContext } from "react";
import { commentOnArticle, deleteCommentById } from "../../utils/api";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/User"
import { TrashIcon } from "lucide-react";

export default function CommentBox(props) {
  const { user } = useContext(UserContext)
  const [commentInput, setCommentInput] = useState("");
  const { comments: {comments, setComments}, id } = props;

  const handleCommentInputBlur = (e) => {
    if (commentInput.length > 100) return toast.error(`Invalid comment length!`);
  };

  const handleCommentSubmit = (e) => {
    const sender = e.target;
    sender.disabled = true;
    if (commentInput === "") return toast.error(`Invalid comment!`);
    commentOnArticle(id, user, commentInput).then((data) => {
      // Doing it this way also puts the comments at the very top for the first render, awesome!
      setComments([data, ...comments])
      sender.disabled = false;
      setCommentInput("");
    });
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value)
  }

  const deleteComment = (e) => {
    const sender = e.target;
    let comment = sender.parentNode;
    if (comment.tagName === "svg") comment = comment.parentNode
    deleteCommentById(comment.id).then(() => {
      const _comments = comments.filter(c => c.comment_id !== +comment.id)
      setComments(_comments)
    })
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
      {comments.length === 0 ? (
        <label>It's lonely here.</label>
      ) : (
        <div>
          {comments.map((comment) => {
            const { author, body, created_at, votes, comment_id } = comment;
            return (
              <div className="bg-dark-grey rounded p-1 m-1" id={comment_id}>
                <p>{body}</p>
                <p className="font-extralight text-sm opacity-75">
                  By {author}
                </p>
                {author === user.username ? <TrashIcon className="hover:cursor-pointer" onClick={deleteComment} /> : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
