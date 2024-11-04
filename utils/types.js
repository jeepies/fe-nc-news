// this is a funky little file that helps me by filling in intellisense as to what on earth
// we're getting from the api. is there a better way? probably. will i google it? probably not

export const article = (article) => {
  console.log(article);
  return {
    id: article.article_id,
    title: article.title,
    author: article.author,
    topic: article.coding,
    created_at: article.created_at,
    votes: article.votes,
    comment_count: article.comment_count,
    image_url: article.article_img_url,
  };
};
