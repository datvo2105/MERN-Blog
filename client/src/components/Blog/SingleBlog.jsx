import React, { useContext, useEffect, useState } from "react";
import Header from "../../layouts/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const SingleBlog = () => {
  const { blog_id } = useParams();
  const [detail, setDetail] = useState(null);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    axios({
      method: "get",
      url: `/blog/${blog_id}`,
    }).then((res) => {
      setDetail(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Header />
      {detail !== null ? (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-10">
              <div className="flex flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="mx-auto w-full h-60 rounded-t-lg overflow-hidden">
                  <img
                    className="object-cover object-center h-full w-full"
                    src={`http://127.0.0.1:8080/${detail.cover}`}
                    alt=""
                  />
                </div>
                <div className="mt-2">
                  <div className="w-full mb-4">
                    <h2 className="w-full uppercase text-4xl text-left font-bold leading-8 tracking-wide text-gray-900">
                      {detail.title}
                    </h2>
                    <div className="w-full my-3 flex justify-end">
                      {profile.id === detail.author._id && (
                        <Link
                          to={`/blog/edit/${detail._id}`}
                          className="rounded-md bg-gray-300 px-3.5 py-2.5 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          Edit Blog
                        </Link>
                      )}
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: detail.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>error</div>
      )}
    </React.Fragment>
  );
};

export default SingleBlog;
