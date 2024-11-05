import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles, fetchTopics } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import ArticleCard from "../components/ArticleCard";
import Chip from "../components/Chip"

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);

  const possibleParameters = ["topic", "sort_by", "order"]
  const params = possibleParameters.filter((possibleParameter) => searchParams.has(possibleParameter))
  const builtParams = {};
  params.forEach((param) => builtParams[param] = searchParams.get(param))

  useEffect(() => {
    fetchArticles(builtParams).then((response) => setArticles(response));
    fetchTopics().then((topics) => setTopics(topics))
  }, [searchParams]);

  const setTopic = (topic) => {
    builtParams["topic"] = topic;
    setSearchParams(builtParams);
  }

  return (
    <div className="m-1 space-y-1">
      <div className="grid grid-cols-3 sm:grid-cols-12 gap-1">
        {topics.map((topic) => <Chip onClick={() => setTopic(topic.slug)} className={builtParams["topic"] === topic.slug ? "border border-iris" : ""} useDark text={topic.slug} />)}
      </div>
      <div>
        <Wrapper title="Articles">
          {articles.map((article) => <ArticleCard article={article} />)}
        </Wrapper>
      </div>
    </div>
  );
}