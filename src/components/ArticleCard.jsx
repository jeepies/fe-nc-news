import { Heart, HeartCrack, MessageCircle } from "lucide-react";
import { ARTICLE } from "../../utils/types";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const _ = ARTICLE(props.article);

  return (
    <Link to={`/article/${_.id}`}>
      <div className="bg-dark-grey rounded p-2">
        <p className="font-bold text-lg">{_.title}</p>
        <p className="font-extralight text-sm opacity-75">
          By {_.author}
        </p>
        {}
        <p className="text-a">
          {_.votes < 0 ? <HeartCrack /> : <Heart />}
          {_.votes}
        </p>
        <p>
          <MessageCircle />
          {_.comment_count}
        </p>
      </div>
    </Link>
  );
}
