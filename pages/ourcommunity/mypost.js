import Breadcrumbs from "components/Breadcrumbs";
import CommunityPostCard from "components/OurCommunity/CommunityPostCard";
import Head from "next/head";
import Link from "next/link";
import axios from "controllers/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UpdatePost from "components/OurCommunity/UpdatePost";

export default function Mypost({ communitypost }) {
  const router = useRouter();
  const [editBox, setEditBox] = useState(false);

  useEffect(() => {
    if (router.query?.hasOwnProperty("q")) {
      setEditBox(true);
    } else {
      setEditBox(false);
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>My-Posts</title>
      </Head>
      <main>
        {editBox ? <UpdatePost setEditBox={setEditBox} /> : null}
        <Breadcrumbs
          location={[
            { name: "Our community", path: "/ourcommunity" },
            { name: "My Post", path: "/ourcommunity/mypost" },
          ]}
        />

        <section className="columns-3 gap-12 w-[90%] mx-auto mb-4">
          {communitypost?.map((val, indx) => {
            return (
              <div key={indx} className="mb-6 shadow-lg">
                <Link href={"/ourcommunity/mypost?q=" + val?.pid}>
                  <a className="w-full min-h-[300px]  ">
                    <CommunityPostCard data={val} />
                  </a>
                </Link>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const req = await axios.get("/getcommunitypost/all");
    return { props: { communitypost: req.data } };
  } catch (error) {
    return { props: { communitypost: [] } };
  }
}
