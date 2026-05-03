import Main from "@/components/about-us/page";
import ContactUs from "@/components/shared/contact-us/contact-us";
import Header from "@/components/shared/header/header";
import Titles from "@/components/shared/title/titles";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <Header header="درباره ما" />
      <Titles />

      <Main />

      <ContactUs />
    </div>
  );
};

export default AboutUs;
