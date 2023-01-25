import React from "react";
import PageBanner from "./PageBanner";

import contactImage from "images/contactus-banner.jpg";
import DefaultImage from "components/DefaultImage";
import logo from "images/logo_baseline.png";
import Inputbox from "components/FormElement/Inputbox";
import Textarea from "components/FormElement/Textarea";
import { useState } from "react";

const ContactPage = () => {
  return (
    <>
      <PageBanner title="Contact Us" bgImage={contactImage} />

      <section className="bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-4 p-6">
          <div className="bg-gray-100 flex flex-col justify-center items-center gap-5 p-5 text-gray-600 tracking-wider">
            <div className="h-32 w-32">
              <DefaultImage src={logo} alt="logo" />
            </div>
            <h1 className="text-lg capitalize font-semibold">
              YOU CAN <span className="text-red-200">CONTACT</span> US DIRECTLY
              AT :
            </h1>
            <div>contact@onlineshop.store</div>
            <p className="text-base w-1/2 text-center">
              Or you write us via the contact form. We answer as quick as
              possible.
            </p>
          </div>
          <div className="p-3">
            <ContactForm />
          </div>
        </div>

        <div className="relative w-full h-[80vh]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.066841307716!2d85.33272927395524!3d27.684328926509085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1940d3991931%3A0xb7e53faaaeb31f5!2sRaeela%20Production!5e0!3m2!1sen!2snp!4v1672768103751!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

const ContactForm = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    return setData((prev) => ({ ...prev, [name]: value }));
  };

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form method="post" onSubmit={sendMessage}>
      <h1 className="capitalize text-lg font-bold tracking-widest py-3">
        Get in Touch
      </h1>
      <Inputbox
        name="fullname"
        placeholder={"Fullname"}
        onChange={inputHandle}
      />
      <Inputbox name="email" placeholder={"Email"} onChange={inputHandle} />
      <Inputbox name="subject" placeholder={"Subject"} onChange={inputHandle} />
      <Textarea
        name="message"
        placeholder={"Write your message here .... "}
        row={6}
        onChange={inputHandle}
      />

      <button className="px-5 py-2 text-center bg-blue-500 text-white hover:bg-blue-700 my-4 rounded-md">
        Submit
      </button>
    </form>
  );
};
