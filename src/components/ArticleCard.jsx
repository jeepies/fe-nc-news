import { Heart, HeartCrack, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const { article_id, title, author, votes, comment_count, article_img_url, created_at } = props.article;

  return (
    <Link to={`/article/${article_id}`}>
      <div className="bg-dark-grey rounded p-2">
        <img className="max-w-72 rounded hidden sm:block" alt={"Article image for " + title} src={article_img_url} />
        <p className="font-bold text-lg">{title}</p>
        <p className="font-extralight text-sm opacity-75">
          By {author}, on {new Date(created_at).toLocaleDateString()}
        </p>
        <span className="flex gap-2">
          <p>
            {votes < 0 ? <HeartCrack /> : <Heart />}
            {votes}
          </p>
          <p>
            <MessageCircle />
            {comment_count}
          </p>
        </span>
      </div>
    </Link>
  );
}

