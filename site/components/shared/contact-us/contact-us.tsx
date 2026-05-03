"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Insta from "@/public/images/insta.svg";
import Whatsapp from "@/public/images/whatsapp.svg";
import Telegram from "@/public/images/telegram.svg";
import styles from "./contact-us.module.css";

interface ContactFormData {
  name: string;
  mobile: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    mobile: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [mobileError, setMobileError] = useState<string | null>(null); // New state for mobile validation error

  const [data, setData] = useState({
    articles: [],
    contactData: {
      phone: "",
      email: "",
      address: "",
      insta: "",
      telegram: "",
      whatsApp: "",
    },
  });

  useEffect(() => {
    async function fetchFooterData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/footer`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData({
        articles: result.articles || [],
        contactData: {
          phone: result?.data?.phone || "",
          email: result?.data?.email || "",
          address: result?.data?.address || "",
          insta: result?.data?.insta || "",
          telegram: result?.data?.telegram || "",
          whatsApp: result?.data?.whatsApp || "",
        },
      });
    }

    fetchFooterData();
  }, []);
  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Only allow numeric values for the mobile input
    if (name === "mobile") {
      if (/^\d{0,11}$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

        // Check if length is exactly 11 digits; show error if not
        if (value.length === 11) {
          setMobileError(null); // Valid input
        } else {
          setMobileError("شماره تماس باید دقیقا 11 رقم باشد");
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mobileError) return; // Prevent submission if there's a mobile error
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", mobile: "", message: "" });
      } else {
        setSuccess(false);
        console.error("Error:", result.message);
      }
    } catch (error) {
      setSuccess(false);
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contactUs"
      className={`${styles.backGround} w-full mx-auto mt-40 screen750:mt-8`}
    >
      <div
        className="w-[80%] mx-auto flex flex-row-reverse relative 
        screen750:flex-col 
        screen750:pb-10
        screen900:w-[90%]
        screen750:w-[90%]
      "
      >
        <div className="w-2/3 py-10 text-right screen750:w-full screen1000:w-[65%] ">
          <h3
            style={{ direction: "rtl" }}
            className="mb-8 text-[#264490] font-bold text-xl screen900:text-lg"
          >
            با ما در تماس باشید و لبخندی درخشان بسازید!
          </h3>

          <div
            style={{ direction: "rtl" }}
            className="text-lg text-[#4B5C66] screen900:text-base"
          >
            برای دریافت اطلاعات بیشتر درباره محصولات SBN Dental یا سفارش خرید،
            می‌توانید از طریق فرم زیر با ما در تماس باشید. اگر سوالی دارید یا به
            مشاوره نیاز دارید، تیم ما آماده پاسخگویی است. همچنین، می‌توانید از
            این فرم برای استعلام قیمت و ثبت درخواست خرید محصولات استفاده کنید.
            ما در سریع‌ترین زمان ممکن با شما تماس خواهیم گرفت!
          </div>
          <div
            style={{ direction: "rtl" }}
            className="mt-14 mb-6 text-lg text-[#4B5C66] screen900:text-base screen1230:mt-10"
          >
            یا از روش های زیر با ما در تماس باشید:
          </div>
          <div style={{ direction: "rtl" }} className="flex flex-row">
            <Link
              target="_blank"
              href={`https://www.instagram.com/${data?.contactData?.insta}`}
            >
              <div className="bg-[#FFFFFF99] w-fit h-fit p-2 rounded-full">
                <Image src={Insta} alt="Instagram" width={36} height={36} />
              </div>
            </Link>
            <Link
              target="_blank"
              href={`https://t.me/${data?.contactData?.telegram}`}
            >
              <div className="bg-[#FFFFFF99] w-fit h-fit p-2 rounded-full mx-6">
                <Image src={Telegram} alt="Telegram" width={36} height={36} />
              </div>
            </Link>
            <Link
              target="_blank"
              href={`https://wa.me/${data?.contactData?.whatsApp}`}
            >
              <div className="bg-[#FFFFFF99] w-fit h-fit p-2 rounded-full">
                <Image src={Whatsapp} alt="Whatsapp" width={36} height={36} />
              </div>
            </Link>
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className="w-1/4 shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] bg-white text-[#264490] text-base pt-8 px-6 pb-10 rounded-[20px] absolute left-0 -mt-14
          screen1550:-mt-8
          screen1400:w-[29%]
          screen1230:w-[32%]
          screen1000:w-[34%]
          screen1230:-mt-7
          screen1000:-mt-0.5
          screen900:-mt-6
          screen750:relative 
          screen750:mt-0 
          screen750:mx-auto
          screen750:w-[55%]
          screen600:w-[65%]
          screen550:w-[75%]
          screen450:w-full
           
          "
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-1">نام و نام خانوادگی</div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="نام خود را وارد کنید"
              className="w-full border border-[#B7D3E4] rounded-2xl p-2 text-[#C6CED3] mb-8 focus:outline-none
               placeholder:text-base
              screen750:placeholder:text-sm
              "
              required
            />
            <div className="mb-1">شماره تماس</div>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="شماره تماس خود را وارد کنید"
              className="w-full border border-[#B7D3E4] rounded-2xl p-2 text-[#C6CED3] mb-1 focus:outline-none
               placeholder:text-base
              screen750:placeholder:text-sm
              "
              required
            />
            {mobileError && (
              <div className="text-red-500 text-sm mt-1">{mobileError}</div>
            )}
            <div className="mb-1 mt-4">متن پیام</div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="پیام خود را بنویسید"
              rows={3}
              className="w-full border border-[#B7D3E4] rounded-2xl p-2 text-[#C6CED3] mb-12 focus:outline-none screen1000:mb-6
              placeholder:text-base
              screen750:placeholder:text-sm
              "
              required
            />
            <button
              type="submit"
              className="bg-[#264490] text-white w-2/3 mx-auto py-2 rounded-[20px] flex items-center justify-center screen750:text-sm"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
            {success === true && (
              <div
                style={{ direction: "rtl" }}
                className="text-green-500 mt-4 text-center text-sm"
              >
                پیام با موفقیت ارسال شد!
              </div>
            )}
            {success === false && (
              <div
                style={{ direction: "rtl" }}
                className="text-red-500 mt-4 text-center text-sm"
              >
                ارسال پیام با مشکل مواجه شد. لطفاً دوباره تلاش کنید.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
