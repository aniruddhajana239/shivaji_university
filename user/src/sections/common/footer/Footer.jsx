import React, { useEffect } from "react";
import FooterTop from "../../../components/footer/FooterTop";
import FooterButton from "../../../components/footer/FooterButton";

const Footer = ({HomeData}) => {
   useEffect(()=>{console.log("HomeData in Footer Component:",HomeData)},[HomeData])
  return (
    <>
      <div className="flex flex-col w-full">
        <FooterTop HomeData={HomeData} />
        <FooterButton />
      </div>
    </>
  );
};

export default Footer;
