import { useState, useContext } from "react";
import { commentOnArticle, deleteCommentById } from "../../utils/api";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/User"
import { TrashIcon } from "lucide-react";

export default function CommentBox(props) {
  const { user } = useContext(UserContext)
  const [commentInput, setCommentInput] = useState("");
  const [commentStatus, setCommentStatus] = useState("");
  const { comments: { comments, setComments }, id } = props;

  const handleCommentInputBlur = () => {
    if (commentInput.length > 100) return toast.error(`Invalid comment length!`);
  };

  const handleCommentSubmit = (e) => {
    setCommentStatus("COMMENTING")
    const sender = e.target;
    if (commentInput === "") { setCommentStatus(""); return toast.error(`Invalid comment!`) };
    sender.disabled = true;
    commentOnArticle(id, user, commentInput).then(async (data) => {
      // Doing it this way also puts the comments at the very top for the first render, awesome!
      const _comments = comments ? [data, ...comments] : [data]
      setComments(_comments)
      sender.disabled = false;
      setCommentInput("");
      setCommentStatus("")
    });
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
          disabled={commentStatus === "COMMENTING"}
        >
          {commentStatus === "COMMENTING" ? "Commenting..." : "Comment" }
        </button>
      </div>
      {!comments || comments.length === 0 ? (
        <label>It&apos;s lonely here.</label>
      ) : (
        <div>
          {comments.map((comment) => {
            const { author, body, comment_id } = comment;
            return (
              <div key={comment_id} className="bg-dark-grey rounded p-1 m-1" id={comment_id}>
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
