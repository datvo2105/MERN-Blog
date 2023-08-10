import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFiles] = useState("");
  const { blog_id } = useParams();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `/blog/${blog_id}`,
    }).then((res) => {
      setTitle(res.data.title);
      setSummary(res.data.summary);
      setContent(res.data.content);
    });
  }, []);

  const handleEditBlog = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("blog_id", blog_id);
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file?.[0]) data.set("files", file[0]);
    try {
      await axios({
        method: "put",
        url: "/blog",
        data: data,
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) return setRedirect(true);
      });
    } catch (error) {
      alert("Create fail: " + error.message);
    }
  };
  if (redirect) return <Navigate to={`/blog/${blog_id}`} />;

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 border-t border-gray-200 pt-10 ">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-8 text-center text-6xl font-bold leading-9 tracking-tight text-gray-900">
                  Edit Blog
                </h2>
              </div>

              <div className="mt-12 ">
                <form action="" method="POST" onSubmit={handleEditBlog}>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                          <label
                            htmlFor="blog"
                            className="block text-2xl  font-medium leading-6 text-gray-900"
                          >
                            Title
                          </label>
                          <div className="mt-2">
                            <input
                              id="title"
                              name="title"
                              type="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="blog"
                            className="block text-2xl  font-medium leading-6 text-gray-900"
                          >
                            Summary
                          </label>
                          <div className="mt-2">
                            <input
                              id="summary"
                              name="summary"
                              type="summary"
                              value={summary}
                              onChange={(e) => setSummary(e.target.value)}
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="blog"
                            className="block text-2xl font-bold leading-6 text-gray-900"
                          >
                            Cover photo
                          </label>
                          <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <input
                                type="file"
                                className="text-lg"
                                onChange={(e) => setFiles(e.target.files)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-full">
                          <ReactQuill
                            modules={modules}
                            formats={formats}
                            value={content}
                            onChange={(newValue) => setContent(newValue)}
                          ></ReactQuill>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="flex w-1/4 justify-center border border-gray-800 rounded-md bg-gray-800 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                    >
                      Edit
                    </button>
                    <Link
                      to={`/blog/${blog_id}`}
                      className="flex w-1/4 justify-center border border-red-600 rounded-md bg-red-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-white hover:border-red-600 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditBlog;
