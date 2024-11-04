import { Heart, HeartCrack, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const article = props.article;

  return (
    <Link to={`/article/${article.article_id}`}>
      <div className="bg-dark-grey rounded p-2">
        <p className="font-bold text-lg">{article.title}</p>
        <p className="font-extralight text-sm opacity-75">
          By {article.author}
        </p>
        {}
        <p className="text-a">
          {article.votes < 0 ? <HeartCrack /> : <Heart />}
          {article.votes}
        </p>
        <p>
          <MessageCircle />
          {article.comment_count}
        </p>
      </div>
    </Link>
  );
}

