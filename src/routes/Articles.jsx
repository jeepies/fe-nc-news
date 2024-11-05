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

  const setSortBy = (e) => {
    builtParams["sort_by"] = e.target.value
    setSearchParams(builtParams)
  }

  const setOrderBy = (e) => {
    builtParams["order"] = e.target.value
    setSearchParams(builtParams)
  }

  return (
    <div className="m-1 space-y-1">
      <div className="grid grid-cols-3 sm:grid-cols-12 gap-1">
        {topics.map((topic) => <Chip onClick={() => setTopic(topic.slug)} className={builtParams["topic"] === topic.slug ? "border border-iris" : ""} useDark text={topic.slug} />)}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <select className="bg-heavy-metal text-white p-1 rounded" name="sort_by" defaultValue="created_at" onChange={setSortBy}>
          <option value="created_at">Created At</option>
          <option value="votes">Votes</option>
          {/* <option value="comment_count">Comment Count</option> */}
        </select>
        <select className="bg-heavy-metal text-white p-1 rounded" name="order_by" defaultValue="desc" onChange={setOrderBy}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div>
        <Wrapper title="Articles">
          {articles.length === 0 ? <p>No articles, or this topic doesn't exist!.</p> : articles.map((article) => <ArticleCard article={article} />)}
        </Wrapper>
      </div>
    </div>
  );
}