import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  PushpinFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Col,
  Layout,
  List,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { loadNewsItems } from "./newsData";
import "./newsPage.css";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export default function NewsListPage() {
  const [newsItems, setNewsItems] = useState();
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    loadNewsItems()
      .then((items) => {
        if (active) {
          setNewsItems(items);
        }
      })
      .catch(() => {
        if (active) {
          setLoadError(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Content className="news-page-content">
      <Row justify="center">
        <Col xs={24} lg={18} xl={14}>
          <div className="news-page-container">
            <Title>新闻</Title>
            <Paragraph type="secondary">
              镜像站运行动态、维护通知和服务更新。
            </Paragraph>

            {loadError ? (
              <Alert
                message="新闻加载失败"
                description="请稍后刷新页面重试。"
                type="error"
                showIcon
              />
            ) : newsItems === undefined ? (
              <div className="news-loading">
                <Spin size="large" />
              </div>
            ) : (
              <List
                className="news-list"
                dataSource={newsItems}
                locale={{ emptyText: "暂时没有新闻" }}
                pagination={{ pageSize: 10, hideOnSinglePage: true }}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space size="small" wrap>
                          {item.pinned ? (
                            <Tag icon={<PushpinFilled />} color="blue">
                              置顶
                            </Tag>
                          ) : null}
                          <Link to={`/news/${item.slug}`}>{item.title}</Link>
                        </Space>
                      }
                      description={
                        <div>
                          <Space className="news-list-meta" size={[8, 8]} wrap>
                            <span>
                              <CalendarOutlined />{" "}
                              <time dateTime={item.publishedAt}>
                                {item.publishedAt}
                              </time>
                            </span>
                            <span>
                              <UserOutlined /> {item.author}
                            </span>
                            {item.tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Space>
                          <Paragraph className="news-summary">
                            {item.summary}
                          </Paragraph>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </Col>
      </Row>
    </Content>
  );
}
