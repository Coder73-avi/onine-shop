import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import Head from "next/head";
import Link from "next/link";
import css from "styles/Ourcommunit.module.css";
import CommunityPostCard from "components/OurCommunity/CommunityPostCard";

export default function ourcommunity({ communitypost }) {
  return (
    <>
      <Head>
        <title>Ourcommunity</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[{ name: "Our community", path: "/ourcommunity" }]}
        />
        
        <section className="columns-3 gap-12 w-[90%] mx-auto my-4">
          {communitypost.map((val, indx) => {
            return (
              <div key={indx} className="mb-6 shadow-lg">
                <Link href={`/ourcommunity/${val?.title.replaceAll(" ", "_")}`}>
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
    const req = await axios.get("/getcommunitypost/user");
    return { props: { communitypost: req.data } };
  } catch (error) {
    return { props: { communitypost: [] } };
  }
}
