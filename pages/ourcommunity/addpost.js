import Breadcrumbs from "components/Breadcrumbs";
import AddNewPost from "components/OurCommunity/AddNewPost";
import Head from "next/head";

export default function addpost() {
  return (
    <>
      <Head>
        <title>Add Post</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Our community", path: "/ourcommunity" },
            { name: "Add Post", path: "/addpost" },
          ]}
        />
        <AddNewPost />
      </main>
    </>
  );
}
