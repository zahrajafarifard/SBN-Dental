"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import dynamic from "next/dynamic";

const ContactUs = dynamic(() => import("../shared/contact-us/contact-us"));

const Titles = dynamic(() => import("../shared/title/titles"));
const Header = dynamic(() => import("../shared/header/header"));

// import Titles from "../shared/title/titles";
// import Header from "../shared/header/header";
// import ContactUs from "../shared/contact-us/contact-us";
import Email from "@/public/images/contact-us (2).svg";
import Phone from "@/public/images/contact-us (3).svg";
import Location from "@/public/images/contact-us (1).svg";

interface FieldData {
  phone: string;
  email: string;
  address: string;
}

const ContactUsComponent = () => {
  const [fields, setFields] = useState<FieldData>({
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const _contactForm = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/footer`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const _data = await _response.json();
      setFields({
        phone: _data?.data?.phone,
        email: _data?.data?.email,
        address: _data?.data?.address,
      });
    };
    _contactForm();
  }, [setFields]);

  return (
    <div>
      <Header header="تماس با ما" />
      <Titles />

      <h1
        className="text-[32px] font-bold text-[#DEB900] mx-auto w-full flex justify-center my-20 
      screen750:text-[28px]
      screen750:my-0
      screen750:mt-20
      "
      >
        با ما در ارتباط باشید
      </h1>

      <ContactUs />

      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-[32px] font-bold text-[#DEB900]  mt-32 mb-2 screen750:text-[28px]">
          راه‌های ارتباطی ما
        </h1>
        <h3
          style={{ direction: "rtl" }}
          className="w-[24%] mx-auto text-center text-[#264490] text-lg mb-20 screen750:text-base
          screen1500:w-[40%]
          screen900:w-[50%]
          screen750:w-[85%]
          screen450:w-[95%]
          "
        >
          برای مراجعه حضوری، تماس تلفنی و یا ارسال ایمیل، می‌توانید از اطلاعات
          زیر استفاده کنید.
        </h3>

        <Image src={Phone} width={40} height={40} alt="تلفن" className="mb-3" />
        <div className="text-[#4B5C66] text-lg mb-10 screen750:text-base">
          {fields?.phone}
        </div>

        <Image
          src={Email}
          width={40}
          height={40}
          alt="ایمیل"
          className="mb-3"
        />
        <div className="text-[#4B5C66] text-lg mb-10 screen750:text-base">
          {fields?.email}
        </div>
        <Image
          src={Location}
          width={40}
          height={40}
          alt="ادرس"
          className="mb-3"
        />
        <div
          className="text-[#4B5C66] text-lg mb-10 w-[17%] text-center screen750:text-base
          screen1500:w-[40%]
          screen900:w-[50%]
          screen750:w-[85%]
          screen450:w-[95%]
        "
        >
          {fields?.address}
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
