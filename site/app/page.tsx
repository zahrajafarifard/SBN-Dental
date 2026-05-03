import React from "react";

import Header from "@/components/main/slider/page";
import Titles from "@/components/shared/title/titles";
import FirstComponent from "@/components/main/first-component/first-component";
import SecondComponent from "@/components/main/second-component/second-component";
import ThirdComponent from "@/components/main/third-component/third-component";
import ContactUs from "@/components/shared/contact-us/contact-us";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Titles />

      <FirstComponent />
      <SecondComponent />

      <ThirdComponent />

      <ContactUs />
    </div>
  );
}
