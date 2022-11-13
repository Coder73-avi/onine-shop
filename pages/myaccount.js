import Breadcrumbs from "components/Breadcrumbs";
import MyAccount from "components/MyAccount";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "controllers/axios";

export default function Myaccount() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Breadcrumbs location={[{ name: "My Account", path: "/myaccount" }]} />
      <main className="w-[98%] lg:w-[85%] mx-auto">
        <MyAccount router={router} />
      </main>
    </>
  );
}
