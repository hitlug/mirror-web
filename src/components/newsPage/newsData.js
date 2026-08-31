const NEWS_INDEX_URL = "/news/index.json";

let newsIndexRequest;

/**
 * Sort pinned news first, then sort each group by publication date.
 */
export function sortNewsItems(items) {
  return [...items].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) {
      return a.pinned ? -1 : 1;
    }

    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

/**
 * Return the public URL for a news article body.
 */
export function getNewsArticleUrl(slug) {
  return `/news/articles/${encodeURIComponent(slug)}.md`;
}

/**
 * Load and cache the public news index for the current page session.
 */
export function loadNewsItems() {
  if (newsIndexRequest === undefined) {
    newsIndexRequest = fetch(NEWS_INDEX_URL, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`load news index failed: HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((items) => {
        if (!Array.isArray(items)) {
          throw new Error("news index must be an array");
        }

        return sortNewsItems(items.filter((item) => item.draft !== true));
      })
      .catch((error) => {
        newsIndexRequest = undefined;
        throw error;
      });
  }

  return newsIndexRequest;
}
