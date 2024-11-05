import { useState, useEffect, useContext } from "react";
import { fetchArticles } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import ArticleCard from "../components/ArticleCard";
import { UserContext } from "../contexts/User";

export default function Index() {
  const [categorizedArticles, setCategorizedArticles] = useState({});
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        const categorizedItems = {};
        data.forEach((article) => {
          const topic = article.topic;
          if (!categorizedItems[topic]) categorizedItems[topic] = [];
          categorizedItems[topic].push(article);
        });
        setCategorizedArticles(categorizedItems);
        setLoading(false)
      })
      .catch(() => setError(setError(true)));
  }, []);

  const displayedArticles = Object.entries(categorizedArticles).map(
    ([topic, articles]) => ({ [topic]: articles.slice(0, 3) })
  );

  if (hasError) return <h1>Error!</h1>

  return (
    <div className="m-1 grid gap-2">
      {displayedArticles.map((item) => {
        const [topic, articles] = Object.entries(item)[0];
        return (
          <Wrapper title={topic}>
            {articles.map((article) => (
              <ArticleCard article={article} />
            ))}
          </Wrapper>
        );
      })}
    </div>
  );
}
