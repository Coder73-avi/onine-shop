import Breadcrumbs from "components/Breadcrumbs";
import ContactPage from "components/Pages/ContactPage";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <main>
        <Breadcrumbs location={[{ name: "Contact Us", path: "/contact" }]} />
        <ContactPage />
      </main>
    </>
  );
}
