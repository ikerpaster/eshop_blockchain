import React, { useState } from "react";
import { useContext } from "react";
import { AmazonContext } from "../../context/AmazonContext";
import { useRouter } from "next/router";
import { Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
import CartModal from "./buy/CartModal";
function Productdetails() {
  const router = useRouter();
  const { setProdID, singleAsset, count_item, setCount_item, G_styles } =
    useContext(AmazonContext);

  const query = router.query;
  const prodiD = query.product_item;
  setProdID(prodiD);
  const styles = {
    container: ` w-full h-full `,
    catBody: ` h-full p-6 md:mx-16 lg:mx-16 `,
    catContent: `w-full md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-5`,
    catDetailsInfo: `pb-32 md:p-8`,
    leftImgSlideContent: `w-full bg-white max-h-[500px] flex justify-start`,
    images: `hidden  md:block lg:block h-full md:w-[20%] lg:w-[20%] inline-block pt-4 text-black overflow-hidden`,
    imageDetails: `h-full w-full md:w-[80%]  overflow-hidden p-6`,
    subImage: `w-fit h-fit md:h-[100px] lg:h-[100px] bg-black  m-2 border-2 border-white rounded-md overflow-hidden hover:cursor-pointer `,
    imgSub: `h-fit transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300`,
    bodyImage: `border-2 shadow-md shadow-black md:shadow-none lg:shadow:none object-cover  h-fit w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 md:hover:scale-110  duration-1000 rounded-md md:pt-3 `,
    minusOP: `font-bold text-2xl ml-2 cursor-pointer`,
    plusOP: `font-bold text-2xl mr-2 cursor-pointer`,
    countEL: `mt-px font-bold text-2xl`,
    quantityOB: `w-[80%] bg-gray-200 flex justify-between p-2 rounded`,
    clientBTN: `grid grid-cols-3 gap-2 mt-4`,
    inStock: `text-green-600 text-sm font-bold`,
    addToCartBTN: `w-full cursor-pointer text-center  cursol-pointer text-md text-white bg-gradient-to-r from-orange-400 to-blue-500 hover:from-gray-500 hover:to-pink-500   rounded-full leading-10 pt-px`,
    payBTN: `w-full cursor-pointer text-center  cursol-pointer text-md text-white rounded-md  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500   leading-10 pt-px`,
    singlePageAdvBanner: `w-fit object-cover rounded-full`,
    sameInfoToClientAboutThisProd: `border border-t-1 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700 text-sm`,
    singlePROD_Title: `mt-10 text-lg font-bold md:text-2xl lg:text-2xl font-serif text-gray-500 `,
    PROD_HASH: `font-thin text-[9px] block my-2`,
  };

  const [thImagex, setImagex] = useState("");
  const SUBIMAGE = ({ onClick, src }) => {
    return (
      <div className={styles.subImage} onClick={onClick}>
        <img className={styles.imgSub} src={src} />
      </div>
    );
  };

  const { openModal, isModalOpen, closeModal } = useModal();

  const minus_op = () => {
    setCount_item((e) => {
      return (e = e - 1);
    });
  };
  const plus_op = () => {
    setCount_item((e) => {
      return (e = e + 1);
    });
  };
  return (
    <div>
      {singleAsset?.map((e) => {
        return (
          <div className={styles.container}>
            <span className={G_styles.page}>PRODUCT</span>
            <hr />
            <div className={styles.catBody}>
              {" "}
              <div className={styles.catContent}>
                <div className={styles.leftImgSlideContent}>
                  <div className={styles.images}>
                    <SUBIMAGE
                      onClick={() => {
                        setImagex(e.attributes.src);
                      }}
                      src={e.attributes.src}
                    />

                    <SUBIMAGE
                      onClick={() => {
                        setImagex(e.attributes.img1);
                      }}
                      src={e.attributes.img1}
                    />

                    <SUBIMAGE
                      onClick={() => {
                        setImagex(e.attributes.img2);
                      }}
                      src={e.attributes.img2}
                    />

                    <SUBIMAGE
                      onClick={() => setImagex(e.attributes.img3)}
                      src={e.attributes.img3}
                    />
                  </div>

                  <div className={styles.imageDetails}>
                    <img
                      src={thImagex == "" ? e.attributes.src : thImagex}
                      className={styles.bodyImage}
                    />
                    <div
                      className="w-full h-fit  md:hidden lg:hidden
                    grid grid-cols-4 gap-2
                    "
                    >
                      <SUBIMAGE
                        onClick={() => setImagex(e.attributes.img1)}
                        src={e.attributes.img1}
                      />
                      <SUBIMAGE
                        onClick={() => setImagex(e.attributes.img2)}
                        src={e.attributes.img2}
                      />
                      <SUBIMAGE
                        onClick={() => setImagex(e.attributes.img3)}
                        src={e.attributes.img3}
                      />
                      <SUBIMAGE
                        onClick={() => setImagex(e.attributes.img4)}
                        src={e.attributes.img4}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.catDetailsInfo}>
                  <div className={styles.singlePROD_Title}>
                    {e.attributes.name}
                  </div>
                  <span className={styles.PROD_HASH}>
                    <span className="text-gray-300 ">SKU:</span> 810401200254
                  </span>
                  <div className="text-md">
                    <span className="text-gray-400">
                      USD {e.attributes.price}
                    </span>{" "}
                    <span className="text-[#ff9912] text-sm">
                      {(e.attributes.price * e.attributes.discount) / 100}% off
                    </span>{" "}
                  </div>
                  <div className="text-[#ff9912] text-[12px]">
                    You Saved USD{" "}
                    {e.attributes.price -
                      (e.attributes.price * e.attributes.discount) / 100}
                  </div>

                  <div class={styles.sameInfoToClientAboutThisProd}>
                    <p>
                      Or 3 interest-free instalments every month of USD 2,058.12
                      with.
                    </p>
                  </div>
                  <div className="text-sm py-2">
                    Availability:{" "}
                    <span className={styles.inStock}> In Stock</span>
                  </div>
                  <div className="w-full">
                    <img
                      className={styles.singlePageAdvBanner}
                      src="https://danubehome.com/media/wysiwyg/48hrs_free_delivery_pdp_july_2022.jpg"
                    />
                  </div>
                  <div className={styles.clientBTN}>
                    <div className={styles.quantityOB}>
                      <span className={styles.minusOP} onClick={minus_op}>
                        -
                      </span>
                      <span className={styles.countEL}>{count_item}</span>
                      <span className={styles.plusOP} onClick={plus_op}>
                        +
                      </span>
                    </div>
                    <div className={styles.addToCartBTN}>
                      <span>Add To Cart</span>
                    </div>
                    <div onClick={openModal} className={styles.payBTN}>
                      <span className="">PAY</span>
                    </div>

                    <Modal
                      isOpen={isModalOpen}
                      transition={ModalTransition.SCALE}
                    >
                      <CartModal close={closeModal} />
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Productdetails;
