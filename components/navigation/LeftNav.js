import React from "react";
// import { ReactComponent as CompanyIcon } from "./assets/crown.svg";

import { WhatsAppWidget, ReactWhatsapp } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
function RightNav() {
  return (
    <>
      <WhatsAppWidget
        message={`Hello! 👋🏼 \n\nWhat can we do for you?`}
        phoneNumber="+971586040045"
        className="relative"
      />
    </>
  );
}

export default RightNav;
