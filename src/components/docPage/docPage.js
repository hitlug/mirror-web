import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Divider, Row, Col, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import docMenu from "./menu.json";
import "./docPage.css";

const { Header, Content, Sider } = Layout;

/**
 * 帮助文档页面组件
 */
export default function DocPage() {
  // 帮助文档正文内容
  const [currentDocContent, setCurrentDocContent] = useState(undefined);
  // 帮助文档的路径
  const [activeDocPath, setActiveDocPath] = useState("/doc/docHome");
  // 是否已经获取了文档
  const [docLoaded, setDocLoaded] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  /**
   * 动态导入文档并修改页面正文内容
   *
   * @param path 文档路由
   */
  async function importAndExecDoc(path) {
    setDocLoaded(false);
    setCurrentDocContent(undefined);
    setActiveDocPath(path);

    try {
      const module = await import("./doc/js/" + path.split("/")[2] + ".js");
      setDocLoaded(true);
      setCurrentDocContent(module.default());
    } catch {
      console.log("import " + path + " failed");
      setDocLoaded(true);
      setCurrentDocContent(<h1>No Document Here!</h1>);
    }
  }

  useEffect(() => {
    let normalizedPath = pathname;
    if (/^\/doc\/?$/.test(pathname)) {
      normalizedPath = "/doc/docHome";
      navigate("/doc/docHome", { replace: true });
      return;
    }

    importAndExecDoc(normalizedPath);
  }, [pathname]);

  return (
    <Row className="doc-frame">
      <Col flex={1} />
      <Col flex={22}>
        <Content className="doc-content">
          <Layout>
            <Sider breakpoint="md" collapsedWidth="0">
              <Menu
                mode="inline"
                openKeys={[activeDocPath]}
                selectedKeys={[activeDocPath]}
                style={{ height: "100%" }}
                items={generateMenuItems(docMenu)}
                onClick={({key}) => { setDocLoaded(false); navigate(key); } }
              />
            </Sider>
            <Layout
              style={{
                overflowX: "hidden"
              }}
            >
              <Header
                style={{
                  padding: "12px 48px",
                  background: "white",
                  height: "auto"
                }}
              >
                <LinkedBreadcrumb />
                <Divider style={{ marginBottom: "0" }} />
              </Header>
              <Content
                style={{
                  padding: "12px 48px 48px",
                  background: "white"
                }}
              >
                {docLoaded ? (
                  currentDocContent
                ) : (
                  <div style={{ textAlign: "center", margin: "50px" }}>
                    <Spin size="large" />
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Col>
      <Col flex={1} />
    </Row>
  );
}

/**
 * 根据json文件递归生成文档导航菜单项目
 *
 * @param source 文档导航菜单json文件
 */
function generateMenuItems(source) {
  source.sort((a, b) => {
    if ("key" in a && "key" in b) {
      return a.key - b.key;
    } else if ("key" in a) {
      return -1;
    } else if ("key" in b) {
      return 1;
    } else {
      return a.title < b.title ? -1 : 1;
    }
  });
  return source.map(menu => {
    menu.path = `/doc/${menu.name}`;
    if (menu.children) {
      return {
        key: menu.path,
        label: menu.title,
        children: generateMenuItems(menu.children),
      };
    } else {
      return {
        key: menu.path,
        label: menu.title,
      }
    }
  });
}

/**
 * 可导航的面包屑组件
 */
function LinkedBreadcrumb() {
  /**
  * 路由路径和面包屑标题的对应关系
  */
  const breadcrumbNameMap = new Map([
    ["/home", "主页"],
    ["/doc", "帮助文档"],
  ]);

  /**
   * 根据json文件生成面包屑导航项目
   *
   * @param source 文档导航菜单json文件
   */
  for (const item of docMenu) {
    breadcrumbNameMap.set(item.name, item.title)
  }

  const { pathname } = useLocation();
  const pathSnippets = pathname.split("/");

  const breadcrumbItems = [
    {
      title: "主页",
      href: "/#/home",
    },
    {
      title: "帮助文档",
      href: "/#/doc",
    },
  ];

  for (let i = 2; i < pathSnippets.length; i++) {
    breadcrumbItems.push({
      title: breadcrumbNameMap.get(pathSnippets[i]),
      href: "/#" + pathSnippets.slice(0, i + 1).join("/"),
    })
  }

  return (
    <Breadcrumb style={{ margin: "20px" }} items={breadcrumbItems} />
  );
}
