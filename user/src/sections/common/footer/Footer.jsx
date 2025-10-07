import React from "react";
import FooterTop from "../../../components/footer/FooterTop";
import FooterButton from "../../../components/footer/FooterButton";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col w-full sticky top-0 z-50">
        <FooterTop />
        <FooterButton />
      </div>
    </>
  );
};

export default Footer;
