import DefaultImage from "components/DefaultImage";
import Inputbox from "components/FormElement/Inputbox";
import Textarea from "components/FormElement/Textarea";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import css from "./css/Addnewpsot.module.css";
import axios from "controllers/axios";
import Loading from "components/Loading";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const AddNewPost = ({ setFormShow, formStatus = "new", postId }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const [productStatus, setProductStatus] = useState("");
  const [data, setData] = useState({
    title: "",
    discription: "",
    seller__name: "",
    price: "",
    phonenumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const onChangeFiles = (e) => {
    const files = e.target.files;
    setImageFile([]);
    if (files.length > 20) return alert("You can upload maximum 20 images");

    for (let i = 0; i < files.length; i++) {
      setImageFile((prev) => [...prev, files[i]]);
    }
    return;
  };

  const validation = () => {
    const numRegx = new RegExp(/^\d+$/);
    const errorsObj = {};

    console.log();
    if (data?.title?.length == 0) errorsObj.title = "Title is required !!!";
    if (formStatus !== "update") {
      if (imageFile == null || imageFile?.length == 0)
        errorsObj.imagefile = "Minimun one image is required !!!";
    }

    if (data?.discription?.length < 10)
      errorsObj.discription = "Discription must be mininum 10 characters !!!";

    if (productStatus == "onsale") {
      if (data?.seller__name?.length < 3)
        errorsObj.seller__name = "Fullname must be minmum 3 characters !!!";

      if (data?.phonenumber?.length == 0) {
        errorsObj.phonenumber = "Phonenumber is required !!!";
      } else {
        if (!data?.phonenumber.match(numRegx)) {
          errorsObj.phonenumber = "Phonenumber must be number";
        } else {
          if (
            data?.phonenumber.length <= 10 ||
            data?.phonenumber.length >= 15
          ) {
            errorsObj.phonenumber =
              "Phonenumber must be min 10 and max 15 numbers";
          }
        }
      }

      if (data?.price?.length == 0) errorsObj.price = "Price is required !!!";
      if (data?.price?.length !== 0) {
        if (!data?.price?.match(numRegx)) {
          errorsObj.price = "Price must be nubmer";
        }
      }

      if (data?.address?.length == 0)
        errorsObj.address = "Address is required !!!";

      if (data?.address?.length !== 0 && data?.address?.length < 4)
        errorsObj.address = "Minmum address character is 4 !!!";
    }

    console.log(errorsObj);

    return errorsObj;
  };

  const sendCommunityPost = async (e, type) => {
    try {
      e.preventDefault();

      if (Object.keys(validation()).length !== 0)
        return setErrors(validation());

      setErrors({});
      setLoading(true);
      if (type == "share") {
        setData({
          ...data,
          seller__name: "",
          price: "",
          phonenumber: "",
          address: "",
        });
      }

      const formData = new FormData();
      const objName = Object.keys(data);

      for (let i = 0; i < objName.length; i++) {
        const name = objName[i];
        formData.append(name, data[name]);
      }

      for (let i = 0; i < imageFile?.length; i++) {
        formData.append("community-post-images", imageFile[i]);
      }
      formData.append("type", type);

      const send = await axios.post("/addcommunitypost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (send.status == 201) {
        setData({
          title: "",
          discription: "",
          firstname: "",
          price: "",
          phonenumber: "",
          address: "",
        });
        setImageFile([]);
        setProductStatus("");
        return setLoading(false);
      }
    } catch (error) {
      console.log(error);
      return setLoading(false);
    }
  };

  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    return setData({ ...data, [name]: value });
  };

  const ShowError = ({ name }) => {
    if (errors.hasOwnProperty(name)) {
      return (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors[name]}
        </span>
      );
    }
    return false;
  };

  // for update
  const getData = useCallback(async () => {
    try {
      const req = await axios.get("/getcommunitypostbytbname/pid/" + postId);
      if (req.status == 200) {
        const {
          title,
          discription,
          seller__name,
          price,
          phonenumber,
          imageSrc,
          address,
          type,
          host,
        } = req.data[0];
        setData({
          title,
          discription,
          seller__name,
          price,
          phonenumber,
          address,
        });
        setProductStatus(type);
        const newImages = imageSrc?.map((val) => {
          const url = host + val.url;
          const originalname = val.originalname;
          return { url, originalname, id: val.id };
        });
        setImageList(newImages);
        console.log(">>res", req.data);
        return setLoading(false);
      }
    } catch (error) {
      return setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (formStatus == "update" && postId !== null) getData();
  }, [formStatus, getData, postId]);

  // update data
  const updateCommunityPost = async (e, type) => {
    try {
      e.preventDefault();

      if (Object.keys(validation()).length !== 0)
        return setErrors(validation());

      if (type == "share") {
        setData({
          ...data,
          seller__name: "",
          price: "",
          phonenumber: "",
          address: "",
        });
      }

      setErrors({});
      setLoading(true);
      const formData = new FormData();
      const objName = Object.keys(data);

      for (let i = 0; i < objName.length; i++) {
        const name = objName[i];
        formData.append(name, data[name]);
      }

      for (let i = 0; i < imageFile?.length; i++) {
        formData.append("community-post-images", imageFile[i]);
      }
      formData.append("type", type);

      const send = await axios.patch(
        "/updatecommunitypost/" + postId,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (send.status == 200) {
        setImageFile([]);
        return setLoading(false);
      }
    } catch (error) {
      console.error(error);
      return setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <section className="bg-white absolute z-40 top-0 left-0 w-full overflow-x-auto">
        <div className="border w-[70%] mx-auto rounded-md p-6 my-6 shadow-xl relative">
          <button
            className="absolute top-4 right-5 text-2xl"
            onClick={() => setFormShow(false)}
          >
            <IoClose />
          </button>
          <h1 className="pb-1  mb-3 text-left text-xl uppercase font-semibold text-teal-700 border-b">
            Add New Post
          </h1>

          <form encType="multipart/form-data" className="pt-3">
            {/* <PreviewImages imageFile={imageFile} /> */}
            <PreviewImages
              imageFile={imageList}
              setImageFile={setImageList}
              livePrev={imageFile}
              setLivePrev={setImageFile}
            />
            <label htmlFor="imageList" className={css.uploadBtn}>
              <span className="text-lg">
                <BiImages />
              </span>
              Choose Images
            </label>
            <input
              type="file"
              name="image__list"
              id="imageList"
              className="hidden"
              onChange={onChangeFiles}
              multiple
            />
            {<ShowError name="imagefile" />}

            <br />
            <Inputbox
              title="Product Name"
              placeholder={"Write product name"}
              name="title"
              onChange={inputHandle}
              value={data?.title}
              required
            />
            {<ShowError name="title" />}
            <br />
            <Textarea
              title="Discription of Product"
              placeholder={"Write the information of product"}
              name="discription"
              onChange={inputHandle}
              value={data?.discription}
            />
            {<ShowError name="discription" />}
            <br />
            <div className="flex flex-row gap-4  items-center my-3">
              <button
                type={productStatus == "share" ? "submit" : "button"}
                className={`${css.optionBtn} ${
                  productStatus == "share" ? css.active : null
                }`}
                onClick={
                  formStatus !== "update"
                    ? (e) => {
                        setProductStatus("share");
                        return sendCommunityPost(e, "share");
                      }
                    : (e) => {
                        setProductStatus("share");
                        return updateCommunityPost(e, "share");
                      }
                }
              >
                {productStatus == "onsale" || formStatus !== "update" ? (
                  <span className="text-lg">
                    <FaShare />
                  </span>
                ) : null}
                {productStatus == "onsale" || formStatus !== "update"
                  ? "Share"
                  : "Update"}
              </button>
              <button
                type="button"
                className={`${css.optionBtn} ${
                  productStatus == "onsale" ? css.active : null
                }`}
                onClick={() => setProductStatus("onsale")}
              >
                <span className="text-lg">
                  <AiOutlineShopping />
                </span>
                For Sale
              </button>
            </div>
            {productStatus == "onsale" ? (
              <div>
                <div>
                  <Inputbox
                    title="Fullname"
                    placeholder="Fullname"
                    name="seller__name"
                    value={data?.seller__name}
                    onChange={inputHandle}
                  />
                  {<ShowError name="seller__name" />}
                </div>
                <div className="my-4  grid md:grid-cols-2 gap-6">
                  <div>
                    <Inputbox
                      title="Price"
                      placeholder="Price in Rs."
                      name="price"
                      onChange={inputHandle}
                      value={data?.price}
                    />
                    {<ShowError name="price" />}

                    <span className="text-xs text-red-600">
                      Note: 10% service charge is deductaed
                    </span>
                  </div>
                  <div>
                    <Inputbox
                      title="Phone Number"
                      placeholder={"Write your phone number"}
                      name="phonenumber"
                      onChange={inputHandle}
                      value={data?.phonenumber}
                    />
                    {<ShowError name="phonenumber" />}
                  </div>
                </div>
                <Inputbox
                  title="Full Address"
                  placeholder={"Address of Product"}
                  name="address"
                  onChange={inputHandle}
                  value={data?.address}
                />
                {<ShowError name="address" />}

                <br />
                <button
                  type={productStatus !== "share" ? "submit" : "button"}
                  onClick={
                    formStatus == "new"
                      ? (e) => sendCommunityPost(e, "onsale")
                      : (e) => updateCommunityPost(e, "onsale")
                  }
                  className={css.saleSubmitBtn}
                >
                  {formStatus == "update" && productStatus == "onsale"
                    ? "Update"
                    : "Publish"}
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
};

const PreviewImages = ({
  imageFile = null,
  setImageFile = null,
  livePrev = null,
  setLivePrev = null,
}) => {
  const filterImage = async (id, imageType) => {
    if (imageType == "liveprev") {
      return setLivePrev(livePrev.filter((item, indx) => indx !== id));
    }

    const res = await axios.delete(`/deletecommunitypostimage/${id}`);
    if (res.status == 200)
      return setImageFile(imageFile.filter((item) => item.id !== id));
  };

  return (
    <div className="grid md:grid-cols-4 mb-3 border-2 border-dashed rounded-md p-2 min-h-[100px] gap-4">
      {livePrev?.map((val, indx) => {
        let url;
        if (typeof val == "object") {
          url = URL.createObjectURL(val);
        }
        return (
          <div
            key={indx}
            className="mb-3 hover:opacity-80 cursor-pointer relative h-[130px] w-full"
            onClick={() => filterImage(indx, "liveprev")}
          >
            {/* <DefaultImage src={url} /> */}
            <Image
              src={url}
              alt={val.originalname}
              layout="fill"
              objectFit="cover"
              objectPosition={"center"}
            />
          </div>
        );
      })}

      {imageFile !== null
        ? imageFile?.map((val, indx) => {
            const url = val.url;
            return (
              <div
                key={indx}
                className="mb-3 hover:opacity-80 cursor-pointer relative h-[130px] w-full"
                onClick={() => filterImage(val.id, "old")}
              >
                {/* <DefaultImage src={url} /> */}
                <Image
                  src={url}
                  alt={val.originalname}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={"center"}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default AddNewPost;
