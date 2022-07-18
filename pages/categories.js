import React from "react";
import { useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import { useRouter } from "next/router";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Cards from "../components/Cards";

function Categories({ thCate }) {
  const { thCat, setCat, G_styles } = useContext(AmazonContext);
  const router = useRouter();
  const query = router.query;
  const theCategory = query.cat;
  setCat(theCategory);
  const styles = {
    container: ` w-full h-full `,
    catBody: `  h-[500px] p-6 md:mx-16 lg:mx-16`,

    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[0px]`,
  };

  return (
    <div>
      <TopHeader />
      <Header />
      <div className={styles.container}>
        <div className={styles.catBody}>
          {" "}
          {/* <div className={styles.title}>Categories ::: </div> */}
          <span className={G_styles.page}>PRODUCT :: {thCat}</span>
          <Cards thCate={true} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
