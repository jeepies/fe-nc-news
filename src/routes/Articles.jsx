import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import ArticleCard from "../components/ArticleCard";
import Chip from "../components/Chip"

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);

  const possibleParameters = ["topic", "sort_by", "order"]
  const params = possibleParameters.filter((possibleParameter) => searchParams.has(possibleParameter))
  const builtParams = {};
  params.forEach((param) => builtParams[param] = searchParams.get(param))

  useEffect(() => {
    const request = fetchArticles(builtParams);
    request.then((response) => {
      setArticles(response);
    });
  }, []);

  return (
    <div className="m-1">
      <Wrapper title="Articles">
        {articles.map((article) => <ArticleCard article={article} />)}
      </Wrapper>
    </div>
  );
}