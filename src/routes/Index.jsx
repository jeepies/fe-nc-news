import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import ArticleCard from "../components/ArticleCard";

export default function Index() {
  const [categorizedArticles, setCategorizedArticles] = useState({});
  const [error, setError] = useState([]);

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
      })
      .catch((err) => setError(err.message));
  }, []);

  const displayedArticles = Object.entries(categorizedArticles).map(
    ([topic, articles]) => ({ [topic]: articles.slice(0, 3) })
  );

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
