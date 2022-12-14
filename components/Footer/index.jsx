import DefaultImage from "components/DefaultImage";
import React, { useState, useCallback, useEffect } from "react";
import css from "./style.module.css";

import khalti from "images/khalti.png";
import esewa from "images/esewa.webp";
import imepay from "images/imepay.png";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import axios from "controllers/axios";

const Footer = () => {
  const [topCategorys, setTopCategorys] = useState([]);

  const getTopCategorys = useCallback(async () => {
    try {
      const getData = await axios.get("/gettopsellingcategorys");
      if (getData.status == 200) {
        setTopCategorys(getData.data);
      }
    } catch (err) {
      return err;
    }
  }, []);
  useEffect(() => {
    getTopCategorys();
  }, [getTopCategorys]);
  return (
    <footer className={css.footer}>
      <article className="xl:container xl:mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div>
          <div className={css.footer__title}>Company</div>
          <div className={css.list}>
            <Link href="/about">
              <a>About Us</a>
            </Link>
            <Link href="/service">
              <a>Our Service</a>
            </Link>
            <Link href="/privacy">
              <a>Privacy Policy</a>
            </Link>
          </div>
        </div>
        <div>
          <div className={css.footer__title}>Get Help</div>
          <div className={css.list}>
            <Link href="/">
              <a>FAQ</a>
            </Link>
            <Link href="/shop">
              <a>Shipping</a>
            </Link>
            <Link href="/">
              <a>Returns</a>
            </Link>
            <Link href="/myaccount?name=my-orders">
              <a>Order Status</a>
            </Link>
            <Link href="/myaccount?name=payment-method">
              <a>Payment Method</a>
            </Link>
          </div>
        </div>
        <div>
          <div className={css.footer__title}>Top Categorys</div>
          <div className={css.list}>
            {topCategorys?.map((val, indx) => (
              <Link href={`/categorys/${val}`} key={indx}>
                <a className="capitalize">{val}</a>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <div className={css.footer__title}>Follow Us</div>
          <div className="flex flex-row items-center gap-3 mb-3">
            <div className={css.socialIcon}>
              <FaFacebookF />
            </div>
            <div className={css.socialIcon}>
              <AiOutlineTwitter />
            </div>
            <div className={css.socialIcon}>
              <AiOutlineInstagram />
            </div>
          </div>

          <div className={css.footer__title}>Payment Methods</div>
          <div className="flex flex-row flex-wrap gap-2 items-center my-2">
            <div className={css.imageDiv}>
              <DefaultImage src={khalti} alt="khalti" />
            </div>
            <div className={css.imageDiv}>
              <DefaultImage src={esewa} alt="esewa" />
            </div>
            <div className={css.imageDiv}>
              <DefaultImage src={imepay} alt="imepay" />
            </div>
          </div>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
