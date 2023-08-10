import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";

const ListBlog = () => {
  const [listBlog, setListBlog] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/blog",
    }).then((res) => setListBlog(res.data));
  }, []);

  return (
    <React.Fragment>
      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 border-t border-gray-200 pt-10 ">
            <ul>
              {listBlog.map((blog) => {
                return (
                  <Blog
                    key={blog._id}
                    blog_id={blog._id}
                    title={blog.title}
                    summary={blog.summary}
                    cover={blog.cover}
                    createTime={blog.createdAt}
                    author={blog.author}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListBlog;
