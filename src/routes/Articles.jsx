import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticlesUnderTopic, fetchArticles } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);

  const topic = searchParams.get("topic");

  useEffect(() => {
    const request = topic ? fetchArticlesUnderTopic(topic) : fetchArticles();
    request.then((response) => {
      setArticles(response);
    });
  }, []);

  return (
    <div className="m-1">
      <Wrapper title={topic ?? "Articles"}>
        {articles.map((article) => <ArticleCard article={article}/>)}
      </Wrapper>
    </div>
  );
}
