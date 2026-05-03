import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "../../style.module.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  // const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
  });

  const registerOptions = {
    mobile: {
      maxLength: {
        value: 11,
        message: "Phone number cannot exceed 11 digits",
      },
      minLength: {
        value: 11,
        message: "Phone number cannot exceed 11 digits",
      },
      required: "Phone number is required",
      pattern: {
        value: /^[\d\s]+$/,
        message: "Invalid phone number format",
      },
    },
  };

  const generateSecurityCodeHandler = async () => {
    let _response, _data;

    _response = await fetch(`${process.env.REACT_APP_URL}/users/checkUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: getValues("mobile"),
      }),
    });

    switch (_response.status) {
      case 200:
        navigate("/new-password", { state: { mobile: getValues("mobile") } });
        break;

      case 500:
        setError(".شماره موبایل وارد شده در سیستم وجود ندارد");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        generateSecurityCodeHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [generateSecurityCodeHandler]);

  return (
    <div className="bg-white font-Vazir w-1/3 mx-auto  my-40 p-12 text-[#4B5C66] rounded-[32px] shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)]">
      <div className="w-full mx-auto text-center mb-3 text-xl font-bold">
        بازیابی رمز عبور
      </div>
      <div
        style={{ direction: "rtl" }}
        className="w-full mx-auto text-center  text-base text-[#929BA0]"
      >
        شماره موبایل ثبت‌شده خود را برای تغییر رمز عبور وارد کنید .
      </div>

      {error && (
        <div className="text-[#F63535] text-sm text-center mt-2">{error}</div>
      )}
      {errors?.mobile && (
        <div
          style={{ direction: "rtl" }}
          className="my-auto text-center mr-2 text-[#F63535] text-sm mt-2"
        >
          اطلاعات وارد شده صحیح نیست.
        </div>
      )}
      <div style={{ direction: "rtl" }} className="w-full mx-auto mt-10">
        <div className="text-lg mb-2 text-[#264490] font-bold">شماره تماس </div>
        <input
          className="w-full p-4  placeholder:text-[#C6CED3] text-[#4B5C66]  focus:outline-none rounded-[20px]  border border-[#B7D3E4]  "
          type="text"
          name="username"
          placeholder="شماره تماس خود را وارد کنید"
          onChange={(e) => setValue("mobile", e.target.value)}
          {...register("mobile", registerOptions.mobile)}
        />
      </div>

      <div className="w-full mx-auto flex items-center justify-center mt-14">
        <button
          className={`${styles.backGround} w-1/3 mx-auto cursor-pointer text-white text-sm py-2 rounded-sm outline-none 
            disabled:text-white
          disabled:bg-gradient-to-r disabled:bg-[#C6CED3] disabled:cursor-not-allowed`}
          disabled={!isValid || !isDirty}
          onClick={generateSecurityCodeHandler}
        >
          بازیابی رمز عبور
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
