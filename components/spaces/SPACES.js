import React, { useContext } from "react";
import SUB_SPACE from "./SUB_SPACES";
import { Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
import { AmazonContext } from "../../context/AmazonContext";
import Buy_SP_Modal from "./Buy_SP_Modal";

const SPACES = ({ spaceName, cash1, cash2, cash3 }) => {
  const { setPackage } = useContext(AmazonContext);
  const styles = {
    container: ` w-full h-full `,
    catBody: ` h-full p-6 md:mx-16 lg:mx-16 `,
    catContent: `w-full grid md:grid-cols-3 gap-5 grid-cols-1`,
    card: `w-full h-[300px] bg-blue-300 p-20 rounded-md hover:bg-blue-100`,
    cardTitle: `text-2xl mb-4 border-b-2 border-white text-gray-700`,
    cardCols: `grid grid-cols-3 justify-evenly gap-5 md:gap-3 lg:gap-3`,
  };
  const { openModal, isModalOpen, closeModal } = useModal();
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTitle}>{spaceName} </div>

        <div className={styles.cardCols}>
          <SUB_SPACE
            cash={cash1}
            btnClick={openModal}
            boxClick={() => {
              return setPackage(cash1);
            }}
          />
          <SUB_SPACE
            cash={cash2}
            btnClick={openModal}
            boxClick={() => {
              return setPackage(cash2);
            }}
          />
          <SUB_SPACE
            cash={cash3}
            btnClick={openModal}
            boxClick={() => {
              return setPackage(cash3);
            }}
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
        <Buy_SP_Modal close={closeModal} />
      </Modal>
    </>
  );
};

export default SPACES;
