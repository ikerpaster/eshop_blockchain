import React from "react";

function OurAds() {
  const styles = {
    container: `flex justify-center w-full md:mt-[-50px]`,
  };
  const addImg =
    "https://images.ctfassets.net/058vu9hqon0j/78vjNwk6Mgg1v0MX42UmWP/f9027d595257db42c0cea1738d53e9fc/48hrs_free_delivery_july_2022.jpg";

  return (
    <div className={styles.container}>
      <img src={addImg} />
    </div>
  );
}

export default OurAds;
