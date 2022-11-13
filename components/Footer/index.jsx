import DefaultImage from "components/DefaultImage";
import React from "react";
import css from "./style.module.css";

import khalti from "images/khalti.png";
import esewa from "images/esewa.webp";
import imepay from "images/imepay.png";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <article className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 ">
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
              <a>Payment Option</a>
            </Link>
          </div>
        </div>
        <div>
          <div className={css.footer__title}>Online Shop</div>
          <div className={css.list}>
            <Link href="/">
              <a>Bed Room</a>
            </Link>
            <Link href="/">
              <a>Living Room</a>
            </Link>
            <Link href="/">
              <a>Lighting</a>
            </Link>
          </div>
        </div>
        <div className="md:col-span-2">
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
