import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import ArticleCard from "../components/ArticleCard";

export default function Index() {
  const [categorizedArticles, setCategorizedArticles] = useState({});
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shouldShowLoadingWarning, setShouldShowLoadingWarning] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      setShouldShowLoadingWarning(true);
    }, 5000)
  })

  const displayedArticles = Object.entries(categorizedArticles).map(
    ([topic, articles]) => ({ [topic]: articles.slice(0, 3) })
  );

  if (hasError) return <h1>Error!</h1>
  if (loading) return <div className="text-center mt-5 text-white">
    <h1 className="font-bold text-4xl">Loading...</h1>
    {shouldShowLoadingWarning ? <p className="text-faint mb-2">(If this is the first request in a while, it can take up to a minute to complete.)</p> : null}
  </div>

  return (
    <div className="m-1 grid gap-2">
      {displayedArticles.map((item) => {
        const [topic, articles] = Object.entries(item)[0];
        return (
          <Wrapper title={topic} key={topic}>
            {articles.map((article) => (
              <ArticleCard article={article} key={article.article_id} />
            ))}
          </Wrapper>
        );
      })}
    </div>
  );
}
