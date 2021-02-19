import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import DocPage from "./components/docPage/docPage";
import {
  HomePageHeader,
  HomePageContent,
  HomePageFooter
} from "./components/homePage/homePageLayout";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <HomePageHeader />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomePageContent} />
        <Route path="/doc" component={DocPage} />
        <HomePageFooter />
      </Layout>
    );
  }
}
