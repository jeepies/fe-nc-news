import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleComments } from "../../utils/api";
import { PlusIcon, MinusIcon, MessageCircle, Minus, Plus } from "lucide-react";
import Chip from "../components/Chip";

export default function Article() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchArticleById(id)
      .then((data) => {
        setArticle(data);
        if (data.comment_count !== 0) {
          return fetchArticleComments(id);
        }
      })
      .then((comments) => {
        setComments(comments);
      })
      .catch(() => setHasError(true));
    setLoading(false);
  }, []);

  return (
    <>
      <div className="bg-heavy-metal m-2 p-2 rounded text-white">
        <img
          className="rounded"
          src={article.article_img_url}
          alt={`Image for ${article.title}`}
          aria-hidden
        />
        <h1 className="font-bold text-xl">
          {article.title} <Chip text={article.topic} />
        </h1>
        <p className="font-extralight text-sm opacity-75">
          By {article.author}
        </p>
        <br />
        <div className="">{article.body}</div>
        {/* <div className="bg-dark-grey rounded float-right">{article.votes}</div> */}
      </div>

      <div className="bg-heavy-metal m-2 p-2 rounded text-white">
        <div>
          <h1 className="font-bold text-xl">Comments</h1>
          {/* <p className="float-right">
            <MessageCircle />
            {article.comment_count}
          </p> */}
        </div>
        {comments.length === 0 ? (
          <label>No comments :3</label>
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
  );
}
