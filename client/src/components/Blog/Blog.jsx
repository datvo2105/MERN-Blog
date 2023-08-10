import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog_id, title, summary, cover, createTime, author }) => {
  const time = new Date(createTime);
  const formatTime =
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds() +
    " - " +
    time.getDate() +
    "/" +
    time.getMonth() +
    "/" +
    time.getFullYear();
  return (
    <li>
      <Link to={`/blog/${blog_id}`}>
        <div className="grid grid-cols-12 w-full justify-between mb-10 group">
          <div className="col-span-3">
            <div className="h-52 w-52 relative flex items-center ">
              <img
                src={`http://127.0.0.1:8080/${cover}`}
                alt=""
                className=" bg-gray-50"
              />
            </div>
          </div>
          <div className="col-span-9">
            <div className="flex flex-col -ml-16">
              <div className="relative">
                <h3 className="text-4xl font-bold leading-8 text-gray-900 group-hover:text-gray-600">
                  <span className="absolute inset-0"></span>
                  {title}
                </h3>
                <div className="flex items-center rounded-xl overflow-hidden mt-3 bg-gray-100 w-fit text-sm">
                  <p className="relative z-10 bg-gray-600 rounded-r-xl px-2 py-1.5 font-medium text-gray-50">
                    {author.name}
                  </p>
                  <time className="text-gray-500 ml-1 py-1.5 pr-2">
                    {formatTime}
                  </time>
                </div>
                <p className="mt-4 line-clamp-5 text-justify text-lg leading-6 text-gray-600">
                  {summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Blog;
