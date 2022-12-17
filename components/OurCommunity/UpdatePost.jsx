import axios from "controllers/axios";
import Inputbox from "components/FormElement/Inputbox";
import Textarea from "components/FormElement/Textarea";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "./css/UpdatePost.module.css";
import DefaultImage from "components/DefaultImage";
import { BiImages } from "react-icons/bi";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";

const UpdatePost = ({ setEditBox }) => {
  const router = useRouter();
  const updateRef = useRef();
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [data, setData] = useState({
    title: "",
    discription: "",
    seller__name: "",
    price: "",
    phonenumber: "",
    address: "",
  });
  const [status, setStatus] = useState(null);

  const getData = useCallback(async () => {
    try {
      const { q } = router.query;
      const res = await axios.get("/getcommunitypostbytbname/pid/" + q);
      if (res.status == 200) {
        const {
          title,
          discription,
          seller__name,
          price,
          phonenumber,
          address,
          type,
        } = res.data[0];
        setData({
          title,
          discription,
          seller__name,
          price,
          phonenumber,
          address,
        });
        const newImages = res.data[0].imageSrc?.map((val) => {
          const url = res.data[0].host + val.url;
          const originalname = val.originalname;
          return { url, originalname, id: val.id };
        });
        setImageList(newImages);
        setStatus(type);

        console.log(newImages);
        return setLoading(false);
      }
    } catch (error) {
      return setLoading(false);
    }
  }, [router.query]);

  useEffect(() => {
    getData();
  }, [getData]);

  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    return setData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeFiles = (e) => {
    const files = e.target.files;
    if (imageFile?.length + imageList?.length > 15)
      return alert("You can upload maximum 20 images");

    for (let i = 0; i < files.length; i++) {
      setImageFile((prev) => [...prev, files[i]]);
    }
    return;
  };

  useEffect(() => {
    const hander = (e) => {
      if (!updateRef.current?.contains(e.target)) {
        // setEditBox(false);
        return router.push("/ourcommunity/mypost");
      }
    };
    addEventListener("mousedown", hander);
    return () => removeEventListener("mousedown", hander);
  }, [router, setEditBox]);

  const updatePost = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { q } = router.query;

      const formData = new FormData();
      const objName = Object.keys(data);

      for (let i = 0; i < objName.length; i++) {
        const name = objName[i];
        formData.append(name, data[name]);
      }

      for (let i = 0; i < imageFile?.length; i++) {
        formData.append("community-post-images", imageFile[i]);
      }

      const req = await axios.patch(`/updatecommunitypost/${q}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (req.status == 200) {
        return setLoading(false);
      }
    } catch (error) {
      return setLoading(false);
    }
  };
  return (
    <section className={css.updatePost}>
      <div
        className="overflow-y-auto border p-6 rounded-md shadow-md bg-white w-[50%]"
        ref={updateRef}
      >
        <form encType="multipart/form-data" onSubmit={updatePost}>
          <h1 className="text-2xl font-bold mb-4">Update Your Product</h1>
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
          <br />

          <Inputbox
            title={"Product title"}
            placeholder="Product title"
            name="title"
            value={data?.title}
            onChange={inputHandle}
          />
          <br />
          <Textarea
            title={"Discription"}
            placeholder="Discription"
            name="discription"
            row={8}
            value={data?.discription}
            onChange={inputHandle}
          />
          {status == "onsale" ? (
            <div>
              <br />
              <button
                type="button"
                className="flex flex-row justify-center py-2 px-4 mb-3 rounded-md gap-2 bg-blue-800 text-white font-bold"
              >
                <span className="text-lg">
                  <AiOutlineShopping />
                </span>
                For Sale
              </button>
              <Inputbox
                title="Fullname"
                placeholder="Fullname"
                name="seller__name"
                value={data?.seller__name}
                onChange={inputHandle}
              />

              <div className="my-4  grid md:grid-cols-2 gap-6">
                <div>
                  <Inputbox
                    title="Price"
                    placeholder="Price in Rs."
                    name="price"
                    onChange={inputHandle}
                    value={data?.price}
                  />
                  <span className="text-xs text-red-600">
                    Note: 10% service charge is deductaed
                  </span>
                </div>
                <Inputbox
                  title="Phone Number"
                  placeholder={"Write your phone number"}
                  name="phonenumber"
                  onChange={inputHandle}
                  value={data?.phonenumber}
                />
              </div>
              <Inputbox
                title="Full Address"
                placeholder={"Address of Product"}
                name="address"
                onChange={inputHandle}
                value={data?.address}
              />
              <span className="text-xs text-red-600">
                Note: Must write the currect location of yours
              </span>
              <br />
            </div>
          ) : null}

          <div className={css.btn__group}>
            <Link href="/ourcommunity/mypost">
              <button type="button">close</button>
            </Link>
            <button type="submit">update</button>
          </div>
        </form>
      </div>
    </section>
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

export default UpdatePost;
