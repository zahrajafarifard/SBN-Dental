import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TickSquare from "../../../assets/icons/tick-square.svg";
import InfoCircle from "../../../assets/icons/info-circle.svg";

const SocialMedia = () => {
  const [insta, setInsta] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [responseMsg, setResponseMsg] = useState("");

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  useEffect(() => {
    const _fetchFunc = async () => {
      let _response, _data;

      _response = await fetch(`${process.env.REACT_APP_URL}/api/socialMedia`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      switch (_response.status) {
        case 200:
          _data = await _response.json();

          setInsta(_data?.insta);
          setTelegram(_data?.telegram);
          setWhatsApp(_data?.whatsApp);
          setEmail(_data?.email);
          setAddress(_data?.address);
          setPhone(_data?.phone);

          break;

        default:
          break;
      }
    };

    token && _fetchFunc();
  }, [token]);

  const submitHandler = async () => {
    let _response, _data;

    setIsLoading(true);

    _response = await fetch(`${process.env.REACT_APP_URL}/api/socialMedia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        insta,
        telegram,
        whatsApp,
        email,
        phone,
        address,
      }),
    });

    // _data = await _response.json();

    switch (_response.status) {
      case 200:
      case 201:
        setResponseMsg("201");
        setIsLoading(false);

        break;
      case 500:
        setResponseMsg("500");
        setIsLoading(false);

        break;

      default:
        setIsLoading(false);

        break;
    }
  };
  return (
    <div className="w-[95%] ">
      {responseMsg === "201" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => setResponseMsg("")}
            className="fixed top-0 left-0 h-screen w-screen z-10 bg-gray-600 opacity-35"
          />
          <div className="bg-white z-20 mx-auto py-10 px-40 rounded-[32px] ">
            <img src={TickSquare} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">
              لینک های شبکه های اجتماعی با موفقیت بروزرسانی شد!
            </div>
            <div
              onClick={() => setResponseMsg("")}
              className="bg-[#18D099] text-white text-sm text-center rounded-[20px] py-2 w-fit px-10 mx-auto"
            >
              برو به شبکه های اجتماعی
            </div>
          </div>
        </div>
      )}
      {responseMsg === "500" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => setResponseMsg("")}
            className="absolute top-0 left-0 h-screen w-screen bg-gray-600 opacity-35 z-10"
          />
          <div className="bg-white z-20 mx-auto py-10 px-40 rounded-[32px] text-center">
            <img src={InfoCircle} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">
              بروزرسانی لینک های شبکه های اجتماعی موفقیت آمیز نبود!
            </div>
            <div
              onClick={() => setResponseMsg("")}
              className="bg-[#EE5248] text-white text-sm text-center rounded-[20px] py-2 w-fit px-10 mx-auto"
            >
              تلاش دوباره
            </div>
          </div>
        </div>
      )}
      <div className="text-[#4B5C66] text-sm mb-6">
        در این بخش می‌توانید لینک‌های شبکه‌های اجتماعی خود را وارد کنید تا
        کاربران سایت به‌راحتی به صفحات شما در پلتفرم‌های مختلف دسترسی داشته
        باشند. لطفاً لینک‌های صحیح و فعال را وارد کرده و در صورت تغییر،
        به‌روزرسانی کنید تا مخاطبان همیشه به‌روزترین اطلاعات شما را دریافت کنند.
      </div>

      <div className="text-[#264490] font-bold text-2xl mb-6">اینستاگرام</div>
      <div className="text-[#264490] font-bold  mb-2">لینک</div>
      <input
        className="rounded-[20px] p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  border border-[#B7D3E4] w-full mb-6 focus:outline-none"
        placeholder="https://www.instagram.com/yourusername"
        value={insta}
        onChange={(e) => {
          setInsta(e.target.value);
        }}
      />
      <div className="text-[#264490] font-bold text-2xl mb-6">واتساپ</div>
      <div className="text-[#264490] font-bold  mb-2">شماره واتساپ</div>
      <input
        className="rounded-[20px] p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  border border-[#B7D3E4] w-full mb-6 focus:outline-none"
        placeholder="شماره متصل به حساب واتساپ خود را وارد کنید"
        value={whatsApp}
        onChange={(e) => {
          setWhatsApp(e.target.value);
        }}
      />
      <div className="text-[#264490] font-bold text-2xl mb-6">تلگرام</div>
      <div className="text-[#264490] font-bold  mb-2">شماره تلگرام</div>
      <input
        className="rounded-[20px] p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  border border-[#B7D3E4] w-full mb-12 focus:outline-none"
        placeholder="شماره متصل به حساب تلگرام خود را وارد کنید"
        value={telegram}
        onChange={(e) => {
          setTelegram(e.target.value);
        }}
      />
      <div className="text-[#264490] font-bold text-2xl mb-6">تلفن</div>
      <div className="text-[#264490] font-bold  mb-2">شماره تماس</div>
      <input
        className="rounded-[20px] p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  border border-[#B7D3E4] w-full mb-12 focus:outline-none"
        placeholder="شماره تماس خود را وارد کنید"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <div className="text-[#264490] font-bold text-2xl mb-6">ایمیل</div>
      <div className="text-[#264490] font-bold  mb-2"> آدرس ایمیل</div>
      <input
        className="rounded-[20px] p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  border border-[#B7D3E4] w-full mb-12 focus:outline-none"
        placeholder="آدرس ایمیل خود را وارد کنید"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className="text-[#264490] font-bold text-2xl mb-6">آدرس</div>
      <div className="text-[#264490] font-bold  mb-2"> آدرس شرکت</div>
      <input
        className="rounded-[20px] p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  border border-[#B7D3E4] w-full mb-12 focus:outline-none"
        placeholder="آدرس خود را وارد کنید"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />

      <button
        onClick={submitHandler}
        disabled={isLoading}
        className="bg-[#264490] w-52 mx-auto text-white py-[10px]  shadow-[0px_0px_4px_0_rgba(0,0,0,0.25)] rounded-[20px] flex justify-center items-center
        disabled:cursor-not-allowed disabled:bg-[#C6CED3] disabled:text-white
        "
      >
        تایید
      </button>
    </div>
  );
};

export default SocialMedia;
