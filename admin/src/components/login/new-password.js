import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import viewPasswordIcon from "../../assets/icons/eye.svg";
import viewPasswordIcon1 from "../../assets/icons/eye-slash.svg";
import styles from "../../style.module.css";

const NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const _mobile = location?.state?.mobile;

  const [error, setError] = useState("");
  const [mobile, setMobile] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repeatedPasswordVisibility, setRepeatedPasswordVisibility] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all", 
  });

  const registerOptions = {
    newPassword: {
      required: "New password is required",
    },
    repeatedNewPassword: {
      required: "Please repeat the new password",
      validate: (value) =>
        value === watch("newPassword") || "Passwords do not match",
    },
  };

  const newPassword = watch("newPassword");
  const repeatedNewPassword = watch("repeatedNewPassword");

  useEffect(() => {
    setMobile(_mobile);
  }, [_mobile, mobile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const newPasswordHandler = async () => {
    let _response, _data;

    if (repeatedNewPassword !== newPassword) {
      return setError("رمز عبور و تأیید رمز عبور مطابقت ندارند.");
    }

    _response = await fetch(
      `${process.env.REACT_APP_URL}/users/set-new-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: _mobile,
          newPassword,
        }),
      }
    );

    switch (_response.status) {
      case 201:
        navigate("/");

        break;

      default:
        break;
    }
  };

  const changePasswordVisibilityHandler = async () => {
    setPasswordVisibility((prev) => !prev);
  };

  const changeRepeatedPasswordVisibilityHandler = async () => {
    setRepeatedPasswordVisibility((prev) => !prev);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        newPasswordHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [newPasswordHandler]);

  return (
    <div className="bg-white shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] rounded-[32px] font-Vazir w-1/3 mx-auto  my-40 p-12 text-[#4B5C66] ">
      <div className="w-full mx-auto text-center mb-3 text-xl font-bold">
        بازیابی رمز عبور
      </div>
      <div
        style={{ direction: "rtl" }}
        className="w-full mx-auto text-center   text-[#929BA0]"
      >
        یک رمز عبور جدید برای خود انتخاب کنید.
      </div>

      {error && (
        <div
          style={{ direction: "rtl" }}
          className="text-[#F63535] text-center text-sm"
        >
          {error}
        </div>
      )}

      {(errors?.newPassword || errors?.repeatedNewPassword) && (
        <div
          style={{ direction: "rtl" }}
          className="my-auto text-center mr-2 text-[#F63535] text-sm mt-2"
        >
          اطلاعات وارد شده صحیح نیست.
        </div>
      )}
      <div style={{ direction: "rtl" }} className="w-full mx-auto pb-8 mt-10">
        <div className="text-base mb-2 text-[#264490]">رمز عبور جدید </div>
        <div className="flex flex-row-reverse justify-between bg-white my-auto rounded-2xl border border-[#B7D3E4]">
          {passwordVisibility ? (
            <img
              onClick={changePasswordVisibilityHandler}
              src={viewPasswordIcon1}
              className="w-5 my-auto mx-auto cursor-pointer"
            />
          ) : (
            <img
              onClick={changePasswordVisibilityHandler}
              src={viewPasswordIcon}
              className="w-5 my-auto mx-auto cursor-pointer"
            />
          )}
          <input
            className="w-[90%] p-2  placeholder:text-[#C6CED3] text-[#4B5C66]   focus:outline-none rounded-[20px]   "
            type={passwordVisibility ? "text" : "password"}
            name="username"
            placeholder="رمز عبور جدید را وارد کنید"
            onChange={(e) => setValue("newPassword", e.target.value)}
            {...register("newPassword", registerOptions.newPassword)}
          />
        </div>
      </div>
      <div style={{ direction: "rtl" }} className="w-full mx-auto">
        <div className="text-base mb-2 text-[#264490]">تکرار رمز عبور جدید</div>
        <div className="flex flex-row-reverse justify-between bg-white my-auto rounded-2xl border border-[#B7D3E4]">
          {repeatedPasswordVisibility ? (
            <img
              onClick={changeRepeatedPasswordVisibilityHandler}
              src={viewPasswordIcon1}
              className="w-5 my-auto mx-auto cursor-pointer"
            />
          ) : (
            <img
              onClick={changeRepeatedPasswordVisibilityHandler}
              src={viewPasswordIcon}
              className="w-5 my-auto mx-auto cursor-pointer"
            />
          )}
          <input
            className="w-[90%] p-2  placeholder:text-[#C6CED3] text-[#4B5C66]  focus:outline-none rounded-[20px]  "
            type={repeatedPasswordVisibility ? "text" : "password"}
            name="username"
            placeholder="رمز عبور جدید را وارد کنید"
            onChange={(e) => setValue("repeatedNewPassword", e.target.value)}
            {...register(
              "repeatedNewPassword",
              registerOptions.repeatedNewPassword
            )}
          />
        </div>
      </div>

      <div className="w-full mx-auto flex items-center justify-center mt-14">
        <button
          className={`${styles.backGround} w-[40%] mx-auto bg-black text-white text-lg py-2 rounded-sm outline-none
           disabled:text-white disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:bg-[#C6CED3]`}
          disabled={!isValid || !isDirty}
          onClick={newPasswordHandler}
        >
          بروزرسانی رمز عبور
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
