import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadNewsItems, selectMarqueeNews } from "../newsPage/newsData";
import "./newsMarquee.css";

export default function NewsMarquee() {
  const [newsItem, setNewsItem] = useState();

  useEffect(() => {
    let active = true;

    loadNewsItems()
      .then((items) => {
        if (active) {
          setNewsItem(selectMarqueeNews(items));
        }
      })
      .catch(() => {
        // The news page reports loading errors; keep the homepage unobstructed.
      });

    return () => {
      active = false;
    };
  }, []);

  if (newsItem === undefined) {
    return null;
  }

  return (
    <aside className="news-marquee" aria-label="最新新闻">
      <div className="news-marquee-label" aria-hidden="true">
        <span className="news-marquee-indicator" />
        NEWS
      </div>
      <div className="news-marquee-viewport">
        <Link className="news-marquee-link" to={`/news/${newsItem.slug}`}>
          {newsItem.marqueeText || newsItem.title}
        </Link>
      </div>
    </aside>
  );
}
