import React, { useCallback, useEffect, useState } from "react";
import css from "./css/mypost.module.css";
import Loading from "components/Loading";
import axios from "controllers/axios";
import Image from "next/image";
import { formatingNumber } from "controllers/otherFunctions";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/router";
import AddNewPost from "components/OurCommunity/AddNewPost";
import defaultImage from "images/default-image-300x300.png";

const MyPost = () => {
  const router = useRouter();
  const tableHead = ["Image", "Tittle", "price", "type", "status", "action"];
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState("new");
  const [postId, setPostId] = useState(null);
  const [formShow, setFormShow] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const req = await axios.get("/getcommunitypost/all");
      if (req.status == 200) {
        setData(req.data);
        return setLoading(false);
      }
    } catch (error) {
      return setLoading(false);
    }
  }, [formShow]);

  const deletePost = async (pid) => {
    try {
      setLoading(true);
      const req = await axios.delete("/deletecommunitypost/" + pid);
      if (req.status == 200) {
        setData(data.filter((item) => item.pid !== pid));
        return setLoading(false);
      }
    } catch (error) {
      return setLoading(false);
    }
  };

  const editPost = (pid) => {
    const checkStatusPost = data?.some(
      (item) => item.pid == pid && item.status == "onreview"
    );
    if (checkStatusPost)
      return alert("You cann't edit your product is under review !!!");
    setPostId(pid);
    setFormStatus("update");
    return setFormShow(true);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {formShow ? (
        <AddNewPost
          setFormShow={setFormShow}
          formStatus={formStatus}
          postId={postId}
        />
      ) : null}
      <div className="flex flex-row justify-between items-center mb-3">
        <h1 className="text-xl font-bold">My Posts</h1>
        <button
          className="px-3 py-2 bg-blue-700 text-white rounded-md text-sm font-bold hover:opacity-70"
          onClick={() => {
            setFormShow(true);
            return setFormStatus("new");
          }}
        >
          Add New
        </button>
      </div>
      <hr />
      {loading ? <Loading /> : null}
      {/* data container */}
      <div
        className="mt-4 overflow-x-auto max-h-[400px] pb-24"
        id={css.tableContainer}
      >
        <table className="text-sm text-gray-600 w-full">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              {tableHead.map((val, indx) => (
                <th
                  scope="col"
                  className="capitalize text-left px-2 py-3 border-b "
                  key={indx}
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data?.map((val, indx) => (
              <tr key={indx} className="my-3">
                <td className=" px-2 py-1 ">
                  <div className="relative h-20 w-20 rounded-sm overflow-hidden">
                    <Image
                      src={
                        val?.imageSrc?.length !== 0
                          ? val?.host + val?.imageSrc[0]?.url
                          : defaultImage
                      }
                      alt="product-image"
                      layout="fill"
                      objectFit="cover"
                      objectPosition={"center"}
                    />
                  </div>
                </td>
                <td className="font-bold px-2 py-1">
                  {val?.title?.length !== 0
                    ? val?.title.slice(0, 15)
                    : "(NONE)"}
                </td>
                <td className=" px-2 py-1">
                  {val?.type == "share"
                    ? "(None)"
                    : `Rs. ${formatingNumber(val?.price)}`}
                </td>
                <td className=" px-2 py-1">
                  <button
                    className={`py-1.5 px-3 ${
                      val?.type == "onsale" ? "bg-orange-400" : "bg-blue-400"
                    } text-xs font-bold text-white rounded-md`}
                  >
                    {val?.type || "(None)"}
                  </button>
                </td>
                <td className=" px-2 py-1">{val?.status || "(None)"}</td>
                <td className=" px-2">
                  <div className={css.dropHead}>
                    <BsThreeDots />
                    <div className={css.dropDown}>
                      <button
                        className={css.dropDownLink}
                        onClick={() => editPost(val?.pid)}
                      >
                        Edit
                      </button>
                      <button
                        className={css.dropDownLink}
                        onClick={() =>
                          router.push(
                            "/ourcommunity/" + val?.title.replaceAll(" ", "-")
                          )
                        }
                      >
                        view
                      </button>
                      <button
                        className={css.dropDownLink}
                        onClick={() => deletePost(val?.pid)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyPost;
