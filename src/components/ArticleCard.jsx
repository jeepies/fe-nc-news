import { Heart, HeartCrack, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const { article_id, title, author, votes, comment_count, article_img_url } = props.article;

  return (
    <Link to={`/article/${article_id}`}>
      <div className="bg-dark-grey rounded p-2">
        <p className="font-bold text-lg">{title}</p>
        <p className="font-extralight text-sm opacity-75">
          By {author}
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
        <div className="float-right">
          <img className="max-w-40 rounded hidden sm:block" alt={"Article image for " + title} src={article_img_url} />
        </div>
      </div>
    </Link>
  );
}

