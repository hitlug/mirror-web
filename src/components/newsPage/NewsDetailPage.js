import React, { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Layout,
  Result,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import DocTemplate from "../docPage/doc/docTemplate";
import { getNewsArticleUrl, loadNewsItems } from "./newsData";
import "./newsPage.css";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState();
  const [loadState, setLoadState] = useState("loading");

  useEffect(() => {
    let active = true;
    setLoadState("loading");

    loadNewsItems()
      .then((items) => {
        if (active) {
          setNewsItem(items.find((item) => item.slug === slug));
          setLoadState("loaded");
        }
      })
      .catch(() => {
        if (active) {
          setLoadState("error");
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  let body;
  if (loadState === "loading") {
    body = (
      <div className="news-loading">
        <Spin size="large" />
      </div>
    );
  } else if (loadState === "error") {
    body = (
      <Result
        status="500"
        title="新闻加载失败"
        subTitle="请稍后刷新页面重试。"
        extra={<NewsBackButton />}
      />
    );
  } else if (newsItem === undefined) {
    body = (
      <Result
        status="404"
        title="没有找到这条新闻"
        subTitle="该新闻可能已被撤下，或者链接有误。"
        extra={<NewsBackButton />}
      />
    );
  } else {
    body = (
      <article>
        <Breadcrumb
          className="news-breadcrumb"
          items={[
            { title: <Link to="/home">主页</Link> },
            { title: <Link to="/news">新闻</Link> },
            { title: newsItem.title },
          ]}
        />
        <Title>{newsItem.title}</Title>
        <Space className="news-detail-meta" size={[8, 8]} wrap>
          <span>
            <CalendarOutlined />{" "}
            <time dateTime={newsItem.publishedAt}>{newsItem.publishedAt}</time>
          </span>
          <span>
            <UserOutlined /> {newsItem.author}
          </span>
          {newsItem.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
        <Paragraph className="news-detail-summary" type="secondary">
          {newsItem.summary}
        </Paragraph>
        <Divider />
        <DocTemplate
          key={newsItem.slug}
          doc={getNewsArticleUrl(newsItem.slug)}
        />
        <Divider />
        <NewsBackButton />
      </article>
    );
  }

  return (
    <Content className="news-page-content">
      <Row justify="center">
        <Col xs={24} lg={18} xl={14}>
          <div className="news-page-container">{body}</div>
        </Col>
      </Row>
    </Content>
  );
}

function NewsBackButton() {
  return (
    <Link to="/news">
      <Button icon={<ArrowLeftOutlined />}>返回新闻列表</Button>
    </Link>
  );
}
