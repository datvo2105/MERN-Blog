import React from "react";
import Header from "../layouts/Header";
import ListBlog from "../components/Blog/ListBlog";

const Homepage = () => {
  return (
    <React.Fragment>
      <Header />
      <ListBlog />
    </React.Fragment>
  );
};

export default Homepage;
