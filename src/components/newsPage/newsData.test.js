import { getNewsArticleUrl, sortNewsItems } from "./newsData";

it("sorts pinned news first and then by publication date", () => {
  const items = sortNewsItems([
    { slug: "older", publishedAt: "2026-08-01" },
    { slug: "newer", publishedAt: "2026-09-01" },
    { slug: "pinned", publishedAt: "2026-07-01", pinned: true },
  ]);

  expect(items.map((item) => item.slug)).toEqual(["pinned", "newer", "older"]);
});

it("encodes a news slug when creating its article URL", () => {
  expect(getNewsArticleUrl("release notes")).toBe(
    "/news/articles/release%20notes.md",
  );
});
