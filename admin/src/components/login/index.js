import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { login, loginFailed } from "../../store/action";
import LayOut from "../../mainLayout";
import styles from "../../style.module.css";
import viewPasswordIcon from "../../assets/icons/eye.svg";
import viewPasswordIcon1 from "../../assets/icons/eye-slash.svg";

import WarningIcon from "../../assets/icons/info-circle.svg";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const _token = useSelector((state) => state.reducer.token);
  const _error = useSelector((state) => state.reducer.error);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [token, setToken] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token]);

  useEffect(() => {
    setError(_error);
  }, [_error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loginFailed(""));
      setError("");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, error]);

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
    password: {
      required: "password is required",
    },
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    dispatch(login(getValues("mobile"), getValues("password")));

    setValue("mobile", "");
    setValue("password", "");
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        !token && loginHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [getValues("mobile"), getValues("password"), loginHandler, token]);

  const changePasswordVisibilityHandler = async () => {
    setPasswordVisibility((prev) => !prev);
  };

  if (token) {
    return <LayOut />;
  }
  return (
    <div className="bg-white shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] rounded-[32px] font-Vazir w-1/3 mx-auto  my-40 p-12 text-[#4B5C66] ">
      <div className="w-full mx-auto text-center  text-xl font-bold">ورود</div>
      {error && (
        <div
          style={{ direction: "rtl" }}
          className="text-[#F63535] text-sm text-center mt-2"
        >
          {error}
        </div>
      )}
      <div style={{ direction: "rtl" }} className="w-full mx-auto mt-8">
        <div className=" mb-2 text-[#264490] font-bold">موبایل </div>
        <div className="flex flex-row justify-between border border-[#B7D3E4] rounded-2xl">
          <input
            className="w-3/4 rounded-2xl my-0.5  placeholder:text-[#C6CED3] text-[#4B5C66]   p-1.5 focus:outline-none"
            type="text"
            name="mobile"
            placeholder=" شماره موبایل خود را وارد کنید"
            onChange={(e) => setValue("mobile", e.target.value)}
            {...register("mobile", registerOptions.mobile)}
          />
          {errors?.mobile && (
            <img
              src={WarningIcon}
              alt="آیکن هشدار"
              className="my-auto w-5 h-5 ml-2"
            />
          )}
        </div>
      </div>
      {errors?.mobile && (
        <div
          style={{ direction: "rtl" }}
          className="my-auto mr-2 text-[#F63535] screen620:text-sm screen440:text-xs"
        >
          اطلاعات وارد شده صحیح نیست.
        </div>
      )}

      <div style={{ direction: "rtl" }} className="w-full mx-auto mt-5">
        <div className="mb-2 text-[#264490] font-bold">رمز عبور</div>
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
            className="w-[90%]  p-2  placeholder:text-[#C6CED3] text-[#4B5C66]  my-auto rounded-2xl
              focus:outline-none "
            type={passwordVisibility ? "text" : "password"}
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            onChange={(e) => setValue("password", e.target.value)}
            {...register("password", registerOptions.password)}
          />
        </div>
      </div>

      <div className="w-full mx-auto flex items-center justify-center mt-14">
        <button
          className={` ${styles.backGround} w-1/3 mx-auto text-white text-sm py-2  rounded-sm  disabled:text-white
          disabled:bg-gradient-to-r disabled:bg-[#C6CED3] disabled:cursor-not-allowed
          `}
          disabled={!isValid || !isDirty}
          onClick={loginHandler}
        >
          ورود
        </button>
      </div>
      <div
        onClick={() => navigate("/password")}
        className={`${styles.backGroundText} w-fit mx-auto  text-center mt-4 text-sm `}
      >
        فراموشی رمز عبور
      </div>
    </div>
  );
};

export default Login;
