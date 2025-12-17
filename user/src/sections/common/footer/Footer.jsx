import React from "react";
import FooterTop from "../../../components/footer/FooterTop";
import FooterButton from "../../../components/footer/FooterButton";

const Footer = ({data}) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <FooterTop data={data} />
        <FooterButton />
      </div>
    </>
  );
};

export default Footer;
