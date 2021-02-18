import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import docMenu from './menu.json'
import './docPage.css'

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class DocPage extends Component {
  /**
   * 根据json文件递归生成文档导航菜单项目
   */
  generateMenuItems(source) {
    return (
      source.map((menu, index) => {
        if (menu.children) {
          return (
            <SubMenu key={menu.key} title={menu.title}>
              {this.generateMenuItems(menu.children)}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={menu.key}>
              <Link to={menu.path}>
                {menu.title}
              </Link>
            </Menu.Item>
          )
        }
      })
    )
  }

  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to={'/home'}>主页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={'/doc'}>帮助文档</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md={4}>
            <Layout
              className="site-layout-background"
              style={{ padding: '0' }}
            >
              <Sider
                className="site-layout-background"
                width={'100%'}
                breakpoint={'md'}
                collapsedWidth={0}
              >
                <Menu
                  mode="inline"
                  defaultOpenKeys={['0']}
                  style={{ height: '100%' }}
                >
                  {this.generateMenuItems(docMenu)}
                </Menu>
              </Sider>
            </Layout>
          </Col>
          <Col md={20}>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
                background: 'white'
              }}
            >
              Content
            </Content>
          </Col>
        </Row>
      </Content>
    )
  }
}
