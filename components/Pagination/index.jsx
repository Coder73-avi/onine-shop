import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Pagination = ({ noOfPage }) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (router.query.hasOwnProperty("page")) {
      setActivePage(Number(router.query.page));
    } else {
      setActivePage(1);
    }
  }, [router]);

  return (
    <div className={css.pagination__div}>
      <button
        className={css.pagination__btn}
        disabled={activePage == 1 ? true : false}
        onClick={() => router.push(`/shop?page=${activePage - 1}`)}
      >
        Prev
      </button>
      {Array(noOfPage)
        .fill()
        .map((val, indx) => {
          // if (indx + 1 > 6 && indx + 1 < 9)
          //   return <button key={indx}>.</button>;
          return (
            <Link href={`/shop?page=${indx + 1}`} key={indx}>
              <button
                className={`${css.pagination__btn} ${
                  indx + 1 == activePage ? css.active : null
                }`}
              >
                {indx + 1}
              </button>
            </Link>
          );
        })}
      <button
        className={css.pagination__btn}
        disabled={activePage == noOfPage ? true : false}
        onClick={() => router.push(`/shop?page=${activePage + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
