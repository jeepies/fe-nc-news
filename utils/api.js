import axios from "axios";

const API = axios.create({
  baseURL: "https://be-nc-news-47u0.onrender.com/api",
  timeout: 1000,
});

/**
 * @param {axios.AxiosResponse<any, any>} response
 */
const _validateResponseAndGrabData = (response) => {
  if (response.status !== 200)
    return Promise.reject(
      `invalid status code. expected 200, got ${response.status}`
    );
  return response.data;
};

export const fetchTopics = () => {
  return API.get("/topics").then(
    (response) => _validateResponseAndGrabData(response).topics
  );
};

export const fetchArticles = () => {
  return API.get("/articles").then(
    (response) => _validateResponseAndGrabData(response).articles
  );
};

export const fetchArticleById = (id) => {
  return API.get(`/articles/${id}`).then((response) =>
    _validateResponseAndGrabData(response)
  );
};

export const fetchArticleComments = (id) => {
  return API.get(`/articles/${id}/comments`, { params: {} }).then(
    (response) => _validateResponseAndGrabData(response).comments
  );
};

export const castVoteOnArticle = (id, votes) => {
  return API.patch(`/articles/${id}`, { inc_votes: votes }).then((response) =>
    _validateResponseAndGrabData(response)
  );
};

export const commentOnArticle = (id, comment) => {
  return API.post(`/articles/${id}/comments`, {
    username: "tickle122",
    body: comment,
  }).then((response) => _validateResponseAndGrabData(response));
};

export const fetchArticlesUnderTopic = (topic) => {
  return API.get("/articles", { params: { topic: topic } }).then(
    (response) => _validateResponseAndGrabData(response).articles
  );
};
