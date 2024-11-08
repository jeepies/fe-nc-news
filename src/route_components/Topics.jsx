import { useEffect } from "react";
import { useState } from "react";
import { fetchTopics } from "../../utils/api";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

export default function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <div className="m-1 grid gap-2">
      {topics.map((topic) => (
        <Link key={topic.slug} to={`/articles?topic=${topic.slug}`}>
          <Wrapper title={topic.slug} description={topic.description} />
        </Link>
      ))}
    </div>
  );
}
