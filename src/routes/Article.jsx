import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  castVoteOnArticle,
  commentOnArticle,
  fetchArticleById,
  fetchArticleComments,
} from "../../utils/api";
import { MinusIcon, PlusIcon } from "lucide-react";
import Chip from "../components/Chip";
import ArticleSkeleton from "../components/ArticleSkeleton";
import { toast } from "react-toastify";

export default function Article() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [votes, setVotes] = useState(0);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    fetchArticleById(id)
      .then((data) => {
        setArticle(data);
        setVotes(data.votes);
        if (data.comment_count !== 0) {
          return fetchArticleComments(id);
        }
      })
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch(() => setHasError(true));
  }, []);

  const castNegativeVote = (e) => {
    e.target.disabled = true;
    castVoteOnArticle(id, -1).then(() => {
      setVotes(votes - 1);
      e.target.disabled = false;
      return toast.success(`Successfully voted!`)
    });
  };

  const castPositiveVote = (e) => {
    e.target.disabled = true;
    castVoteOnArticle(id, 1).then(() => {
      setVotes(votes + 1);
      e.target.disabled = false;
      return toast.success(`Successfully downvoted!`)
    });
  };

  const handleCommentInputBlur = (e) => {
    const sender = e.target;
    const value = sender.value;
    if (value.length > 100) return toast.error(`Invalid comment length!`);
    setCommentInput(value);
  };

  const handleCommentSubmit = (e) => {
    const sender = e.target;
    sender.disabled = true;
    if(commentInput === "") return toast.error(`Invalid comment!`);
    commentOnArticle(id, commentInput).then((data) => {
      return toast.success(`Commented!`)
    })
  };

  return (
    <>
      {loading ? (
        <ArticleSkeleton />
      ) : (
        <>
          <div className="bg-heavy-metal m-2 p-2 rounded text-white">
            <img
              className="rounded"
              src={article.article_img_url}
              alt={`Image for ${article.title}`}
              aria-hidden
            />
            <h1 className="font-bold text-xl">
              {article.title} <Link to={"/articles?topic=" + article.topic}><Chip text={article.topic} /></Link>
            </h1>
            <p className="font-extralight text-sm opacity-75">
              By {article.author}
            </p>
            <br />
            <div className="">{article.body}</div>
            <div className="bg-dark-grey rounded">
              <button id="plus" onClick={castNegativeVote}>
                <MinusIcon />
              </button>
              <span>{votes}</span>
              <button id="plus" onClick={castPositiveVote}>
                <PlusIcon />
              </button>
            </div>
          </div>

          <div className="bg-heavy-metal m-2 p-2 rounded text-white">
            <div>
              <h1 className="font-bold text-xl">Comments</h1>
            </div>
            <div className="m-1">
              <textarea
                className="bg-dark-grey rounded w-full"
                name="comment"
                onBlur={handleCommentInputBlur}
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
                  const { author, body, created_at, votes } = comment;
                  return (
                    <div className="bg-dark-grey rounded p-1 m-1">
                      <p>{body}</p>
                      <p className="font-extralight text-sm opacity-75">
                        By {author}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
